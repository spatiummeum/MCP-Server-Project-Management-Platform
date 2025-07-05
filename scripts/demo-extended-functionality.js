#!/usr/bin/env node

/**
 * Demo script showing the extended MCP Context Server capabilities
 * This script demonstrates key functionality with real-world examples
 */

import DatabaseManager from '../mcp-server/src/database.js';
import dotenv from 'dotenv';

dotenv.config();

class MCPExtendedDemo {
    constructor() {
        this.db = new DatabaseManager();
        this.projectName = 'demo-ecommerce-app';
    }

    async run() {
        console.log('🚀 MCP Context Server - Extended Functionality Demo');
        console.log('='.repeat(60));

        try {
            // Test database connection
            const isConnected = await this.db.testConnection();
            if (!isConnected) {
                console.error('❌ Failed to connect to database');
                return;
            }

            console.log('✅ Database connected successfully\n');

            // Demo scenarios
            await this.demoProjectSetup();
            await this.demoUserManagement();
            await this.demoTaskManagement();
            await this.demoDependencyTracking();
            await this.demoFileManagement();
            await this.demoBuildProcess();
            await this.demoDocumentation();
            await this.demoActivityTracking();
            await this.demoProjectAnalysis();

            console.log('\n' + '='.repeat(60));
            console.log('🎉 Demo completed successfully!');
            console.log('📊 Check the database to see all stored data');
            
        } catch (error) {
            console.error('❌ Demo failed:', error);
        } finally {
            await this.db.close();
        }
    }

    async demoProjectSetup() {
        console.log('📁 Setting up demo project: E-commerce Application');
        
        // Store initial project context
        await this.db.storeContext(
            this.projectName,
            'project_overview',
            'Modern e-commerce web application built with Node.js, React, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment processing.',
            {
                technology_stack: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
                start_date: '2025-01-01',
                estimated_duration: '6 months',
                team_size: 5
            }
        );
        
        console.log('✅ Project context stored');
    }

    async demoUserManagement() {
        console.log('\n👥 Adding team members...');
        
        const users = [
            {
                username: 'alice.johnson',
                email: 'alice.johnson@company.com',
                role: 'admin',
                permissions: { read: true, write: true, admin: true, deploy: true },
                metadata: { department: 'engineering', seniority: 'senior', timezone: 'UTC-5' }
            },
            {
                username: 'bob.smith',
                email: 'bob.smith@company.com',
                role: 'developer',
                permissions: { read: true, write: true, review: true },
                metadata: { department: 'engineering', seniority: 'mid', specialization: 'frontend' }
            },
            {
                username: 'charlie.brown',
                email: 'charlie.brown@company.com',
                role: 'developer',
                permissions: { read: true, write: true, review: true },
                metadata: { department: 'engineering', seniority: 'mid', specialization: 'backend' }
            },
            {
                username: 'diana.wilson',
                email: 'diana.wilson@company.com',
                role: 'tester',
                permissions: { read: true, test: true, report_bugs: true },
                metadata: { department: 'qa', seniority: 'senior', automation_expert: true }
            }
        ];

        for (const user of users) {
            await this.db.storeProjectUser(
                this.projectName,
                user.username,
                user.email,
                user.role,
                user.permissions,
                user.metadata
            );
            console.log(`   ✅ Added ${user.username} (${user.role})`);
        }
    }

    async demoTaskManagement() {
        console.log('\n📋 Creating project tasks...');
        
        const tasks = [
            {
                taskId: 'FEAT-001',
                title: 'Implement User Authentication System',
                description: 'Create JWT-based authentication with login, register, and password reset functionality',
                status: 'in_progress',
                priority: 'high',
                taskType: 'feature',
                assignee: 'charlie.brown',
                reporter: 'alice.johnson',
                metadata: { epic: 'User Management', story_points: 8, sprint: 'Sprint-1' }
            },
            {
                taskId: 'FEAT-002',
                title: 'Product Catalog API',
                description: 'REST API for product CRUD operations with search and filtering',
                status: 'open',
                priority: 'high',
                taskType: 'feature',
                assignee: 'charlie.brown',
                reporter: 'alice.johnson',
                metadata: { epic: 'Product Management', story_points: 13, sprint: 'Sprint-2' }
            },
            {
                taskId: 'FEAT-003',
                title: 'Shopping Cart Frontend',
                description: 'React components for shopping cart functionality',
                status: 'open',
                priority: 'medium',
                taskType: 'feature',
                assignee: 'bob.smith',
                reporter: 'alice.johnson',
                metadata: { epic: 'Shopping Experience', story_points: 5, sprint: 'Sprint-2' }
            },
            {
                taskId: 'BUG-001',
                title: 'Login form validation issues',
                description: 'Email validation not working properly for certain domains',
                status: 'open',
                priority: 'medium',
                taskType: 'bug',
                assignee: 'bob.smith',
                reporter: 'diana.wilson',
                metadata: { severity: 'medium', found_in_testing: true }
            }
        ];

        for (const task of tasks) {
            await this.db.storeProjectTask(
                this.projectName,
                task.taskId,
                task.title,
                task.description,
                task.status,
                task.priority,
                task.taskType,
                task.assignee,
                task.reporter,
                task.metadata
            );
            console.log(`   ✅ Created task ${task.taskId}: ${task.title}`);
        }
    }

