import pg from 'pg';
const { Pool } = pg;

/**
 * Database connection pool for PostgreSQL
 * Using a connection pool provides better performance and resource management
 * compared to creating new connections for each query
 */
class DatabaseManager {
    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || 'mcp_context',
            user: process.env.DB_USER || 'mcp_user',
            password: process.env.DB_PASSWORD || 'mcp_secure_password',
            max: 10, // Maximum number of connections in the pool
            idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
            connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection cannot be established
        });

        // Handle pool errors
        this.pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });
    }

    /**
     * Store context information for a project
     * @param {string} projectName - Name of the project
     * @param {string} contextType - Type of context (e.g., 'file_summary', 'conversation', 'code_analysis')
     * @param {string} content - The actual content to store
     * @param {object} metadata - Additional metadata as JSON
     */
    async storeContext(projectName, contextType, content, metadata = {}) {
        console.log(`[DB] storeContext called with projectName=${projectName}, contextType=${contextType}, content length=${content.length}, metadata keys=${Object.keys(metadata)}`);
        const query = `
            INSERT INTO project_contexts (project_name, context_type, content, metadata)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (project_name, context_type) 
            DO UPDATE SET content = $3, metadata = $4, updated_at = CURRENT_TIMESTAMP
            RETURNING id, created_at, updated_at
        `;
        
        try {
            const result = await this.pool.query(query, [projectName, contextType, content, JSON.stringify(metadata)]);
            console.log(`[DB] storeContext success:`, result.rows[0]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error storing context:', error, { projectName, contextType });
            throw error;
        }
    }

    /**
     * Retrieve context information for a project
     * @param {string} projectName - Name of the project
     * @param {string} contextType - Optional: specific type of context to retrieve
     */
    async getContext(projectName, contextType = null) {
        console.log(`[DB] getContext called with projectName=${projectName}, contextType=${contextType}`);
        let query = 'SELECT * FROM project_contexts WHERE project_name = $1';
        let params = [projectName];

        if (contextType) {
            query += ' AND context_type = $2';
            params.push(contextType);
        }

        query += ' ORDER BY updated_at DESC';

        try {
            const result = await this.pool.query(query, params);
            console.log(`[DB] getContext success: returned ${result.rows.length} rows`);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving context:', error, { projectName, contextType });
            throw error;
        }
    }

    /**
     * Store conversation history
     * @param {string} projectName - Name of the project
     * @param {string} conversationId - Unique identifier for the conversation
     * @param {string} messageType - 'user' or 'assistant'
     * @param {string} content - The message content
     * @param {object} metadata - Additional metadata
     */
    async storeConversation(projectName, conversationId, messageType, content, metadata = {}) {
        console.log(`[DB] storeConversation called with projectName=${projectName}, conversationId=${conversationId}, messageType=${messageType}, content length=${content.length}, metadata keys=${Object.keys(metadata)}`);
        const query = `
            INSERT INTO conversation_history (project_name, conversation_id, message_type, content, metadata)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, timestamp
        `;
        
        try {
            const result = await this.pool.query(query, [projectName, conversationId, messageType, content, JSON.stringify(metadata)]);
            console.log(`[DB] storeConversation success:`, result.rows[0]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error storing conversation:', error, { projectName, conversationId, messageType });
            throw error;
        }
    }

    /**
     * Retrieve conversation history for a project
     * @param {string} projectName - Name of the project
     * @param {string} conversationId - Optional: specific conversation to retrieve
     * @param {number} limit - Maximum number of messages to retrieve
     */
    async getConversationHistory(projectName, conversationId = null, limit = 50) {
        console.log(`[DB] getConversationHistory called with projectName=${projectName}, conversationId=${conversationId}, limit=${limit}`);
        let query = 'SELECT * FROM conversation_history WHERE project_name = $1';
        let params = [projectName];

        if (conversationId) {
            query += ' AND conversation_id = $2';
            params.push(conversationId);
        }

        query += ' ORDER BY timestamp DESC LIMIT $' + (params.length + 1);
        params.push(limit);

        try {
            const result = await this.pool.query(query, params);
            console.log(`[DB] getConversationHistory success: returned ${result.rows.length} rows`);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving conversation history:', error, { projectName, conversationId });
            throw error;
        }
    }

    /**
     * Test database connection
     */
    async testConnection() {
        console.log('[DB] testConnection called');
        try {
            const client = await this.pool.connect();
            const result = await client.query('SELECT NOW()');
            client.release();
            console.log('[DB] Database connection successful:', result.rows[0]);
            return true;
        } catch (error) {
            console.error('[DB] Database connection failed:', error);
            return false;
        }
    }

    /**
     * Close all database connections
     */
    async close() {
        console.log('[DB] Closing all database connections');
        await this.pool.end();
        console.log('[DB] All database connections closed');
    }

    // ============================================
    // FILE HISTORY AND VERSIONING METHODS
    // ============================================

    /**
     * Store file version history
     */
    async storeFileHistory(projectName, filePath, content, author, commitHash = null, changeDescription = null, metadata = {}) {
        const query = `
            INSERT INTO file_history (project_name, file_path, content, checksum, file_size, author, commit_hash, change_description, metadata)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id, version_number, created_at
        `;
        
        // Calculate file checksum and size
        const crypto = await import('crypto');
        const checksum = crypto.createHash('sha256').update(content).digest('hex');
        const fileSize = Buffer.byteLength(content, 'utf8');
        
        try {
            const result = await this.pool.query(query, [
                projectName, filePath, content, checksum, fileSize, author, commitHash, changeDescription, JSON.stringify(metadata)
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error storing file history:', error);
            throw error;
        }
    }

    /**
     * Get file history
     */
    async getFileHistory(projectName, filePath = null, limit = 50) {
        let query = 'SELECT * FROM file_history WHERE project_name = $1';
        let params = [projectName];

        if (filePath) {
            query += ' AND file_path = $2';
            params.push(filePath);
        }

        query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1);
        params.push(limit);

        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving file history:', error);
            throw error;
        }
    }

    // ============================================
    // USER MANAGEMENT METHODS
    // ============================================

    /**
     * Add or update project user
     */
    async storeProjectUser(projectName, username, email, role = 'developer', permissions = {}, metadata = {}) {
        const query = `
            INSERT INTO project_users (project_name, username, email, role, permissions, metadata)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (project_name, username) 
            DO UPDATE SET email = $3, role = $4, permissions = $5, metadata = $6, last_active = CURRENT_TIMESTAMP
            RETURNING id, created_at
        `;
        
        try {
            const result = await this.pool.query(query, [
                projectName, username, email, role, JSON.stringify(permissions), JSON.stringify(metadata)
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error storing project user:', error);
            throw error;
        }
    }

    /**
     * Get project users
     */
    async getProjectUsers(projectName, activeOnly = true) {
        let query = 'SELECT * FROM project_users WHERE project_name = $1';
        let params = [projectName];

        if (activeOnly) {
            query += ' AND is_active = true';
        }

        query += ' ORDER BY role, username';

        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving project users:', error);
            throw error;
        }
    }

    // ============================================
    // TASK MANAGEMENT METHODS
    // ============================================

    /**
     * Store project task
     */
    async storeProjectTask(projectName, taskId, title, description, status = 'open', priority = 'medium', taskType = 'feature', assignee = null, reporter = null, metadata = {}) {
        const query = `
            INSERT INTO project_tasks (project_name, task_id, title, description, status, priority, task_type, assignee, reporter, metadata)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (project_name, task_id) 
            DO UPDATE SET title = $3, description = $4, status = $5, priority = $6, task_type = $7, assignee = $8, reporter = $9, metadata = $10, updated_at = CURRENT_TIMESTAMP
            RETURNING id, created_at, updated_at
        `;
        
        try {
            const result = await this.pool.query(query, [
                projectName, taskId, title, description, status, priority, taskType, assignee, reporter, JSON.stringify(metadata)
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error storing project task:', error);
            throw error;
        }
    }

    /**
     * Get project tasks
     */
    async getProjectTasks(projectName, status = null, assignee = null, limit = 100) {
        let query = 'SELECT * FROM project_tasks WHERE project_name = $1';
        let params = [projectName];

        if (status) {
            query += ' AND status = $' + (params.length + 1);
            params.push(status);
        }

        if (assignee) {
            query += ' AND assignee = $' + (params.length + 1);
            params.push(assignee);
        }

        query += ' ORDER BY priority DESC, created_at DESC LIMIT $' + (params.length + 1);
        params.push(limit);

        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving project tasks:', error);
            throw error;
        }
    }

    // ============================================
    // DEPENDENCY MANAGEMENT METHODS
    // ============================================

    /**
     * Store project dependency
     */
    async storeProjectDependency(projectName, packageName, version, packageManager, dependencyType = 'production', license = null, description = null, metadata = {}) {
        const query = `
            INSERT INTO project_dependencies (project_name, package_name, version, package_manager, dependency_type, license, description, metadata)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (project_name, package_name) 
            DO UPDATE SET version = $3, package_manager = $4, dependency_type = $5, license = $6, description = $7, metadata = $8, updated_at = CURRENT_TIMESTAMP
            RETURNING id, installed_at, updated_at
        `;
        
        try {
            const result = await this.pool.query(query, [
                projectName, packageName, version, packageManager, dependencyType, license, description, JSON.stringify(metadata)
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error storing project dependency:', error);
            throw error;
        }
    }

    /**
     * Get project dependencies
     */
    async getProjectDependencies(projectName, packageManager = null, dependencyType = null) {
        let query = 'SELECT * FROM project_dependencies WHERE project_name = $1 AND is_active = true';
        let params = [projectName];

        if (packageManager) {
            query += ' AND package_manager = $' + (params.length + 1);
            params.push(packageManager);
        }

        if (dependencyType) {
            query += ' AND dependency_type = $' + (params.length + 1);
            params.push(dependencyType);
        }

        query += ' ORDER BY package_name';

        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving project dependencies:', error);
            throw error;
        }
    }

    // ============================================
    // ENVIRONMENT CONFIGURATION METHODS
    // ============================================

    /**
     * Store environment configuration
     */
    async storeEnvironmentConfig(projectName, environmentName, configKey, configValue, isSensitive = false, description = null, metadata = {}) {
        const query = `
            INSERT INTO project_environments (project_name, environment_name, config_key, config_value, is_sensitive, description, metadata)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (project_name, environment_name, config_key) 
            DO UPDATE SET config_value = $4, is_sensitive = $5, description = $6, metadata = $7, updated_at = CURRENT_TIMESTAMP
            RETURNING id, created_at, updated_at
        `;
        
        try {
            const result = await this.pool.query(query, [
                projectName, environmentName, configKey, configValue, isSensitive, description, JSON.stringify(metadata)
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error storing environment config:', error);
            throw error;
        }
    }

    /**
     * Get environment configurations
     */
    async getEnvironmentConfigs(projectName, environmentName = null, includeSensitive = false) {
        let query = 'SELECT * FROM project_environments WHERE project_name = $1';
        let params = [projectName];

        if (environmentName) {
            query += ' AND environment_name = $2';
            params.push(environmentName);
        }

        if (!includeSensitive) {
            query += ' AND is_sensitive = false';
        }

        query += ' ORDER BY environment_name, config_key';

        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving environment configs:', error);
            throw error;
        }
    }

    // ============================================
    // ACTIVITY LOG METHODS
    // ============================================

    /**
     * Log activity
     */
    async logActivity(projectName, activityType, actor, target, action, details = null, ipAddress = null, userAgent = null, metadata = {}) {
        const query = `
            INSERT INTO project_activity_logs (project_name, activity_type, actor, target, action, details, ip_address, user_agent, metadata)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id, timestamp
        `;
        
        try {
            const result = await this.pool.query(query, [
                projectName, activityType, actor, target, action, details, ipAddress, userAgent, JSON.stringify(metadata)
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error logging activity:', error);
            throw error;
        }
    }

    /**
     * Get activity logs
     */
    async getActivityLogs(projectName, activityType = null, actor = null, limit = 100) {
        let query = 'SELECT * FROM project_activity_logs WHERE project_name = $1';
        let params = [projectName];

        if (activityType) {
            query += ' AND activity_type = $' + (params.length + 1);
            params.push(activityType);
        }

        if (actor) {
            query += ' AND actor = $' + (params.length + 1);
            params.push(actor);
        }

        query += ' ORDER BY timestamp DESC LIMIT $' + (params.length + 1);
        params.push(limit);

        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving activity logs:', error);
            throw error;
        }
    }

    // ============================================
    // BUILD AND TEST METHODS
    // ============================================

    /**
     * Store build information
     */
    async storeBuild(projectName, buildNumber, buildType, status, branchName = null, commitHash = null, triggeredBy = null, testResults = {}, metadata = {}) {
        const query = `
            INSERT INTO project_builds (project_name, build_number, build_type, status, branch_name, commit_hash, triggered_by, test_results, metadata)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            ON CONFLICT (project_name, build_number) 
            DO UPDATE SET build_type = $3, status = $4, branch_name = $5, commit_hash = $6, triggered_by = $7, test_results = $8, metadata = $9
            RETURNING id, start_time
        `;
        
        try {
            const result = await this.pool.query(query, [
                projectName, buildNumber, buildType, status, branchName, commitHash, triggeredBy, JSON.stringify(testResults), JSON.stringify(metadata)
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error storing build:', error);
            throw error;
        }
    }

    /**
     * Update build status
     */
    async updateBuildStatus(projectName, buildNumber, status, endTime = null, durationSeconds = null, logs = null) {
        const query = `
            UPDATE project_builds 
            SET status = $3, end_time = COALESCE($4, CURRENT_TIMESTAMP), duration_seconds = $5, logs = $6
            WHERE project_name = $1 AND build_number = $2
            RETURNING id, start_time, end_time
        `;
        
        try {
            const result = await this.pool.query(query, [
                projectName, buildNumber, status, endTime, durationSeconds, logs
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error updating build status:', error);
            throw error;
        }
    }

    /**
     * Get build history
     */
    async getBuildHistory(projectName, status = null, branchName = null, limit = 50) {
        let query = 'SELECT * FROM project_builds WHERE project_name = $1';
        let params = [projectName];

        if (status) {
            query += ' AND status = $' + (params.length + 1);
            params.push(status);
        }

        if (branchName) {
            query += ' AND branch_name = $' + (params.length + 1);
            params.push(branchName);
        }

        query += ' ORDER BY start_time DESC LIMIT $' + (params.length + 1);
        params.push(limit);

        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving build history:', error);
            throw error;
        }
    }

    // ============================================
    // DOCUMENTATION METHODS
    // ============================================

    /**
     * Store documentation
     */
    async storeDocumentation(projectName, docType, title, content, format = 'markdown', version = null, author = null, tags = [], isPublished = false, externalUrl = null, metadata = {}) {
        const query = `
            INSERT INTO project_documentation (project_name, doc_type, title, content, format, version, author, tags, is_published, external_url, metadata)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            ON CONFLICT (project_name, doc_type, title) 
            DO UPDATE SET content = $4, format = $5, version = $6, author = $7, tags = $8, is_published = $9, external_url = $10, metadata = $11, updated_at = CURRENT_TIMESTAMP
            RETURNING id, created_at, updated_at
        `;
        
        try {
            const result = await this.pool.query(query, [
                projectName, docType, title, content, format, version, author, tags, isPublished, externalUrl, JSON.stringify(metadata)
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error storing documentation:', error);
            throw error;
        }
    }

    /**
     * Get documentation
     */
    async getDocumentation(projectName, docType = null, publishedOnly = false) {
        let query = 'SELECT * FROM project_documentation WHERE project_name = $1';
        let params = [projectName];

        if (docType) {
            query += ' AND doc_type = $' + (params.length + 1);
            params.push(docType);
        }

        if (publishedOnly) {
            query += ' AND is_published = true';
        }

        query += ' ORDER BY doc_type, title';

        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving documentation:', error);
            throw error;
        }
    }

    // ============================================
    // COMPONENT RELATIONSHIP METHODS
    // ============================================

    /**
     * Store project component
     */
    async storeProjectComponent(projectName, componentName, componentType, filePath = null, description = null, version = null, metadata = {}) {
        const query = `
            INSERT INTO project_components (project_name, component_name, component_type, file_path, description, version, metadata)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (project_name, component_name) 
            DO UPDATE SET component_type = $3, file_path = $4, description = $5, version = $6, metadata = $7, updated_at = CURRENT_TIMESTAMP
            RETURNING id, created_at, updated_at
        `;
        
        try {
            const result = await this.pool.query(query, [
                projectName, componentName, componentType, filePath, description, version, JSON.stringify(metadata)
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error storing project component:', error);
            throw error;
        }
    }

    /**
     * Store component relationship
     */
    async storeComponentRelationship(projectName, sourceComponent, targetComponent, relationshipType, strength = 1, description = null, metadata = {}) {
        const query = `
            INSERT INTO component_relationships (project_name, source_component, target_component, relationship_type, strength, description, metadata)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (project_name, source_component, target_component, relationship_type) 
            DO UPDATE SET strength = $5, description = $6, metadata = $7
            RETURNING id, created_at
        `;
        
        try {
            const result = await this.pool.query(query, [
                projectName, sourceComponent, targetComponent, relationshipType, strength, description, JSON.stringify(metadata)
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error storing component relationship:', error);
            throw error;
        }
    }

    /**
     * Get project components
     */
    async getProjectComponents(projectName, componentType = null, activeOnly = true) {
        let query = 'SELECT * FROM project_components WHERE project_name = $1';
        let params = [projectName];

        if (componentType) {
            query += ' AND component_type = $' + (params.length + 1);
            params.push(componentType);
        }

        if (activeOnly) {
            query += ' AND is_active = true';
        }

        query += ' ORDER BY component_type, component_name';

        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving project components:', error);
            throw error;
        }
    }

    /**
     * Get component relationships
     */
    async getComponentRelationships(projectName, sourceComponent = null, targetComponent = null) {
        let query = 'SELECT * FROM component_relationships WHERE project_name = $1';
        let params = [projectName];

        if (sourceComponent) {
            query += ' AND source_component = $' + (params.length + 1);
            params.push(sourceComponent);
        }

        if (targetComponent) {
            query += ' AND target_component = $' + (params.length + 1);
            params.push(targetComponent);
        }

        query += ' ORDER BY relationship_type, source_component';

        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving component relationships:', error);
            throw error;
        }
    }

    // ============================================
    // FILE METADATA METHODS
    // ============================================

    /**
     * Store file metadata
     */
    async storeFileMetadata(projectName, filePath, fileName, fileExtension = null, fileSize = null, fileType = null, language = null, lineCount = null, lastAuthor = null, checksum = null, isBinary = false, isGenerated = false, metadata = {}) {
        const query = `
            INSERT INTO file_metadata (project_name, file_path, file_name, file_extension, file_size, file_type, language, line_count, last_author, checksum, is_binary, is_generated, last_modified, metadata)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP, $13)
            ON CONFLICT (project_name, file_path) 
            DO UPDATE SET file_name = $3, file_extension = $4, file_size = $5, file_type = $6, language = $7, line_count = $8, last_author = $9, checksum = $10, is_binary = $11, is_generated = $12, last_modified = CURRENT_TIMESTAMP, metadata = $13, updated_at = CURRENT_TIMESTAMP
            RETURNING id, created_at, updated_at
        `;
        
        try {
            const result = await this.pool.query(query, [
                projectName, filePath, fileName, fileExtension, fileSize, fileType, language, lineCount, lastAuthor, checksum, isBinary, isGenerated, JSON.stringify(metadata)
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('[DB] Error storing file metadata:', error);
            throw error;
        }
    }

    /**
     * Get file metadata
     */
    async getFileMetadata(projectName, fileType = null, language = null, includeBinary = false) {
        let query = 'SELECT * FROM file_metadata WHERE project_name = $1';
        let params = [projectName];

        if (fileType) {
            query += ' AND file_type = $' + (params.length + 1);
            params.push(fileType);
        }

        if (language) {
            query += ' AND language = $' + (params.length + 1);
            params.push(language);
        }

        if (!includeBinary) {
            query += ' AND is_binary = false';
        }

        query += ' ORDER BY file_path';

        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('[DB] Error retrieving file metadata:', error);
            throw error;
        }
    }
}

export default DatabaseManager;