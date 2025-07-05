-- Create the main context storage table
CREATE TABLE IF NOT EXISTS project_contexts (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    context_type VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_name, context_type)
);

-- Create an index for faster project lookups
CREATE INDEX IF NOT EXISTS idx_project_contexts_project_name 
ON project_contexts(project_name);

-- Create an index for context type queries
CREATE INDEX IF NOT EXISTS idx_project_contexts_type 
ON project_contexts(context_type);

-- Create a table for storing conversation history
CREATE TABLE IF NOT EXISTS conversation_history (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    conversation_id VARCHAR(255) NOT NULL,
    message_type VARCHAR(50) NOT NULL, -- 'user' or 'assistant'
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'
);

-- Create an index for conversation lookups
CREATE INDEX IF NOT EXISTS idx_conversation_history_project_conversation 
ON conversation_history(project_name, conversation_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at timestamp
CREATE TRIGGER update_project_contexts_updated_at 
    BEFORE UPDATE ON project_contexts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- EXTENDED TABLES FOR COMPREHENSIVE PROJECT MANAGEMENT
-- ============================================

-- 1. File History and Versioning
CREATE TABLE IF NOT EXISTS file_history (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    version_number INTEGER NOT NULL DEFAULT 1,
    content TEXT,
    checksum VARCHAR(64), -- SHA-256 hash for content verification
    file_size BIGINT,
    author VARCHAR(255),
    commit_hash VARCHAR(40), -- Git commit hash if available
    change_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_file_history_project_file 
ON file_history(project_name, file_path);

CREATE INDEX IF NOT EXISTS idx_file_history_version 
ON file_history(project_name, file_path, version_number);

-- 2. Users and Roles
CREATE TABLE IF NOT EXISTS project_users (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'developer', -- admin, developer, viewer, tester
    permissions JSONB DEFAULT '{}', -- Specific permissions
    is_active BOOLEAN DEFAULT true,
    last_active TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}',
    UNIQUE(project_name, username)
);

CREATE INDEX IF NOT EXISTS idx_project_users_project 
ON project_users(project_name);

CREATE INDEX IF NOT EXISTS idx_project_users_active 
ON project_users(project_name, is_active);

-- 3. Tasks and Issues
CREATE TABLE IF NOT EXISTS project_tasks (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    task_id VARCHAR(100) NOT NULL, -- e.g., TASK-001, BUG-123
    title VARCHAR(500) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'open', -- open, in_progress, testing, closed
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, critical
    task_type VARCHAR(50) DEFAULT 'feature', -- feature, bug, enhancement, documentation
    assignee VARCHAR(255),
    reporter VARCHAR(255),
    estimated_hours DECIMAL(10,2),
    actual_hours DECIMAL(10,2),
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}',
    UNIQUE(project_name, task_id)
);

CREATE INDEX IF NOT EXISTS idx_project_tasks_project_status 
ON project_tasks(project_name, status);

CREATE INDEX IF NOT EXISTS idx_project_tasks_assignee 
ON project_tasks(project_name, assignee);

-- 4. Dependencies and Packages
CREATE TABLE IF NOT EXISTS project_dependencies (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    package_name VARCHAR(255) NOT NULL,
    version VARCHAR(100) NOT NULL,
    package_manager VARCHAR(50) NOT NULL, -- npm, pip, maven, gradle, etc.
    dependency_type VARCHAR(50) DEFAULT 'production', -- production, development, test
    license VARCHAR(100),
    description TEXT,
    homepage_url TEXT,
    repository_url TEXT,
    is_active BOOLEAN DEFAULT true,
    installed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}',
    UNIQUE(project_name, package_name)
);

CREATE INDEX IF NOT EXISTS idx_project_dependencies_project 
ON project_dependencies(project_name, is_active);

CREATE INDEX IF NOT EXISTS idx_project_dependencies_package 
ON project_dependencies(package_name);

-- 5. Environment Configurations
CREATE TABLE IF NOT EXISTS project_environments (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    environment_name VARCHAR(100) NOT NULL, -- development, staging, production
    config_key VARCHAR(255) NOT NULL,
    config_value TEXT,
    is_sensitive BOOLEAN DEFAULT false, -- For secrets/passwords
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}',
    UNIQUE(project_name, environment_name, config_key)
);

CREATE INDEX IF NOT EXISTS idx_project_environments_project_env 
ON project_environments(project_name, environment_name);