    async demoDependencyTracking() {
        console.log('\n📦 Tracking project dependencies...');
        
        const dependencies = [
            // Production dependencies
            { name: 'express', version: '4.18.2', manager: 'npm', type: 'production', license: 'MIT', desc: 'Web framework' },
            { name: 'jsonwebtoken', version: '9.0.2', manager: 'npm', type: 'production', license: 'MIT', desc: 'JWT implementation' },
            { name: 'bcryptjs', version: '2.4.3', manager: 'npm', type: 'production', license: 'MIT', desc: 'Password hashing' },
            { name: 'pg', version: '8.11.3', manager: 'npm', type: 'production', license: 'MIT', desc: 'PostgreSQL client' },
            { name: 'stripe', version: '13.11.0', manager: 'npm', type: 'production', license: 'MIT', desc: 'Payment processing' },
            { name: 'react', version: '18.2.0', manager: 'npm', type: 'production', license: 'MIT', desc: 'UI library' },
            { name: 'react-router-dom', version: '6.15.0', manager: 'npm', type: 'production', license: 'MIT', desc: 'Routing' },
            
            // Development dependencies
            { name: 'jest', version: '29.7.0', manager: 'npm', type: 'development', license: 'MIT', desc: 'Testing framework' },
            { name: 'eslint', version: '8.49.0', manager: 'npm', type: 'development', license: 'MIT', desc: 'Code linting' },
            { name: 'prettier', version: '3.0.3', manager: 'npm', type: 'development', license: 'MIT', desc: 'Code formatting' },
            { name: 'nodemon', version: '3.0.1', manager: 'npm', type: 'development', license: 'MIT', desc: 'Development server' }
        ];

        for (const dep of dependencies) {
            await this.db.storeProjectDependency(
                this.projectName,
                dep.name,
                dep.version,
                dep.manager,
                dep.type,
                dep.license,
                dep.desc,
                { category: dep.type === 'production' ? 'runtime' : 'tooling' }
            );
            console.log(`   ✅ Tracked ${dep.name}@${dep.version} (${dep.type})`);
        }
    }

    async demoFileManagement() {
        console.log('\n📝 Managing file history and metadata...');
        
        // File history
        await this.db.storeFileHistory(
            this.projectName,
            '/src/auth/authController.js',
            `const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

class AuthController {
    async login(req, res) {
        // Implementation here
    }
    
    async register(req, res) {
        // Implementation here
    }
}

module.exports = AuthController;`,
            'charlie.brown',
            'abc123def456',
            'Initial implementation of authentication controller',
            { lines_added: 25, complexity: 'medium' }
        );

        // File metadata
        await this.db.storeFileMetadata(
            this.projectName,
            '/src/auth/authController.js',
            'authController.js',
            'js',
            1024,
            'source_code',
            'javascript',
            25,
            'charlie.brown',
            'abc123def456',
            false,
            false,
            { complexity: 'medium', test_coverage: 85 }
        );

        console.log('   ✅ Stored file history and metadata for authController.js');
    }

    async demoBuildProcess() {
        console.log('\n🔨 Tracking build and deployment...');
        
        // Store build information
        await this.db.storeBuild(
            this.projectName,
            'BUILD-20250705-001',
            'ci',
            'success',
            'feature/user-auth',
            'abc123def456ghi789',
            'charlie.brown',
            {
                total_tests: 45,
                passed_tests: 43,
                failed_tests: 2,
                coverage: 87.5,
                duration_ms: 45000
            },
            { trigger: 'pull_request', pr_number: 15 }
        );

        // Update build with completion details
        await this.db.updateBuildStatus(
            this.projectName,
            'BUILD-20250705-001',
            'success',
            null,
            45,
            'Build completed successfully\nAll critical tests passed\n2 non-critical tests failed'
        );

        console.log('   ✅ Tracked build BUILD-20250705-001 (success)');
    }

