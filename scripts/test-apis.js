#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import from the correct path
import DatabaseManager from '../mcp-server/src/database.js';

// Set environment variables manually since we're not using dotenv here
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5433';
process.env.DB_NAME = 'mcp_context';
process.env.DB_USER = 'mcp_user';
process.env.DB_PASSWORD = 'mcp_secure_password';

async function testMCPAPIs() {
    console.log('🧪 Testing MCP Database APIs...\n');
    
    const db = new DatabaseManager();
    
    try {
        // Test 1: Database connection
        console.log('📊 Test 1: Database Connection');
        const connected = await db.testConnection();
        if (connected) {
            console.log('✅ Database connection successful\n');
        } else {
            console.log('❌ Database connection failed\n');
            return;
        }

        // Test 2: Store context
        console.log('📊 Test 2: Store Context');
        const projectName = 'test-project';
        const contextType = 'project_structure';
        const content = `
Project: ${projectName}
Structure:
- src/
  - components/
  - utils/
- tests/
- README.md

Technologies: React, Node.js, PostgreSQL
        `;
        const metadata = { 
            tech_stack: ['React', 'Node.js', 'PostgreSQL'],
            created_by: 'test-script',
            complexity: 'medium'
        };

        const storeResult = await db.storeContext(projectName, contextType, content, metadata);
        console.log('✅ Context stored successfully:', storeResult.id);
        console.log('');

        // Test 3: Get context
        console.log('📊 Test 3: Get Context');
        const contexts = await db.getContext(projectName);
        console.log(`✅ Retrieved ${contexts.length} context(s):`);
        contexts.forEach(ctx => {
            console.log(`  - Type: ${ctx.context_type}`);
            console.log(`  - Created: ${ctx.created_at}`);
            console.log(`  - Content length: ${ctx.content.length} characters`);
        });
        console.log('');

        // Test 4: Store conversation
        console.log('📊 Test 4: Store Conversation');
        const conversationId = 'conv-' + Date.now();
        
        // Store user message
        await db.storeConversation(projectName, conversationId, 'user', 
            'How can I improve the performance of this React app?',
            { timestamp: new Date().toISOString() }
        );
        
        // Store assistant message
        await db.storeConversation(projectName, conversationId, 'assistant', 
            'Here are some suggestions to improve React app performance:\n1. Use React.memo for component memoization\n2. Implement code splitting with React.lazy\n3. Optimize bundle size\n4. Use useCallback and useMemo hooks appropriately',
            { 
                timestamp: new Date().toISOString(),
                suggestions_count: 4
            }
        );
        
        console.log('✅ Conversation stored successfully');
        console.log('');

        // Test 5: Get conversation history
        console.log('📊 Test 5: Get Conversation History');
        const history = await db.getConversationHistory(projectName, conversationId);
        console.log(`✅ Retrieved ${history.length} messages:`);
        history.reverse().forEach((msg, index) => {
            console.log(`  ${index + 1}. [${msg.message_type}]: ${msg.content.substring(0, 50)}...`);
        });
        console.log('');

        // Test 6: Store another context type
        console.log('📊 Test 6: Store Different Context Type');
        await db.storeContext(projectName, 'performance_analysis', 
            'Performance bottlenecks identified:\n- Large bundle size: 2.5MB\n- Unnecessary re-renders in UserList component\n- Missing database indexes\n- Unoptimized images',
            { 
                analysis_date: new Date().toISOString(),
                severity: 'medium',
                components_affected: ['UserList', 'ImageGallery']
            }
        );
        console.log('✅ Performance analysis context stored');
        console.log('');

        // Test 7: Get all contexts for project
        console.log('📊 Test 7: Get All Project Contexts');
        const allContexts = await db.getContext(projectName);
        console.log(`✅ Total contexts for ${projectName}: ${allContexts.length}`);
        allContexts.forEach(ctx => {
            console.log(`  - ${ctx.context_type}: ${ctx.content.substring(0, 30)}...`);
        });
        console.log('');

        console.log('🎉 All API tests completed successfully!');
        console.log('');
        console.log('📋 Summary:');
        console.log(`  - Project contexts stored: ${allContexts.length}`);
        console.log(`  - Conversation messages: ${history.length}`);
        console.log(`  - Database operations: All successful`);

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await db.close();
        console.log('\n🔌 Database connection closed');
    }
}

// Run tests
testMCPAPIs().catch(console.error);
