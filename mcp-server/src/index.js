#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import DatabaseManager from './database.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * MCP Server for Context Storage
 * This server implements the Model Context Protocol to provide persistent storage
 * for AI conversations and project context
 */
class MCPContextServer {
    constructor() {
        this.db = new DatabaseManager();

        this.server = new Server(
            {
                name: 'context-storage-server',
                version: '1.0.0',
            },
            {
                capabilities: {
                    resources: {},
                    tools: {},
                },
            }
        );
        
        this.setupHandlers();
    }

    /**
     * Set up MCP protocol handlers
     */
    setupHandlers() {
        // Handle tool calls
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;

            switch (name) {
                // Original tools
                case 'store_context':
                    return await this.handleStoreContext(args);
                case 'get_context':
                    return await this.handleGetContext(args);
                case 'store_conversation':
                    return await this.handleStoreConversation(args);
                case 'get_conversation_history':
                    return await this.handleGetConversationHistory(args);
                
                // File history tools
                case 'store_file_history':
                    return await this.handleStoreFileHistory(args);
                case 'get_file_history':
                    return await this.handleGetFileHistory(args);
                
                // User management tools
                case 'store_project_user':
                    return await this.handleStoreProjectUser(args);
                case 'get_project_users':
                    return await this.handleGetProjectUsers(args);
                
                // Task management tools
                case 'store_project_task':
                    return await this.handleStoreProjectTask(args);
                case 'get_project_tasks':
                    return await this.handleGetProjectTasks(args);
                
                // Dependency management tools
                case 'store_project_dependency':
                    return await this.handleStoreProjectDependency(args);
                case 'get_project_dependencies':
                    return await this.handleGetProjectDependencies(args);
                
                // Environment configuration tools
                case 'store_environment_config':
                    return await this.handleStoreEnvironmentConfig(args);
                case 'get_environment_configs':
                    return await this.handleGetEnvironmentConfigs(args);
                
                // Activity logging tools
                case 'log_activity':
                    return await this.handleLogActivity(args);
                case 'get_activity_logs':
                    return await this.handleGetActivityLogs(args);
                
                // Build and test tools
                case 'store_build':
                    return await this.handleStoreBuild(args);
                case 'update_build_status':
                    return await this.handleUpdateBuildStatus(args);
                case 'get_build_history':
                    return await this.handleGetBuildHistory(args);
                
                // Documentation tools
                case 'store_documentation':
                    return await this.handleStoreDocumentation(args);
                case 'get_documentation':
                    return await this.handleGetDocumentation(args);
                
                // Component relationship tools
                case 'store_project_component':
                    return await this.handleStoreProjectComponent(args);
                case 'store_component_relationship':
                    return await this.handleStoreComponentRelationship(args);
                case 'get_project_components':
                    return await this.handleGetProjectComponents(args);
                case 'get_component_relationships':
                    return await this.handleGetComponentRelationships(args);
                
                // File metadata tools
                case 'store_file_metadata':
                    return await this.handleStoreFileMetadata(args);
                case 'get_file_metadata':
                    return await this.handleGetFileMetadata(args);
                
                default:
                    throw new Error(`Unknown tool: ${name}`);
            }
        });

        // List available tools
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: [
                    // Original tools
                    {
                        name: 'store_context',
                        description: 'Store project context information',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                contextType: { type: 'string' },
                                content: { type: 'string' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'contextType', 'content']
                        }
                    },
                    {
                        name: 'get_context',
                        description: 'Retrieve project context information',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                contextType: { type: 'string' }
                            },
                            required: ['projectName']
                        }
                    },
                    {
                        name: 'store_conversation',
                        description: 'Store conversation history',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                conversationId: { type: 'string' },
                                messageType: { type: 'string' },
                                content: { type: 'string' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'conversationId', 'messageType', 'content']
                        }
                    },
                    {
                        name: 'get_conversation_history',
                        description: 'Retrieve conversation history',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                conversationId: { type: 'string' },
                                limit: { type: 'number' }
                            },
                            required: ['projectName']
                        }
                    },
                    
                    // File history tools
                    {
                        name: 'store_file_history',
                        description: 'Store file version history with changes tracking',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                filePath: { type: 'string' },
                                content: { type: 'string' },
                                author: { type: 'string' },
                                commitHash: { type: 'string' },
                                changeDescription: { type: 'string' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'filePath', 'content', 'author']
                        }
                    },
                    {
                        name: 'get_file_history',
                        description: 'Retrieve file version history',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                filePath: { type: 'string' },
                                limit: { type: 'number' }
                            },
                            required: ['projectName']
                        }
                    },
                    
                    // User management tools
                    {
                        name: 'store_project_user',
                        description: 'Add or update project user with role and permissions',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                username: { type: 'string' },
                                email: { type: 'string' },
                                role: { type: 'string' },
                                permissions: { type: 'object' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'username', 'email']
                        }
                    },
                    {
                        name: 'get_project_users',
                        description: 'Retrieve project users and their roles',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                activeOnly: { type: 'boolean' }
                            },
                            required: ['projectName']
                        }
                    },
                    
                    // Task management tools
                    {
                        name: 'store_project_task',
                        description: 'Store or update project tasks, issues, and tickets',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                taskId: { type: 'string' },
                                title: { type: 'string' },
                                description: { type: 'string' },
                                status: { type: 'string' },
                                priority: { type: 'string' },
                                taskType: { type: 'string' },
                                assignee: { type: 'string' },
                                reporter: { type: 'string' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'taskId', 'title']
                        }
                    },
                    {
                        name: 'get_project_tasks',
                        description: 'Retrieve project tasks with filtering options',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                status: { type: 'string' },
                                assignee: { type: 'string' },
                                limit: { type: 'number' }
                            },
                            required: ['projectName']
                        }
                    },
                    
                    // Dependency management tools
                    {
                        name: 'store_project_dependency',
                        description: 'Store project dependencies and package versions',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                packageName: { type: 'string' },
                                version: { type: 'string' },
                                packageManager: { type: 'string' },
                                dependencyType: { type: 'string' },
                                license: { type: 'string' },
                                description: { type: 'string' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'packageName', 'version', 'packageManager']
                        }
                    },
                    {
                        name: 'get_project_dependencies',
                        description: 'Retrieve project dependencies with filtering',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                packageManager: { type: 'string' },
                                dependencyType: { type: 'string' }
                            },
                            required: ['projectName']
                        }
                    },
                    
                    // Environment configuration tools
                    {
                        name: 'store_environment_config',
                        description: 'Store environment variables and configurations',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                environmentName: { type: 'string' },
                                configKey: { type: 'string' },
                                configValue: { type: 'string' },
                                isSensitive: { type: 'boolean' },
                                description: { type: 'string' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'environmentName', 'configKey', 'configValue']
                        }
                    },
                    {
                        name: 'get_environment_configs',
                        description: 'Retrieve environment configurations',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                environmentName: { type: 'string' },
                                includeSensitive: { type: 'boolean' }
                            },
                            required: ['projectName']
                        }
                    },
                    
                    // Activity logging tools
                    {
                        name: 'log_activity',
                        description: 'Log project activities and audit trail',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                activityType: { type: 'string' },
                                actor: { type: 'string' },
                                target: { type: 'string' },
                                action: { type: 'string' },
                                details: { type: 'string' },
                                ipAddress: { type: 'string' },
                                userAgent: { type: 'string' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'activityType', 'actor', 'target', 'action']
                        }
                    },
                    {
                        name: 'get_activity_logs',
                        description: 'Retrieve project activity logs',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                activityType: { type: 'string' },
                                actor: { type: 'string' },
                                limit: { type: 'number' }
                            },
                            required: ['projectName']
                        }
                    },
                    
                    // Build and test tools
                    {
                        name: 'store_build',
                        description: 'Store build information and test results',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                buildNumber: { type: 'string' },
                                buildType: { type: 'string' },
                                status: { type: 'string' },
                                branchName: { type: 'string' },
                                commitHash: { type: 'string' },
                                triggeredBy: { type: 'string' },
                                testResults: { type: 'object' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'buildNumber', 'buildType', 'status']
                        }
                    },
                    {
                        name: 'update_build_status',
                        description: 'Update build status and completion information',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                buildNumber: { type: 'string' },
                                status: { type: 'string' },
                                endTime: { type: 'string' },
                                durationSeconds: { type: 'number' },
                                logs: { type: 'string' }
                            },
                            required: ['projectName', 'buildNumber', 'status']
                        }
                    },
                    {
                        name: 'get_build_history',
                        description: 'Retrieve build history with filtering options',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                status: { type: 'string' },
                                branchName: { type: 'string' },
                                limit: { type: 'number' }
                            },
                            required: ['projectName']
                        }
                    },
                    
                    // Documentation tools
                    {
                        name: 'store_documentation',
                        description: 'Store project documentation and resources',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                docType: { type: 'string' },
                                title: { type: 'string' },
                                content: { type: 'string' },
                                format: { type: 'string' },
                                version: { type: 'string' },
                                author: { type: 'string' },
                                tags: { type: 'array', items: { type: 'string' } },
                                isPublished: { type: 'boolean' },
                                externalUrl: { type: 'string' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'docType', 'title', 'content']
                        }
                    },
                    {
                        name: 'get_documentation',
                        description: 'Retrieve project documentation',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                docType: { type: 'string' },
                                publishedOnly: { type: 'boolean' }
                            },
                            required: ['projectName']
                        }
                    },
                    
                    // Component relationship tools
                    {
                        name: 'store_project_component',
                        description: 'Store project components and modules',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                componentName: { type: 'string' },
                                componentType: { type: 'string' },
                                filePath: { type: 'string' },
                                description: { type: 'string' },
                                version: { type: 'string' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'componentName', 'componentType']
                        }
                    },
                    {
                        name: 'store_component_relationship',
                        description: 'Store relationships between components',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                sourceComponent: { type: 'string' },
                                targetComponent: { type: 'string' },
                                relationshipType: { type: 'string' },
                                strength: { type: 'number' },
                                description: { type: 'string' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'sourceComponent', 'targetComponent', 'relationshipType']
                        }
                    },
                    {
                        name: 'get_project_components',
                        description: 'Retrieve project components',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                componentType: { type: 'string' },
                                activeOnly: { type: 'boolean' }
                            },
                            required: ['projectName']
                        }
                    },
                    {
                        name: 'get_component_relationships',
                        description: 'Retrieve component relationships',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                sourceComponent: { type: 'string' },
                                targetComponent: { type: 'string' }
                            },
                            required: ['projectName']
                        }
                    },
                    
                    // File metadata tools
                    {
                        name: 'store_file_metadata',
                        description: 'Store file metadata and properties',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                filePath: { type: 'string' },
                                fileName: { type: 'string' },
                                fileExtension: { type: 'string' },
                                fileSize: { type: 'number' },
                                fileType: { type: 'string' },
                                language: { type: 'string' },
                                lineCount: { type: 'number' },
                                lastAuthor: { type: 'string' },
                                checksum: { type: 'string' },
                                isBinary: { type: 'boolean' },
                                isGenerated: { type: 'boolean' },
                                metadata: { type: 'object' }
                            },
                            required: ['projectName', 'filePath', 'fileName']
                        }
                    },
                    {
                        name: 'get_file_metadata',
                        description: 'Retrieve file metadata with filtering',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectName: { type: 'string' },
                                fileType: { type: 'string' },
                                language: { type: 'string' },
                                includeBinary: { type: 'boolean' }
                            },
                            required: ['projectName']
                        }
                    }
                ]
            };
        });
    }

    /**
     * Handle storing project context
     */
    async handleStoreContext(args) {
        try {
            const { projectName, contextType, content, metadata = {} } = args;
            const result = await this.db.storeContext(projectName, contextType, content, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully stored context for project "${projectName}" with type "${contextType}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error storing context: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    /**
     * Handle retrieving project context
     */
    async handleGetContext(args) {
        try {
            const { projectName, contextType } = args;
            const contexts = await this.db.getContext(projectName, contextType);
            
            if (contexts.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No context found for project "${projectName}"${contextType ? ` with type "${contextType}"` : ''}`
                        }
                    ]
                };
            }

            const contextText = contexts.map(ctx => 
                `Type: ${ctx.context_type}\nContent: ${ctx.content}\nUpdated: ${ctx.updated_at}`
            ).join('\n\n---\n\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: contextText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving context: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    /**
     * Handle storing conversation history
     */
    async handleStoreConversation(args) {
        try {
            const { projectName, conversationId, messageType, content, metadata = {} } = args;
            const result = await this.db.storeConversation(projectName, conversationId, messageType, content, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully stored ${messageType} message for conversation "${conversationId}" in project "${projectName}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error storing conversation: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    /**
     * Handle retrieving conversation history
     */
    async handleGetConversationHistory(args) {
        try {
            const { projectName, conversationId, limit = 50 } = args;
            const history = await this.db.getConversationHistory(projectName, conversationId, limit);
            
            if (history.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No conversation history found for project "${projectName}"${conversationId ? ` and conversation "${conversationId}"` : ''}`
                        }
                    ]
                };
            }

            const historyText = history.reverse().map(msg => 
                `[${msg.timestamp}] ${msg.message_type}: ${msg.content}`
            ).join('\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: historyText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving conversation history: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    // ============================================
    // FILE HISTORY HANDLERS
    // ============================================

    async handleStoreFileHistory(args) {
        try {
            const { projectName, filePath, content, author, commitHash, changeDescription, metadata = {} } = args;
            const result = await this.db.storeFileHistory(projectName, filePath, content, author, commitHash, changeDescription, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully stored file history for "${filePath}" in project "${projectName}" (version ${result.version_number})`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error storing file history: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleGetFileHistory(args) {
        try {
            const { projectName, filePath, limit = 50 } = args;
            const history = await this.db.getFileHistory(projectName, filePath, limit);
            
            if (history.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No file history found for project "${projectName}"${filePath ? ` and file "${filePath}"` : ''}`
                        }
                    ]
                };
            }

            const historyText = history.map(entry => 
                `Version ${entry.version_number} - ${entry.file_path}\nAuthor: ${entry.author}\nDate: ${entry.created_at}\nChanges: ${entry.change_description || 'No description'}\nCommit: ${entry.commit_hash || 'N/A'}\n`
            ).join('\n---\n\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: historyText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving file history: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    // ============================================
    // USER MANAGEMENT HANDLERS
    // ============================================

    async handleStoreProjectUser(args) {
        try {
            const { projectName, username, email, role = 'developer', permissions = {}, metadata = {} } = args;
            const result = await this.db.storeProjectUser(projectName, username, email, role, permissions, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully stored user "${username}" with role "${role}" in project "${projectName}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error storing project user: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleGetProjectUsers(args) {
        try {
            const { projectName, activeOnly = true } = args;
            const users = await this.db.getProjectUsers(projectName, activeOnly);
            
            if (users.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No users found for project "${projectName}"`
                        }
                    ]
                };
            }

            const usersText = users.map(user => 
                `Username: ${user.username}\nEmail: ${user.email}\nRole: ${user.role}\nActive: ${user.is_active}\nLast Active: ${user.last_active || 'Never'}\n`
            ).join('\n---\n\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: usersText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving project users: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    // ============================================
    // TASK MANAGEMENT HANDLERS
    // ============================================

    async handleStoreProjectTask(args) {
        try {
            const { projectName, taskId, title, description, status = 'open', priority = 'medium', taskType = 'feature', assignee, reporter, metadata = {} } = args;
            const result = await this.db.storeProjectTask(projectName, taskId, title, description, status, priority, taskType, assignee, reporter, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully stored task "${taskId}" (${title}) in project "${projectName}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error storing project task: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleGetProjectTasks(args) {
        try {
            const { projectName, status, assignee, limit = 100 } = args;
            const tasks = await this.db.getProjectTasks(projectName, status, assignee, limit);
            
            if (tasks.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No tasks found for project "${projectName}"${status ? ` with status "${status}"` : ''}${assignee ? ` assigned to "${assignee}"` : ''}`
                        }
                    ]
                };
            }

            const tasksText = tasks.map(task => 
                `ID: ${task.task_id}\nTitle: ${task.title}\nStatus: ${task.status}\nPriority: ${task.priority}\nType: ${task.task_type}\nAssignee: ${task.assignee || 'Unassigned'}\nCreated: ${task.created_at}\n`
            ).join('\n---\n\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: tasksText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving project tasks: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    // ============================================
    // DEPENDENCY MANAGEMENT HANDLERS
    // ============================================

    async handleStoreProjectDependency(args) {
        try {
            const { projectName, packageName, version, packageManager, dependencyType = 'production', license, description, metadata = {} } = args;
            const result = await this.db.storeProjectDependency(projectName, packageName, version, packageManager, dependencyType, license, description, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully stored dependency "${packageName}@${version}" (${packageManager}) in project "${projectName}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error storing project dependency: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleGetProjectDependencies(args) {
        try {
            const { projectName, packageManager, dependencyType } = args;
            const dependencies = await this.db.getProjectDependencies(projectName, packageManager, dependencyType);
            
            if (dependencies.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No dependencies found for project "${projectName}"${packageManager ? ` with package manager "${packageManager}"` : ''}${dependencyType ? ` of type "${dependencyType}"` : ''}`
                        }
                    ]
                };
            }

            const depsText = dependencies.map(dep => 
                `Package: ${dep.package_name}@${dep.version}\nManager: ${dep.package_manager}\nType: ${dep.dependency_type}\nLicense: ${dep.license || 'Unknown'}\nInstalled: ${dep.installed_at}\n`
            ).join('\n---\n\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: depsText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving project dependencies: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    // ============================================
    // ENVIRONMENT CONFIGURATION HANDLERS
    // ============================================

    async handleStoreEnvironmentConfig(args) {
        try {
            const { projectName, environmentName, configKey, configValue, isSensitive = false, description, metadata = {} } = args;
            const result = await this.db.storeEnvironmentConfig(projectName, environmentName, configKey, configValue, isSensitive, description, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully stored config "${configKey}" for environment "${environmentName}" in project "${projectName}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error storing environment config: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleGetEnvironmentConfigs(args) {
        try {
            const { projectName, environmentName, includeSensitive = false } = args;
            const configs = await this.db.getEnvironmentConfigs(projectName, environmentName, includeSensitive);
            
            if (configs.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No environment configs found for project "${projectName}"${environmentName ? ` in environment "${environmentName}"` : ''}`
                        }
                    ]
                };
            }

            const configsText = configs.map(config => 
                `Environment: ${config.environment_name}\nKey: ${config.config_key}\nValue: ${config.is_sensitive ? '[SENSITIVE]' : config.config_value}\nSensitive: ${config.is_sensitive}\nDescription: ${config.description || 'N/A'}\n`
            ).join('\n---\n\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: configsText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving environment configs: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    // ============================================
    // ACTIVITY LOG HANDLERS
    // ============================================

    async handleLogActivity(args) {
        try {
            const { projectName, activityType, actor, target, action, details, ipAddress, userAgent, metadata = {} } = args;
            const result = await this.db.logActivity(projectName, activityType, actor, target, action, details, ipAddress, userAgent, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully logged activity: ${actor} ${action} ${target} (${activityType}) in project "${projectName}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error logging activity: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleGetActivityLogs(args) {
        try {
            const { projectName, activityType, actor, limit = 100 } = args;
            const logs = await this.db.getActivityLogs(projectName, activityType, actor, limit);
            
            if (logs.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No activity logs found for project "${projectName}"${activityType ? ` of type "${activityType}"` : ''}${actor ? ` by actor "${actor}"` : ''}`
                        }
                    ]
                };
            }

            const logsText = logs.map(log => 
                `[${log.timestamp}] ${log.activity_type}: ${log.actor} ${log.action} ${log.target}\nDetails: ${log.details || 'N/A'}\nIP: ${log.ip_address || 'N/A'}\n`
            ).join('\n---\n\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: logsText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving activity logs: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    // ============================================
    // BUILD AND TEST HANDLERS
    // ============================================

    async handleStoreBuild(args) {
        try {
            const { projectName, buildNumber, buildType, status, branchName, commitHash, triggeredBy, testResults = {}, metadata = {} } = args;
            const result = await this.db.storeBuild(projectName, buildNumber, buildType, status, branchName, commitHash, triggeredBy, testResults, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully stored build "${buildNumber}" (${buildType}) with status "${status}" in project "${projectName}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error storing build: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleUpdateBuildStatus(args) {
        try {
            const { projectName, buildNumber, status, endTime, durationSeconds, logs } = args;
            const result = await this.db.updateBuildStatus(projectName, buildNumber, status, endTime, durationSeconds, logs);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully updated build "${buildNumber}" status to "${status}" in project "${projectName}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error updating build status: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleGetBuildHistory(args) {
        try {
            const { projectName, status, branchName, limit = 50 } = args;
            const builds = await this.db.getBuildHistory(projectName, status, branchName, limit);
            
            if (builds.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No build history found for project "${projectName}"${status ? ` with status "${status}"` : ''}${branchName ? ` on branch "${branchName}"` : ''}`
                        }
                    ]
                };
            }

            const buildsText = builds.map(build => 
                `Build: ${build.build_number}\nType: ${build.build_type}\nStatus: ${build.status}\nBranch: ${build.branch_name || 'N/A'}\nTriggered by: ${build.triggered_by || 'Unknown'}\nStarted: ${build.start_time}\nDuration: ${build.duration_seconds ? `${build.duration_seconds}s` : 'N/A'}\n`
            ).join('\n---\n\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: buildsText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving build history: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    // ============================================
    // DOCUMENTATION HANDLERS
    // ============================================

    async handleStoreDocumentation(args) {
        try {
            const { projectName, docType, title, content, format = 'markdown', version, author, tags = [], isPublished = false, externalUrl, metadata = {} } = args;
            const result = await this.db.storeDocumentation(projectName, docType, title, content, format, version, author, tags, isPublished, externalUrl, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully stored documentation "${title}" (${docType}) in project "${projectName}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error storing documentation: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleGetDocumentation(args) {
        try {
            const { projectName, docType, publishedOnly = false } = args;
            const docs = await this.db.getDocumentation(projectName, docType, publishedOnly);
            
            if (docs.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No documentation found for project "${projectName}"${docType ? ` of type "${docType}"` : ''}${publishedOnly ? ' (published only)' : ''}`
                        }
                    ]
                };
            }

            const docsText = docs.map(doc => 
                `Title: ${doc.title}\nType: ${doc.doc_type}\nFormat: ${doc.format}\nAuthor: ${doc.author || 'Unknown'}\nVersion: ${doc.version || 'N/A'}\nPublished: ${doc.is_published}\nTags: ${doc.tags?.join(', ') || 'None'}\nURL: ${doc.external_url || 'N/A'}\nUpdated: ${doc.updated_at}\n\nContent:\n${doc.content.substring(0, 500)}${doc.content.length > 500 ? '...' : ''}\n`
            ).join('\n---\n\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: docsText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving documentation: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    // ============================================
    // COMPONENT RELATIONSHIP HANDLERS
    // ============================================

    async handleStoreProjectComponent(args) {
        try {
            const { projectName, componentName, componentType, filePath, description, version, metadata = {} } = args;
            const result = await this.db.storeProjectComponent(projectName, componentName, componentType, filePath, description, version, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully stored component "${componentName}" (${componentType}) in project "${projectName}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error storing project component: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleStoreComponentRelationship(args) {
        try {
            const { projectName, sourceComponent, targetComponent, relationshipType, strength = 1, description, metadata = {} } = args;
            const result = await this.db.storeComponentRelationship(projectName, sourceComponent, targetComponent, relationshipType, strength, description, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully stored relationship: ${sourceComponent} ${relationshipType} ${targetComponent} in project "${projectName}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error storing component relationship: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleGetProjectComponents(args) {
        try {
            const { projectName, componentType, activeOnly = true } = args;
            const components = await this.db.getProjectComponents(projectName, componentType, activeOnly);
            
            if (components.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No components found for project "${projectName}"${componentType ? ` of type "${componentType}"` : ''}${activeOnly ? ' (active only)' : ''}`
                        }
                    ]
                };
            }

            const componentsText = components.map(comp => 
                `Name: ${comp.component_name}\nType: ${comp.component_type}\nFile: ${comp.file_path || 'N/A'}\nVersion: ${comp.version || 'N/A'}\nDescription: ${comp.description || 'N/A'}\nActive: ${comp.is_active}\nUpdated: ${comp.updated_at}\n`
            ).join('\n---\n\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: componentsText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving project components: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleGetComponentRelationships(args) {
        try {
            const { projectName, sourceComponent, targetComponent } = args;
            const relationships = await this.db.getComponentRelationships(projectName, sourceComponent, targetComponent);
            
            if (relationships.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No component relationships found for project "${projectName}"${sourceComponent ? ` from "${sourceComponent}"` : ''}${targetComponent ? ` to "${targetComponent}"` : ''}`
                        }
                    ]
                };
            }

            const relationshipsText = relationships.map(rel => 
                `${rel.source_component} ${rel.relationship_type} ${rel.target_component}\nStrength: ${rel.strength}/10\nDescription: ${rel.description || 'N/A'}\nCreated: ${rel.created_at}\n`
            ).join('\n---\n\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: relationshipsText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving component relationships: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    // ============================================
    // FILE METADATA HANDLERS
    // ============================================

    async handleStoreFileMetadata(args) {
        try {
            const { projectName, filePath, fileName, fileExtension, fileSize, fileType, language, lineCount, lastAuthor, checksum, isBinary = false, isGenerated = false, metadata = {} } = args;
            const result = await this.db.storeFileMetadata(projectName, filePath, fileName, fileExtension, fileSize, fileType, language, lineCount, lastAuthor, checksum, isBinary, isGenerated, metadata);
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully stored metadata for file "${fileName}" in project "${projectName}"`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error storing file metadata: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    async handleGetFileMetadata(args) {
        try {
            const { projectName, fileType, language, includeBinary = false } = args;
            const files = await this.db.getFileMetadata(projectName, fileType, language, includeBinary);
            
            if (files.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No file metadata found for project "${projectName}"${fileType ? ` of type "${fileType}"` : ''}${language ? ` in language "${language}"` : ''}${!includeBinary ? ' (excluding binary files)' : ''}`
                        }
                    ]
                };
            }

            const filesText = files.map(file => 
                `File: ${file.file_name}\nPath: ${file.file_path}\nType: ${file.file_type || 'Unknown'}\nLanguage: ${file.language || 'Unknown'}\nSize: ${file.file_size ? `${file.file_size} bytes` : 'Unknown'}\nLines: ${file.line_count || 'Unknown'}\nAuthor: ${file.last_author || 'Unknown'}\nBinary: ${file.is_binary}\nGenerated: ${file.is_generated}\nModified: ${file.last_modified}\n`
            ).join('\n---\n\n');

            return {
                content: [
                    {
                        type: 'text',
                        text: filesText
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error retrieving file metadata: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }

    /**
     * Start the MCP server
     */
    async start() {
        // Test database connection
        const isConnected = await this.db.testConnection();
        if (!isConnected) {
            console.error('Failed to connect to database. Please check your configuration.');
            process.exit(1);
        }

        // Start the server with stdio transport
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        
        console.log('MCP Context Server started successfully');
    }

    /**
     * Gracefully shut down the server
     */
    async shutdown() {
        await this.db.close();
        console.log('MCP Context Server shut down gracefully');
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nReceived SIGINT, shutting down gracefully...');
    await server.shutdown();
    process.exit(0);
});

// Start the server
const server = new MCPContextServer();
await server.start();