#!/usr/bin/env node

// Diagrama ASCII del flujo de tu código index.js
console.log(`
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                           SISTEMA MCP - FLUJO DEL CÓDIGO                            ║
╚══════════════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                 1. INICIALIZACIÓN                                  │
└─────────────────────────────────────────────────────────────────────────────────────┘

  📥 IMPORTS
  ├── Server (from @modelcontextprotocol/sdk/server)
  ├── StdioServerTransport
  ├── CallToolRequestSchema, ListToolsRequestSchema  
  ├── DatabaseManager (./database.js)
  └── dotenv
       │
       ▼
  ⚙️  dotenv.config()  ← Cargar variables de entorno
       │
       ▼
  🏗️  class MCPContextServer
       │
       ▼
  🔧 constructor() {
       this.db = new DatabaseManager()     ← Pool de conexiones PostgreSQL
       this.server = new Server({          ← Servidor MCP oficial
         name: 'context-storage-server',
         version: '1.0.0'
       })
       this.setupHandlers()                ← Configurar manejadores
     }

┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              2. CONFIGURACIÓN DE HANDLERS                          │
└─────────────────────────────────────────────────────────────────────────────────────┘

  🔌 setupHandlers() {
       
       // MANEJADOR DE LLAMADAS A HERRAMIENTAS
       server.setRequestHandler(CallToolRequestSchema, async (request) => {
         const { name, arguments: args } = request.params
         
         switch (name) {
           case 'store_context'           → handleStoreContext(args)
           case 'get_context'             → handleGetContext(args)  
           case 'store_conversation'      → handleStoreConversation(args)
           case 'get_conversation_history'→ handleGetConversationHistory(args)
           default                        → throw Error("Unknown tool")
         }
       })
       
       // MANEJADOR DE LISTA DE HERRAMIENTAS
       server.setRequestHandler(ListToolsRequestSchema, async () => {
         return {
           tools: [
             📝 store_context     ← Almacenar contexto proyecto
             📖 get_context       ← Recuperar contexto proyecto
             💬 store_conversation ← Almacenar conversación
             📚 get_conversation_history ← Recuperar historial
           ]
         }
       })
     }

┌─────────────────────────────────────────────────────────────────────────────────────┐
│                               3. HANDLERS PRINCIPALES                              │
└─────────────────────────────────────────────────────────────────────────────────────┘

  📝 handleStoreContext(args) {
       try {
         const { projectName, contextType, content, metadata = {} } = args
         const result = await this.db.storeContext(projectName, contextType, content, metadata)
         return { content: [{ type: 'text', text: 'Successfully stored...' }] }
       } catch (error) {
         return { content: [{ type: 'text', text: 'Error: ...' }], isError: true }
       }
     }
       │
       ▼
  🗄️  DatabaseManager.storeContext()
       │
       ▼
  🐘 PostgreSQL: INSERT ... ON CONFLICT DO UPDATE

  📖 handleGetContext(args) {
       try {
         const { projectName, contextType } = args
         const contexts = await this.db.getContext(projectName, contextType)
         if (contexts.length === 0) return "No context found..."
         
         const contextText = contexts.map(ctx => 
           \`Type: \${ctx.context_type}\\nContent: \${ctx.content}\\nUpdated: \${ctx.updated_at}\`
         ).join('\\n\\n---\\n\\n')
         
         return { content: [{ type: 'text', text: contextText }] }
       } catch (error) { ... }
     }

┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                4. INICIO DEL SERVIDOR                              │
└─────────────────────────────────────────────────────────────────────────────────────┘

  🚀 async start() {
       // Probar conexión a base de datos
       const isConnected = await this.db.testConnection()
       if (!isConnected) {
         console.error('Failed to connect to database')
         process.exit(1)
       }
       
       // Iniciar servidor con transporte stdio
       const transport = new StdioServerTransport()
       await this.server.connect(transport)
       
       console.log('MCP Context Server started successfully') ✅
     }

┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              5. EJECUCIÓN PRINCIPAL                                │
└─────────────────────────────────────────────────────────────────────────────────────┘

  🔧 process.on('SIGINT', async () => {
       console.log('Received SIGINT, shutting down gracefully...')
       await server.shutdown()  ← Cerrar conexiones DB
       process.exit(0)
     })

  🎯 const server = new MCPContextServer()
     await server.start()  ← ¡SERVIDOR CORRIENDO!

┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            6. FLUJO DE UNA REQUEST                                 │
└─────────────────────────────────────────────────────────────────────────────────────┘

  Cursor  ──[MCP Request]──▶  StdioServerTransport
     │                           │
     │                           ▼
     │                       Server.setRequestHandler()
     │                           │
     │                           ▼
     │                      ┌─────────────────┐
     │                      │ CallToolRequest │
     │                      │      OR         │
     │                      │ ListToolsRequest│
     │                      └─────────────────┘
     │                           │
     │                           ▼
     │                      switch(request.name)
     │                           │
     │                           ├── store_context ──▶ handleStoreContext()
     │                           ├── get_context ────▶ handleGetContext()
     │                           ├── store_conversation ▶ handleStoreConversation()
     │                           └── get_conversation_history ▶ handleGetConversationHistory()
     │                                     │
     │                                     ▼
     │                              DatabaseManager
     │                                     │
     │                                     ▼
     │                               PostgreSQL
     │                                     │
     │                                     ▼
     │                              [Response Data]
     │                                     │
     │                                     ▼
     │                           { content: [{ type: 'text', text: '...' }] }
     │                                     │
     └◀─────[MCP Response]─────────────────┘

╔══════════════════════════════════════════════════════════════════════════════════════╗
║                              ESTADO ACTUAL: ✅ FUNCIONANDO                          ║
║                                                                                      ║
║  🎯 4 APIs implementadas y probadas                                                 ║
║  🗄️ Base de datos PostgreSQL conectada                                              ║
║  🔌 Protocolo MCP correctamente implementado                                        ║
║  📡 Servidor ejecutándose en modo stdio                                             ║
║  🛠️ Listo para integrar con Cursor                                                  ║
╚══════════════════════════════════════════════════════════════════════════════════════╝
`);