-- 6. Activity Logs and Audit Trail
CREATE TABLE IF NOT EXISTS project_activity_logs (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    activity_type VARCHAR(100) NOT NULL, -- file_changed, task_created, user_login, etc.
    actor VARCHAR(255), -- Username who performed the action
    target VARCHAR(255), -- What was affected (file path, task id, etc.)
    action VARCHAR(100) NOT NULL, -- created, updated, deleted, viewed
    details TEXT,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_project_activity_logs_project_time 
ON project_activity_logs(project_name, timestamp);

CREATE INDEX IF NOT EXISTS idx_project_activity_logs_actor 
ON project_activity_logs(project_name, actor);

-- 7. Test Results and Build Information
CREATE TABLE IF NOT EXISTS project_builds (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    build_number VARCHAR(100) NOT NULL,
    build_type VARCHAR(50) DEFAULT 'ci', -- ci, manual, release
    status VARCHAR(50) NOT NULL, -- success, failure, in_progress, cancelled
    branch_name VARCHAR(255),
    commit_hash VARCHAR(40),
    triggered_by VARCHAR(255),
    start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    test_results JSONB DEFAULT '{}', -- Test summary and results
    artifacts JSONB DEFAULT '{}', -- Build artifacts information
    logs TEXT, -- Build logs
    metadata JSONB DEFAULT '{}',
    UNIQUE(project_name, build_number)
);

CREATE INDEX IF NOT EXISTS idx_project_builds_project_status 
ON project_builds(project_name, status);

CREATE INDEX IF NOT EXISTS idx_project_builds_branch 
ON project_builds(project_name, branch_name);

-- 8. Documentation and Resources
CREATE TABLE IF NOT EXISTS project_documentation (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    doc_type VARCHAR(100) NOT NULL, -- api, user_guide, technical, changelog
    title VARCHAR(500) NOT NULL,
    content TEXT,
    format VARCHAR(50) DEFAULT 'markdown', -- markdown, html, plain_text
    version VARCHAR(50),
    author VARCHAR(255),
    tags TEXT[], -- Array of tags
    is_published BOOLEAN DEFAULT false,
    external_url TEXT, -- Link to external documentation
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}',
    UNIQUE(project_name, doc_type, title)
);

CREATE INDEX IF NOT EXISTS idx_project_documentation_project_type 
ON project_documentation(project_name, doc_type);

CREATE INDEX IF NOT EXISTS idx_project_documentation_published 
ON project_documentation(project_name, is_published);

-- 9. Module/Component Relationships
CREATE TABLE IF NOT EXISTS project_components (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    component_name VARCHAR(255) NOT NULL,
    component_type VARCHAR(100) NOT NULL, -- module, service, library, class, function
    file_path TEXT,
    description TEXT,
    version VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}',
    UNIQUE(project_name, component_name)
);

CREATE TABLE IF NOT EXISTS component_relationships (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    source_component VARCHAR(255) NOT NULL,
    target_component VARCHAR(255) NOT NULL,
    relationship_type VARCHAR(50) NOT NULL, -- depends_on, implements, extends, calls
    strength INTEGER DEFAULT 1, -- Relationship strength (1-10)
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}',
    UNIQUE(project_name, source_component, target_component, relationship_type)
);

CREATE INDEX IF NOT EXISTS idx_component_relationships_source 
ON component_relationships(project_name, source_component);

CREATE INDEX IF NOT EXISTS idx_component_relationships_target 
ON component_relationships(project_name, target_component);

-- 10. File Metadata
CREATE TABLE IF NOT EXISTS file_metadata (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_extension VARCHAR(50),
    file_size BIGINT,
    file_type VARCHAR(100), -- source_code, configuration, documentation, asset
    language VARCHAR(50), -- programming language
    encoding VARCHAR(50) DEFAULT 'utf-8',
    line_count INTEGER,
    last_modified TIMESTAMP WITH TIME ZONE,
    last_author VARCHAR(255),
    checksum VARCHAR(64),
    is_binary BOOLEAN DEFAULT false,
    is_generated BOOLEAN DEFAULT false, -- Auto-generated files
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB DEFAULT '{}',
    UNIQUE(project_name, file_path)
);

CREATE INDEX IF NOT EXISTS idx_file_metadata_project_type 
ON file_metadata(project_name, file_type);

CREATE INDEX IF NOT EXISTS idx_file_metadata_language 
ON file_metadata(project_name, language);

-- Add update triggers for new tables
CREATE TRIGGER update_project_tasks_updated_at 
    BEFORE UPDATE ON project_tasks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_dependencies_updated_at 
    BEFORE UPDATE ON project_dependencies 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_environments_updated_at 
    BEFORE UPDATE ON project_environments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_documentation_updated_at 
    BEFORE UPDATE ON project_documentation 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_components_updated_at 
    BEFORE UPDATE ON project_components 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_file_metadata_updated_at 
    BEFORE UPDATE ON file_metadata 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();