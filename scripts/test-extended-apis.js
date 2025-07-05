#!/usr/bin/env node

/**
 * Test script for all extended MCP Context Server APIs
 * This script tests all the new functionality added to the server
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class MCPExtendedTester {
    constructor() {
        this.serverProcess = null;
        this.testResults = [];
        this.projectName = 'test-project';
    }

    /**
     * Start the MCP server
     */
    async startServer() {
        return new Promise((resolve, reject) => {
            console.log('🚀 Starting MCP Context Server...');
            const serverPath = join(__dirname, '..', 'mcp-server', 'src', 'index.js');
            
            this.serverProcess = spawn('node', [serverPath], {
                stdio: ['pipe', 'pipe', 'pipe'],
                env: { ...process.env }
            });

            this.serverProcess.stderr.on('data', (data) => {
                const output = data.toString();
                console.log('Server stderr:', output);
                if (output.includes('MCP Context Server started successfully')) {
                    resolve();
                }
            });

            this.serverProcess.stdout.on('data', (data) => {
                console.log('Server stdout:', data.toString());
            });

            this.serverProcess.on('error', (error) => {
                console.error('Failed to start server:', error);
                reject(error);
            });

            // Timeout after 10 seconds
            setTimeout(() => {
                if (this.serverProcess && !this.serverProcess.killed) {
                    console.log('✅ Server appears to be running');
                    resolve();
                }
            }, 3000);
        });
    }

    /**
     * Send a request to the MCP server
     */
    async sendRequest(method, params) {
        return new Promise((resolve, reject) => {
            const request = {
                jsonrpc: '2.0',
                id: Date.now(),
                method: method,
                params: params
            };

            const requestStr = JSON.stringify(request) + '\n';
            
            let responseData = '';
            
            const onData = (data) => {
                responseData += data.toString();
                try {
                    const response = JSON.parse(responseData.trim());
                    this.serverProcess.stdout.removeListener('data', onData);
                    resolve(response);
                } catch (e) {
                    // Wait for more data
                }
            };

            this.serverProcess.stdout.on('data', onData);
            this.serverProcess.stdin.write(requestStr);

            // Timeout after 5 seconds
            setTimeout(() => {
                this.serverProcess.stdout.removeListener('data', onData);
                reject(new Error('Request timeout'));
            }, 5000);
        });
    }

    /**
     * Test tool execution
     */
    async testTool(toolName, args, expectedSuccess = true) {
        try {
            console.log(`\n🧪 Testing tool: ${toolName}`);
            console.log(`📝 Args:`, JSON.stringify(args, null, 2));

            const response = await this.sendRequest('tools/call', {
                name: toolName,
                arguments: args
            });

            const success = !response.error && (!response.result?.isError);
            
            if (success === expectedSuccess) {
                console.log(`✅ ${toolName}: PASSED`);
                this.testResults.push({ tool: toolName, status: 'PASSED', response });
            } else {
                console.log(`❌ ${toolName}: FAILED`);
                console.log('Response:', JSON.stringify(response, null, 2));
                this.testResults.push({ tool: toolName, status: 'FAILED', response });
            }

            return response;
        } catch (error) {
            console.log(`❌ ${toolName}: ERROR - ${error.message}`);
            this.testResults.push({ tool: toolName, status: 'ERROR', error: error.message });
            return null;
        }
    }

    /**
     * Run all tests
     */
    async runAllTests() {
        console.log('🎯 Starting Extended MCP Context Server Tests\n');

        // Test original functionality
        await this.testOriginalFunctionality();

        // Test file history
        await this.testFileHistory();

        // Test user management
        await this.testUserManagement();

        // Test task management
        await this.testTaskManagement();

        // Test dependency management
        await this.testDependencyManagement();

        // Test environment configuration
        await this.testEnvironmentConfiguration();

        // Test activity logging
        await this.testActivityLogging();

        // Test build management
        await this.testBuildManagement();

        // Test documentation
        await this.testDocumentation();

        // Test component relationships
        await this.testComponentRelationships();

        // Test file metadata
        await this.testFileMetadata();

        this.printSummary();
    }

    async testOriginalFunctionality() {
        console.log('\n📁 Testing Original Functionality');
        
        await this.testTool('store_context', {
            projectName: this.projectName,
            contextType: 'test_context',
            content: 'This is a test context',
            metadata: { test: true }
        });

        await this.testTool('get_context', {
            projectName: this.projectName,
            contextType: 'test_context'
        });

        await this.testTool('store_conversation', {
            projectName: this.projectName,
            conversationId: 'test-conversation',
            messageType: 'user',
            content: 'Hello, this is a test message',
            metadata: { test: true }
        });

        await this.testTool('get_conversation_history', {
            projectName: this.projectName,
            conversationId: 'test-conversation',
            limit: 10
        });
    }

    async testFileHistory() {
        console.log('\n📝 Testing File History');
        
        await this.testTool('store_file_history', {
            projectName: this.projectName,
            filePath: '/src/test.js',
            content: 'console.log("Hello World");',
            author: 'test-user',
            commitHash: 'abc123',
            changeDescription: 'Initial commit',
            metadata: { test: true }
        });

        await this.testTool('get_file_history', {
            projectName: this.projectName,
            filePath: '/src/test.js',
            limit: 10
        });
    }

    async testUserManagement() {
        console.log('\n👥 Testing User Management');
        
        await this.testTool('store_project_user', {
            projectName: this.projectName,
            username: 'john.doe',
            email: 'john.doe@example.com',
            role: 'developer',
            permissions: { read: true, write: true },
            metadata: { department: 'engineering' }
        });

        await this.testTool('store_project_user', {
            projectName: this.projectName,
            username: 'jane.smith',
            email: 'jane.smith@example.com',
            role: 'admin',
            permissions: { read: true, write: true, admin: true },
            metadata: { department: 'management' }
        });

        await this.testTool('get_project_users', {
            projectName: this.projectName,
            activeOnly: true
        });
    }

    async testTaskManagement() {
        console.log('\n📋 Testing Task Management');
        
        await this.testTool('store_project_task', {
            projectName: this.projectName,
            taskId: 'TASK-001',
            title: 'Implement user authentication',
            description: 'Add JWT-based authentication system',
            status: 'open',
            priority: 'high',
            taskType: 'feature',
            assignee: 'john.doe',
            reporter: 'jane.smith',
            metadata: { sprint: 'Sprint-1' }
        });

        await this.testTool('store_project_task', {
            projectName: this.projectName,
            taskId: 'BUG-001',
            title: 'Fix login bug',
            description: 'Users cannot login with special characters in password',
            status: 'in_progress',
            priority: 'critical',
            taskType: 'bug',
            assignee: 'john.doe',
            reporter: 'jane.smith',
            metadata: { severity: 'high' }
        });

        await this.testTool('get_project_tasks', {
            projectName: this.projectName,
            status: 'open',
            limit: 10
        });
    }

    async testDependencyManagement() {
        console.log('\n📦 Testing Dependency Management');
        
        await this.testTool('store_project_dependency', {
            projectName: this.projectName,
            packageName: 'express',
            version: '4.18.2',
            packageManager: 'npm',
            dependencyType: 'production',
            license: 'MIT',
            description: 'Fast, unopinionated, minimalist web framework',
            metadata: { category: 'web-framework' }
        });

        await this.testTool('store_project_dependency', {
            projectName: this.projectName,
            packageName: 'jest',
            version: '29.7.0',
            packageManager: 'npm',
            dependencyType: 'development',
            license: 'MIT',
            description: 'JavaScript testing framework',
            metadata: { category: 'testing' }
        });

        await this.testTool('get_project_dependencies', {
            projectName: this.projectName,
            packageManager: 'npm'
        });
    }

    async testEnvironmentConfiguration() {
        console.log('\n🌍 Testing Environment Configuration');
        
        await this.testTool('store_environment_config', {
            projectName: this.projectName,
            environmentName: 'development',
            configKey: 'DATABASE_URL',
            configValue: 'postgresql://localhost:5432/test_db',
            isSensitive: false,
            description: 'Development database connection string',
            metadata: { category: 'database' }
        });

        await this.testTool('store_environment_config', {
            projectName: this.projectName,
            environmentName: 'production',
            configKey: 'API_KEY',
            configValue: 'sk-12345...secret',
            isSensitive: true,
            description: 'Production API key',
            metadata: { provider: 'external-service' }
        });

        await this.testTool('get_environment_configs', {
            projectName: this.projectName,
            environmentName: 'development',
            includeSensitive: false
        });
    }

    async testActivityLogging() {
        console.log('\n📊 Testing Activity Logging');
        
        await this.testTool('log_activity', {
            projectName: this.projectName,
            activityType: 'file_changed',
            actor: 'john.doe',
            target: '/src/test.js',
            action: 'updated',
            details: 'Modified function implementation',
            ipAddress: '192.168.1.100',
            userAgent: 'VSCode/1.85.0',
            metadata: { editor: 'vscode' }
        });

        await this.testTool('log_activity', {
            projectName: this.projectName,
            activityType: 'task_created',
            actor: 'jane.smith',
            target: 'TASK-001',
            action: 'created',
            details: 'Created new feature task',
            metadata: { source: 'web-ui' }
        });

        await this.testTool('get_activity_logs', {
            projectName: this.projectName,
            activityType: 'file_changed',
            limit: 10
        });
    }

    async testBuildManagement() {
        console.log('\n🔨 Testing Build Management');
        
        await this.testTool('store_build', {
            projectName: this.projectName,
            buildNumber: 'BUILD-001',
            buildType: 'ci',
            status: 'in_progress',
            branchName: 'main',
            commitHash: 'abc123def456',
            triggeredBy: 'john.doe',
            testResults: { total: 25, passed: 23, failed: 2 },
            metadata: { trigger: 'push' }
        });

        await this.testTool('update_build_status', {
            projectName: this.projectName,
            buildNumber: 'BUILD-001',
            status: 'success',
            durationSeconds: 120,
            logs: 'Build completed successfully\nAll tests passed'
        });

        await this.testTool('get_build_history', {
            projectName: this.projectName,
            status: 'success',
            limit: 10
        });
    }

    async testDocumentation() {
        console.log('\n📚 Testing Documentation');
        
        await this.testTool('store_documentation', {
            projectName: this.projectName,
            docType: 'api',
            title: 'Authentication API',
            content: '# Authentication API\n\nThis API handles user authentication...',
            format: 'markdown',
            version: '1.0',
            author: 'john.doe',
            tags: ['authentication', 'security', 'api'],
            isPublished: true,
            metadata: { category: 'backend' }
        });

        await this.testTool('store_documentation', {
            projectName: this.projectName,
            docType: 'user_guide',
            title: 'Getting Started',
            content: '# Getting Started\n\nWelcome to our application...',
            format: 'markdown',
            author: 'jane.smith',
            tags: ['guide', 'beginner'],
            isPublished: false,
            metadata: { audience: 'end-users' }
        });

        await this.testTool('get_documentation', {
            projectName: this.projectName,
            docType: 'api',
            publishedOnly: true
        });
    }

    async testComponentRelationships() {
        console.log('\n🔗 Testing Component Relationships');
        
        await this.testTool('store_project_component', {
            projectName: this.projectName,
            componentName: 'AuthService',
            componentType: 'service',
            filePath: '/src/services/auth.js',
            description: 'Handles user authentication',
            version: '1.0.0',
            metadata: { layer: 'service' }
        });

        await this.testTool('store_project_component', {
            projectName: this.projectName,
            componentName: 'UserController',
            componentType: 'controller',
            filePath: '/src/controllers/user.js',
            description: 'Handles user-related HTTP requests',
            version: '1.0.0',
            metadata: { layer: 'controller' }
        });

        await this.testTool('store_component_relationship', {
            projectName: this.projectName,
            sourceComponent: 'UserController',
            targetComponent: 'AuthService',
            relationshipType: 'depends_on',
            strength: 8,
            description: 'UserController uses AuthService for authentication',
            metadata: { type: 'dependency' }
        });

        await this.testTool('get_project_components', {
            projectName: this.projectName,
            componentType: 'service',
            activeOnly: true
        });

        await this.testTool('get_component_relationships', {
            projectName: this.projectName,
            sourceComponent: 'UserController'
        });
    }

    async testFileMetadata() {
        console.log('\n🗂️ Testing File Metadata');
        
        await this.testTool('store_file_metadata', {
            projectName: this.projectName,
            filePath: '/src/services/auth.js',
            fileName: 'auth.js',
            fileExtension: 'js',
            fileSize: 2048,
            fileType: 'source_code',
            language: 'javascript',
            lineCount: 85,
            lastAuthor: 'john.doe',
            checksum: 'abc123def456',
            isBinary: false,
            isGenerated: false,
            metadata: { complexity: 'medium' }
        });

        await this.testTool('store_file_metadata', {
            projectName: this.projectName,
            filePath: '/src/controllers/user.js',
            fileName: 'user.js',
            fileExtension: 'js',
            fileSize: 1536,
            fileType: 'source_code',
            language: 'javascript',
            lineCount: 62,
            lastAuthor: 'jane.smith',
            checksum: 'def456ghi789',
            isBinary: false,
            isGenerated: false,
            metadata: { complexity: 'low' }
        });

        await this.testTool('get_file_metadata', {
            projectName: this.projectName,
            fileType: 'source_code',
            language: 'javascript',
            includeBinary: false
        });
    }

    /**
     * Print test summary
     */
    printSummary() {
        console.log('\n' + '='.repeat(50));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(50));

        const passed = this.testResults.filter(r => r.status === 'PASSED').length;
        const failed = this.testResults.filter(r => r.status === 'FAILED').length;
        const errors = this.testResults.filter(r => r.status === 'ERROR').length;
        const total = this.testResults.length;

        console.log(`Total Tests: ${total}`);
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`🚨 Errors: ${errors}`);
        console.log(`📈 Success Rate: ${((passed / total) * 100).toFixed(2)}%`);

        if (failed > 0 || errors > 0) {
            console.log('\n🔍 Failed/Error Tests:');
            this.testResults
                .filter(r => r.status !== 'PASSED')
                .forEach(r => {
                    console.log(`  - ${r.tool}: ${r.status}`);
                    if (r.error) console.log(`    Error: ${r.error}`);
                });
        }

        console.log('\n' + '='.repeat(50));
    }

    /**
     * Stop the server and clean up
     */
    cleanup() {
        if (this.serverProcess) {
            console.log('\n🛑 Stopping server...');
            this.serverProcess.kill();
        }
    }

    /**
     * Run the complete test suite
     */
    async run() {
        try {
            await this.startServer();
            await this.runAllTests();
        } catch (error) {
            console.error('❌ Test suite failed:', error);
        } finally {
            this.cleanup();
        }
    }
}

// Run the tests
const tester = new MCPExtendedTester();
tester.run().catch(console.error);