    async demoDocumentation() {
        console.log('\n📚 Creating project documentation...');
        
        const docs = [
            {
                type: 'api',
                title: 'Authentication API Reference',
                content: `# Authentication API

## POST /auth/login
Login endpoint for user authentication.

### Request Body
\`\`\`json
{
  "email": "user@example.com",
  "password": "securepassword"
}
\`\`\`

### Response
\`\`\`json
{
  "token": "jwt.token.here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
\`\`\``,
                author: 'charlie.brown',
                tags: ['authentication', 'api', 'security'],
                published: true
            },
            {
                type: 'user_guide',
                title: 'Getting Started Guide',
                content: `# Getting Started

Welcome to our e-commerce application!

## Installation

1. Clone the repository
2. Run \`npm install\`
3. Configure environment variables
4. Run \`npm start\`

## First Steps

1. Create an account
2. Browse products
3. Add items to cart
4. Proceed to checkout`,
                author: 'alice.johnson',
                tags: ['guide', 'setup', 'beginners'],
                published: true
            }
        ];

        for (const doc of docs) {
            await this.db.storeDocumentation(
                this.projectName,
                doc.type,
                doc.title,
                doc.content,
                'markdown',
                '1.0',
                doc.author,
                doc.tags,
                doc.published,
                null,
                { audience: doc.type === 'api' ? 'developers' : 'end-users' }
            );
            console.log(`   ✅ Created ${doc.type} documentation: ${doc.title}`);
        }
    }

    async demoActivityTracking() {
        console.log('\n📊 Logging project activities...');
        
        const activities = [
            {
                type: 'file_changed',
                actor: 'charlie.brown',
                target: '/src/auth/authController.js',
                action: 'created',
                details: 'Initial implementation of authentication controller',
                metadata: { editor: 'vscode', lines_changed: 25 }
            },
            {
                type: 'task_updated',
                actor: 'alice.johnson',
                target: 'FEAT-001',
                action: 'assigned',
                details: 'Assigned authentication task to Charlie',
                metadata: { previous_assignee: null }
            },
            {
                type: 'build_triggered',
                actor: 'charlie.brown',
                target: 'BUILD-20250705-001',
                action: 'started',
                details: 'CI build triggered by pull request',
                metadata: { pr_number: 15, branch: 'feature/user-auth' }
            },
            {
                type: 'documentation_created',
                actor: 'charlie.brown',
                target: 'Authentication API Reference',
                action: 'published',
                details: 'Published API documentation for authentication endpoints',
                metadata: { doc_type: 'api' }
            }
        ];

        for (const activity of activities) {
            await this.db.logActivity(
                this.projectName,
                activity.type,
                activity.actor,
                activity.target,
                activity.action,
                activity.details,
                '192.168.1.100',
                'VSCode/1.85.0',
                activity.metadata
            );
            console.log(`   ✅ Logged: ${activity.actor} ${activity.action} ${activity.target}`);
        }
    }

    async demoProjectAnalysis() {
        console.log('\n📈 Generating project analysis...');
        
        // Get project overview
        const users = await this.db.getProjectUsers(this.projectName);
        const tasks = await this.db.getProjectTasks(this.projectName);
        const dependencies = await this.db.getProjectDependencies(this.projectName);
        const builds = await this.db.getBuildHistory(this.projectName);
        const docs = await this.db.getDocumentation(this.projectName);
        const activities = await this.db.getActivityLogs(this.projectName, null, null, 10);

        console.log(`\n📊 Project Analysis for ${this.projectName}:`);
        console.log(`   👥 Team Members: ${users.length}`);
        console.log(`   📋 Total Tasks: ${tasks.length}`);
        console.log(`   📦 Dependencies: ${dependencies.length}`);
        console.log(`   🔨 Builds: ${builds.length}`);
        console.log(`   📚 Documentation: ${docs.length}`);
        console.log(`   📊 Recent Activities: ${activities.length}`);

        // Task breakdown
        const tasksByStatus = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {});
        
        console.log('\n   📋 Tasks by Status:');
        Object.entries(tasksByStatus).forEach(([status, count]) => {
            console.log(`      ${status}: ${count}`);
        });

        // Dependencies breakdown
        const depsByType = dependencies.reduce((acc, dep) => {
            acc[dep.dependency_type] = (acc[dep.dependency_type] || 0) + 1;
            return acc;
        }, {});
        
        console.log('\n   📦 Dependencies by Type:');
        Object.entries(depsByType).forEach(([type, count]) => {
            console.log(`      ${type}: ${count}`);
        });
    }
}

// Run the demo
const demo = new MCPExtendedDemo();
demo.run().catch(console.error);
