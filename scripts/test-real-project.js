#!/usr/bin/env node

import DatabaseManager from '../mcp-server/src/database.js';

// Set environment variables
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5433';
process.env.DB_NAME = 'mcp_context';
process.env.DB_USER = 'mcp_user';
process.env.DB_PASSWORD = 'mcp_secure_password';

async function testNewProject() {
    console.log('🧪 Testing new project data storage...\n');
    
    const db = new DatabaseManager();
    
    try {
        // Test storing data for a new project
        const projectName = 'my-real-project';
        const contextType = 'code_analysis';
        const content = `
Análisis del proyecto MCP:
- Servidor funcionando correctamente
- Base de datos PostgreSQL conectada
- 4 APIs implementadas y probadas
- Auto-restart configurado
- Configuración MCP limpia sin filesystem
        `;
        const metadata = { 
            language: 'javascript',
            framework: 'mcp',
            status: 'tested',
            timestamp: new Date().toISOString()
        };

        console.log('📝 Storing context for real project...');
        await db.storeContext(projectName, contextType, content, metadata);
        console.log('✅ Context stored successfully\n');

        // Store a conversation
        const conversationId = 'real-conv-' + Date.now();
        console.log('💬 Storing conversation...');
        
        await db.storeConversation(projectName, conversationId, 'user', 
            'He estado probando, verifica si las tablas están guardando datos',
            { source: 'real-user-test' }
        );
        
        await db.storeConversation(projectName, conversationId, 'assistant', 
            'Las tablas están funcionando perfectamente. Se han guardado contextos y conversaciones correctamente.',
            { source: 'verification-test' }
        );
        
        console.log('✅ Conversation stored successfully\n');

        // Get all data for this project
        console.log('📊 Retrieving project data...');
        const contexts = await db.getContext(projectName);
        const conversations = await db.getConversationHistory(projectName);
        
        console.log(`✅ Project "${projectName}" has:`);
        console.log(`  - ${contexts.length} context(s)`);
        console.log(`  - ${conversations.length} conversation message(s)`);
        
        console.log('\n🎉 New project test completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await db.close();
        console.log('\n🔌 Database connection closed');
    }
}

testNewProject().catch(console.error);
