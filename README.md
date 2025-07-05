# MCP Context Server - Complete Project Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue.svg)](https://www.docker.com/)
[![GitHub Stars](https://img.shields.io/github/stars/spatiummeum/MCP-Server-Project-Management-Platform?style=social)](https://github.com/spatiummeum/MCP-Server-Project-Management-Platform)

> **🚀 Transform your development workflow with enterprise-grade project context management!**

A comprehensive **Model Context Protocol (MCP)** server that revolutionizes how AI-powered editors like Cursor maintain persistent memory about development projects. This platform serves as an intelligent bridge between your development environment and a robust PostgreSQL database, enabling seamless storage and retrieval of project context, conversation history, and complete project management data.

## 🎯 **What Makes This Special?**

Unlike basic context storage solutions, this MCP server provides a **complete enterprise project management ecosystem** that grows with your development needs:

- 🧠 **Persistent AI Memory** - Never lose context across coding sessions
- 📊 **Enterprise Project Management** - Complete task, user, and dependency tracking
- 🔒 **Security & Compliance** - Full audit trails and access control
- ⚡ **High Performance** - Optimized PostgreSQL with connection pooling
- 🔧 **Developer-First** - Built by developers, for developers

## 🌟 **Perfect For:**

- **Solo Developers** seeking better project organization
- **Development Teams** requiring collaboration tools
- **Enterprise Projects** needing compliance and auditing
- **AI-Enhanced Workflows** leveraging persistent context
- **Complex Codebases** requiring architectural tracking

## 🚀 Features

> **From basic context storage to enterprise project management - everything you need in one powerful platform.**

### 📊 **Core Context & Conversations**
Transform how AI remembers your project with intelligent, persistent storage:

- **🧠 Persistent Project Context** - Maintain AI awareness across sessions
- **💬 Complete Conversation History** - Never lose important discussions
- **🗂️ Flexible JSONB Metadata** - Extensible data structure for any use case
- **⚡ Real-time Context Retrieval** - Instant access to project knowledge
- **🔍 Smart Search & Filtering** - Find exactly what you need, when you need it

### 🆕 **Extended Project Management**

#### 📝 **File Management & Versioning**
Professional-grade version control and file tracking:

- **📚 Complete Version History** - Track every change with detailed metadata
- **🔐 File Integrity Verification** - SHA-256 checksums for data reliability
- **📊 Detailed File Metadata** - Size, type, language, line count, and authorship
- **🎯 Binary & Generated File Support** - Handle all file types intelligently
- **🕐 Temporal File Analysis** - Understand how your codebase evolves over time

#### 👥 **User & Role Management**
Enterprise-ready team collaboration:

- **🔑 Multi-user System** - Support unlimited team members
- **🎭 Granular Role System** - Admin, Developer, Viewer, Tester roles
- **👤 Per-user Activity Tracking** - Monitor individual contributions
- **🤝 Team Collaboration Features** - Streamlined workflow management
- **🔒 Permission-based Access Control** - Secure, role-based data access

#### 📋 **Task & Issue Management**
Complete project tracking system:

- **🎫 Comprehensive Ticket System** - Features, bugs, enhancements, documentation
- **⚙️ Configurable Workflows** - Customize statuses and priorities
- **📈 Progress Tracking** - Visual progress monitoring
- **👨‍💻 Assignment Management** - Clear responsibility delegation
- **📊 Analytics Dashboard** - Track team productivity and project health

#### 📦 **Dependency Management**
Never lose track of your project's ecosystem:

- **🔗 Universal Package Tracking** - npm, pip, maven, gradle, composer, cargo support
- **📜 License Information** - Compliance and legal tracking
- **🏷️ Version Management** - Production vs development dependencies
- **🔍 Dependency Analysis** - Understand your project's external requirements
- **⚠️ Security Monitoring** - Track potential vulnerabilities

#### 🌍 **Environment Configuration**
Secure, organized configuration management:

- **🏗️ Multi-environment Support** - Dev, staging, production configurations
- **🔐 Sensitive Data Protection** - Encrypted storage for secrets
- **⚙️ Configuration Versioning** - Track changes across environments
- **🔄 Environment Synchronization** - Ensure consistency across stages
- **📋 Configuration Templates** - Standardize environment setups

#### 📊 **Activity Logs & Auditing**
Enterprise-grade audit trails:

- **📝 Complete Activity Logging** - Every action is recorded
- **🌐 IP & User-Agent Tracking** - Security monitoring and compliance
- **📈 Structured Analytics** - Transform logs into insights
- **🔍 Advanced Filtering** - Find specific activities quickly
- **🚨 Security Alerting** - Monitor for suspicious activities

#### 🔨 **Builds & CI/CD**
Comprehensive build and deployment tracking:

- **🏗️ Build History Management** - Track every build across branches
- **✅ Automated Test Results** - Integrate with your testing pipeline
- **📦 Artifact Storage Info** - Keep track of build outputs
- **🚀 Deployment Tracking** - Monitor releases and rollbacks
- **📊 Build Analytics** - Optimize your CI/CD performance

#### 📚 **Documentation System**
Organized, versioned documentation management:

- **📖 Document Type Organization** - API docs, user guides, technical specs
- **🔄 Version Control** - Track documentation evolution
- **🏷️ Tagging & Categorization** - Organize content effectively
- **🔓 Public/Private Documentation** - Control visibility appropriately
- **🔍 Full-text Search** - Find information instantly

#### 🔗 **Component Architecture**
Map and understand your system's structure:

- **🗺️ System Component Mapping** - Visualize your architecture
- **🔗 Relationship Tracking** - Dependencies, implementations, extensions
- **📊 Dependency Analysis** - Understand component interactions
- **🎨 Architecture Visualization** - Generate system diagrams
- **🔍 Impact Analysis** - Understand change implications

## 📊 System Statistics

> **Enterprise-scale capabilities built for modern development teams.**

- **🗄️ 13 Optimized Database Tables** - Engineered for performance and scalability
- **🔧 26 Powerful MCP Tools** - From basic context (4) to advanced management (22)
- **🚀 30+ API Endpoints** - Complete project management functionality
- **⚡ High-Performance Architecture** - Connection pooling, strategic indexing
- **🔒 Enterprise Security** - Role-based access, audit trails, data integrity
- **📈 Scalable Design** - Handle projects from solo to enterprise scale

### 🎯 **By the Numbers:**
- **11 Extended Tables** for comprehensive project management
- **22 New MCP Tools** beyond basic context storage
- **6 Package Managers** supported (npm, pip, maven, gradle, composer, cargo)
- **4 User Roles** with granular permissions
- **4 Environment Types** (dev, staging, production, testing)
- **Multiple Build Types** (CI, manual, release)

## 🛠 Installation & Setup

> **Get up and running in under 5 minutes with our streamlined setup process.**

### 📋 Prerequisites

Ensure you have these installed before starting:

- **[Node.js](https://nodejs.org/)** 22.x or higher
- **[Docker](https://www.docker.com/)** and **Docker Compose**
- **[Git](https://git-scm.com/)** for version control
- **4GB RAM minimum** (8GB recommended for development)
- **2GB free disk space** for Docker containers and data

### ⚡ Quick Start

**🎯 Complete setup in 4 simple steps:**

#### 1. **Clone and Navigate**
```bash
git clone https://github.com/spatiummeum/MCP-Server-Project-Management-Platform.git
cd mcp-context-server
```

#### 2. **Environment Configuration**
```bash
# Copy the example environment file
cp .env.example .env

# Edit with your preferred settings (optional - defaults work great!)
nano .env  # or your preferred editor
```

#### 3. **Start Infrastructure**
```bash
# Launch PostgreSQL, pgAdmin, and Grafana
docker compose -f docker/docker-compose.yml up -d

# Verify services are running
docker compose -f docker/docker-compose.yml ps
```

#### 4. **Install Dependencies & Start**
```bash
# Install Node.js dependencies
cd mcp-server
npm install

# Start the MCP server
npm start
```

**🎉 That's it! Your MCP Context Server is now running and ready to use.**

### 🔧 Configuration Options

#### Environment Variables
Customize your installation with these key variables:

```bash
# Database Configuration
DB_HOST=localhost           # Database host
DB_PORT=5433               # Database port (avoid conflicts with local PostgreSQL)
DB_NAME=mcp_context        # Database name
DB_USER=mcp_user           # Database username
DB_PASSWORD=mcp_secure_password  # Database password (change in production!)

# Optional: Server Configuration
MCP_SERVER_PORT=3001       # MCP server port
NODE_ENV=development       # Environment mode
LOG_LEVEL=info            # Logging level

# Optional: Security (recommended for production)
SESSION_SECRET=your_session_secret_here
JWT_SECRET=your_jwt_secret_here
```

#### 🔒 Production Security Notes:
- **Change default passwords** in production
- **Use strong secrets** for JWT and sessions
- **Enable SSL/TLS** for database connections
- **Restrict database access** to application only

### 🚀 Verification & Testing

#### Quick Health Check:
```bash
# Check all services are healthy
docker compose -f docker/docker-compose.yml ps

# Test database connectivity
cd mcp-server && npm run test-db  # (if available)

# Run demo to verify functionality
node scripts/demo-extended-functionality.js
```

#### Access Admin Interfaces:
- **🗄️ pgAdmin**: http://localhost:5050 (admin@admin.com / admin)
- **📊 Grafana**: http://localhost:3000 (admin / admin)
- **⚡ MCP Server**: Running on port 3001

### 🐛 Troubleshooting

#### Common Issues:

**Port Conflicts:**
```bash
# Check what's using port 5433
lsof -i :5433

# Or change port in docker-compose.yml
```

**Docker Issues:**
```bash
# Reset Docker environment
docker compose -f docker/docker-compose.yml down -v
docker compose -f docker/docker-compose.yml up -d
```

**Permission Issues:**
```bash
# Fix Docker permissions (Linux/macOS)
sudo chown -R $USER:$USER .
```

**Database Connection:**
```bash
# Verify database is accessible
docker exec -it mcp-postgres psql -U mcp_user -d mcp_context
```

### 📚 Next Steps

1. **📖 Read the [Extended API Documentation](./EXTENDED-API-DOCS.md)**
2. **🧪 Run the comprehensive demo**: `node scripts/demo-extended-functionality.js`
3. **🔧 Configure your editor** to use the MCP server
4. **👥 Set up your first project** and start tracking context!

## 🎯 Usage Examples

> **From basic context storage to enterprise project management - see how powerful the platform can be.**

### 🚀 **Getting Started - Basic Context**

#### Store and Retrieve Project Context
```javascript
// Store architectural decisions
await storeContext('my-ecommerce-app', 'architecture', 
  'Microservices with React frontend, Node.js APIs, PostgreSQL database'
);

// Store development notes
await storeContext('my-ecommerce-app', 'dev-notes', 
  'Using TypeScript for type safety, Jest for testing, Docker for deployment'
);

// Retrieve context when resuming work
const architecture = await getContext('my-ecommerce-app', 'architecture');
const devNotes = await getContext('my-ecommerce-app', 'dev-notes');

console.log('Project Architecture:', architecture.content);
```

### 📊 **Enterprise Project Management**

#### Complete Project Overview
```javascript
// Get comprehensive project status
const projectOverview = {
  // Team information
  team: await getProjectUsers('my-ecommerce-app'),
  
  // Current tasks and issues
  openTasks: await getProjectTasks('my-ecommerce-app', 'open'),
  inProgressTasks: await getProjectTasks('my-ecommerce-app', 'in_progress'),
  
  // Technology stack
  dependencies: await getProjectDependencies('my-ecommerce-app'),
  
  // Build and deployment info
  recentBuilds: await getBuildHistory('my-ecommerce-app', null, 10),
  
  // Documentation
  docs: await getDocumentation('my-ecommerce-app'),
  
  // Recent activity
  recentActivity: await getActivityLogs('my-ecommerce-app', null, null, 20)
};

// Generate project dashboard
console.log(`
📊 Project: ${projectOverview.name}
👥 Team: ${projectOverview.team.length} members
📋 Tasks: ${projectOverview.openTasks.length} open, ${projectOverview.inProgressTasks.length} in progress
📦 Dependencies: ${projectOverview.dependencies.length} packages
🔨 Builds: ${projectOverview.recentBuilds.filter(b => b.status === 'success').length} successful
`);
```

### 🔒 **Security & Compliance**

#### Activity Monitoring and Auditing
```javascript
// Track sensitive operations
await logActivity('my-ecommerce-app', 'security_access', 'john.doe', 
  'payment-processor.js', 'modified payment logic');

await logActivity('my-ecommerce-app', 'deployment', 'admin', 
  'production', 'deployed v2.1.0 to production');

// Generate security audit report
const securityLogs = await getActivityLogs('my-ecommerce-app', 'security_access');
const deploymentLogs = await getActivityLogs('my-ecommerce-app', 'deployment');

// Create compliance report
const auditReport = {
  period: 'Last 30 days',
  securityEvents: securityLogs.length,
  deployments: deploymentLogs.length,
  criticalChanges: securityLogs.filter(log => 
    log.details.includes('payment') || log.details.includes('auth')
  )
};
```

### 🚀 **Release Management**

#### Comprehensive Release Preparation
```javascript
// Prepare release v2.1.0
const releaseVersion = 'v2.1.0';

// Store build information
await storeBuild('my-ecommerce-app', releaseVersion, 'release', 'success', {
  branch: 'main',
  commit: 'abc123def456',
  testResults: 'All 157 tests passed',
  buildTime: '4m 32s'
});

// Gather release information
const releaseInfo = {
  version: releaseVersion,
  
  // Dependencies for deployment
  dependencies: await getProjectDependencies('my-ecommerce-app'),
  
  // Test coverage and build history
  buildHistory: await getBuildHistory('my-ecommerce-app', 'success', 5),
  
  // Documentation for release notes
  documentation: await getDocumentation('my-ecommerce-app', null, true),
  
  // Team contributions
  contributors: await getProjectUsers('my-ecommerce-app'),
  
  // Recent changes
  recentTasks: await getProjectTasks('my-ecommerce-app', 'closed', null, 20)
};

// Generate release checklist
console.log(`
🚀 Release ${releaseVersion} Ready!
✅ ${releaseInfo.buildHistory.length} successful builds
✅ ${releaseInfo.dependencies.filter(d => d.type === 'production').length} production dependencies verified
✅ ${releaseInfo.documentation.length} documentation items updated
✅ ${releaseInfo.recentTasks.length} tasks completed
👥 ${releaseInfo.contributors.length} contributors
`);
```

### 📈 **Analytics & Insights**

#### Development Metrics Dashboard
```javascript
// Analyze team productivity
const productivityMetrics = {
  // Task completion rates
  tasksCompleted: await getProjectTasks('my-ecommerce-app', 'closed'),
  tasksInProgress: await getProjectTasks('my-ecommerce-app', 'in_progress'),
  
  // Build success rates
  builds: await getBuildHistory('my-ecommerce-app'),
  
  // Team activity
  teamActivity: await getActivityLogs('my-ecommerce-app'),
  
  // Documentation coverage
  documentation: await getDocumentation('my-ecommerce-app')
};

// Calculate metrics
const metrics = {
  taskCompletionRate: productivityMetrics.tasksCompleted.length / 
    (productivityMetrics.tasksCompleted.length + productivityMetrics.tasksInProgress.length),
  
  buildSuccessRate: productivityMetrics.builds.filter(b => b.status === 'success').length / 
    productivityMetrics.builds.length,
  
  dailyActivity: productivityMetrics.teamActivity.length / 30, // Last 30 days
  
  docCoverage: productivityMetrics.documentation.length
};

console.log('📊 Development Metrics:', metrics);
```

### 🔍 **Advanced Use Cases**

#### Dependency Security Analysis
```javascript
// Analyze project dependencies for security
const dependencyAnalysis = {
  allDeps: await getProjectDependencies('my-ecommerce-app'),
  components: await getProjectComponents('my-ecommerce-app'),
  relationships: await getComponentRelationships('my-ecommerce-app')
};

// Identify potential security concerns
const securityAnalysis = {
  outdatedPackages: dependencyAnalysis.allDeps.filter(dep => 
    dep.version.includes('beta') || dep.version.includes('alpha')
  ),
  
  criticalComponents: dependencyAnalysis.components.filter(comp => 
    comp.type === 'service' && comp.name.includes('auth')
  ),
  
  externalDependencies: dependencyAnalysis.relationships.filter(rel => 
    rel.relationship_type === 'depends_on'
  )
};
```

### 🎯 **Integration Examples**

#### CI/CD Pipeline Integration
```javascript
// Webhook from CI/CD system
async function handleBuildComplete(buildData) {
  // Store build results
  await storeBuild(
    buildData.project,
    buildData.version,
    buildData.type,
    buildData.status,
    {
      duration: buildData.duration,
      testResults: buildData.tests,
      coverage: buildData.coverage
    }
  );
  
  // Log deployment activity
  if (buildData.deployed) {
    await logActivity(
      buildData.project,
      'deployment',
      buildData.deployer,
      buildData.environment,
      `Deployed ${buildData.version} to ${buildData.environment}`
    );
  }
}
```

> **💡 Pro Tip:** Combine multiple APIs to create powerful automation workflows that keep your project data always current and actionable!

## 🧪 Testing & Demo

> **Explore the full capabilities with our comprehensive demo and testing suite.**

### 🎬 **Interactive Demo**

Experience a complete e-commerce project simulation:

```bash
node scripts/demo-extended-functionality.js
```

**🎯 What the demo showcases:**

- **👥 Team Setup** - 4 team members with different roles (admin, developers, tester)
- **📋 Project Tasks** - 4 realistic tasks including features and bug fixes
- **📦 Dependency Stack** - 11 production and development dependencies
- **📚 File History** - Version control simulation with realistic changes
- **🔨 Build Pipeline** - Multiple builds with success/failure scenarios
- **📖 Documentation** - API documentation and user guides
- **📊 Activity Tracking** - Complete audit trail of all activities

**📈 Demo Output Example:**
```
🎬 MCP Context Server - Extended Functionality Demo
==================================================

✅ Project Setup Complete: 'ecommerce-platform'
👥 Team Members: 4 users added with roles
📋 Tasks Created: 4 tasks (2 features, 1 bug, 1 enhancement)
📦 Dependencies: 11 packages tracked
📁 File History: 3 file versions stored
🔨 Builds: 3 builds recorded (2 success, 1 failure)
📚 Documentation: 2 documents created
📊 Activity Logs: 15+ activities recorded

🎯 Demo completed successfully! Check the database for all generated data.
```

### 🔧 **Comprehensive Testing**

Run the full test suite to verify all functionality:

```bash
node scripts/test-extended-apis.js
```

**🧪 Test Coverage:**

- **✅ Context Storage & Retrieval** - Basic MCP functionality
- **✅ User Management** - Role-based access and permissions
- **✅ Task Management** - CRUD operations and status updates
- **✅ Dependency Tracking** - Package manager integrations
- **✅ Environment Configuration** - Secure config management
- **✅ Activity Logging** - Audit trail verification
- **✅ Build Management** - CI/CD integration testing
- **✅ Documentation System** - Version control and categorization
- **✅ Component Architecture** - Relationship mapping
- **✅ File Metadata** - Integrity and versioning

**📊 Test Results Example:**
```
🧪 MCP Context Server - Extended API Test Suite
===============================================

✅ Context APIs: 4/4 tests passed
✅ User Management: 6/6 tests passed
✅ Task Management: 8/8 tests passed
✅ Dependency Management: 5/5 tests passed
✅ Environment Config: 4/4 tests passed
✅ Activity Logging: 7/7 tests passed
✅ Build Management: 6/6 tests passed
✅ Documentation: 5/5 tests passed
✅ Component Architecture: 8/8 tests passed
✅ File Metadata: 4/4 tests passed

🎉 All 57 tests passed! Your MCP server is ready for production.
```

### 🔍 **Manual Testing Guide**

#### 1. **Database Verification**
```bash
# Connect to PostgreSQL
docker exec -it mcp-postgres psql -U mcp_user -d mcp_context

# Check tables
\dt

# Verify data
SELECT COUNT(*) FROM project_contexts;
SELECT COUNT(*) FROM project_users;
```

#### 2. **API Endpoint Testing**
```bash
# Test server health (if health endpoint exists)
curl http://localhost:3001/health

# Check MCP server logs
docker logs mcp-server  # (if containerized)
```

#### 3. **Performance Testing**
```bash
# Run performance benchmarks (if available)
node scripts/performance-test.js

# Monitor resource usage
docker stats
```

### 🚀 **Development Testing**

#### Running Tests During Development:
```bash
# Install development dependencies
npm install --dev

# Run unit tests (if available)
npm test

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:coverage
```

#### 🔧 **Custom Test Scenarios**

Create your own test scenarios by modifying the demo script:

```javascript
// Custom test example
const customTest = async () => {
  // 1. Create test project
  await storeContext('test-project', 'description', 'Custom test project');
  
  // 2. Add test data
  await storeProjectUser('test-project', 'test-user', 'developer', 'Test User');
  
  // 3. Verify data
  const users = await getProjectUsers('test-project');
  console.log('Test Users:', users);
  
  // 4. Cleanup
  // Add cleanup logic here
};

customTest().catch(console.error);
```

### 📊 **Monitoring Test Results**

#### Using Grafana for Test Monitoring:
1. **Access Grafana**: http://localhost:3000
2. **Login**: admin/admin
3. **Import Dashboard** for MCP metrics
4. **Monitor**: Query performance, connection pools, error rates

#### Database Performance Monitoring:
```sql
-- Check query performance
SELECT query, mean_time, calls FROM pg_stat_statements 
ORDER BY mean_time DESC LIMIT 10;

-- Monitor connection usage
SELECT count(*) as connections, state FROM pg_stat_activity 
GROUP BY state;
```

### 🐛 **Troubleshooting Tests**

#### Common Test Issues:

**Database Connection Errors:**
```bash
# Reset database
docker compose -f docker/docker-compose.yml down -v
docker compose -f docker/docker-compose.yml up -d
```

**Port Conflicts:**
```bash
# Check port usage
netstat -tlnp | grep :5433
```

**Permission Issues:**
```bash
# Fix file permissions
chmod +x scripts/*.js
```

### 🎯 **Next Steps After Testing**

1. **📖 Review test results** and understand the data structure
2. **🔧 Configure your editor** to connect to the MCP server
3. **👥 Set up your team** with appropriate roles
4. **📋 Start tracking** your first real project
5. **📊 Monitor usage** through Grafana dashboards

> **💡 Pro Tip:** Run the demo and tests regularly during development to ensure your customizations don't break existing functionality!

## 🏗 Architecture

### System Overview
```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            MCP Context Server Platform                              │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────────┐    ┌──────────────────────┐    ┌─────────────────────────────┐ │
│  │     Cursor      │    │     MCP Server       │    │      PostgreSQL 16          │ │
│  │   (Editor)      │◄──►│    (Node.js)         │◄──►│      (Docker)               │ │
│  │                 │    │                      │    │                             │ │
│  │ ▸ Context Req   │    │ ▸ 26 MCP Tools       │    │ ▸ 13 Optimized Tables       │ │
│  │ ▸ Conversations │    │ ▸ Connection Pool    │    │ ▸ JSONB Metadata Fields     │ │
│  │ ▸ Real-time     │    │ ▸ Error Handling     │    │ ▸ ACID Transactions         │ │
│  └─────────────────┘    └──────────────────────┘    └─────────────────────────────┘ │
│                                   │                                                 │
│                          ┌────────▼────────┐                                        │
│                          │  Admin Tools    │                                        │
│                          │                 │                                        │
│                          │ ▸ pgAdmin :5050 │                                        │
│                          │ ▸ Grafana :3000 │                                        │
│                          └─────────────────┘                                        │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture
```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              Data Management Layers                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌────────────────────────────────────────────────────────────────────────────────┐ │
│  │                            Application Layer                                   │ │
│  ├─────────────────┬─────────────────┬─────────────────┬──────────────────────────┤ │
│  │   Context API   │   Project API   │   Security API  │     Analytics API        │ │
│  │                 │                 │                 │                          │ │
│  │ ▸ store_context │ ▸ store_task    │ ▸ log_activity  │ ▸ get_build_history      │ │
│  │ ▸ get_context   │ ▸ store_user    │ ▸ store_env     │ ▸ get_dependencies       │ │
│  │ ▸ conversations │ ▸ dependencies  │ ▸ permissions   │ ▸ component_analysis     │ │
│  └─────────────────┴─────────────────┴─────────────────┴──────────────────────────┘ │
│                                          │                                          │
│  ┌───────────────────────────────────────▼──────────────────────────────────────┐   │
│  │                         Database Schema Layer                                │   │
│  ├──────────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                              │   │
│  │  Core Tables (2)        │  Project Management (11)                           │   │
│  │  ┌─────────────────┐    │  ┌─────────────────┬─────────────────────────────┐ │   │
│  │  │ project_contexts│    │  │ file_history    │ project_dependencies        │ │   │
│  │  │ conversation_   │    │  │ project_users   │ project_environments        │ │   │
│  │  │ history         │    │  │ project_tasks   │ project_activity_logs       │ │   │
│  │  └─────────────────┘    │  │ project_builds  │ project_documentation       │ │   │
│  │                         │  │ project_        │ component_relationships     │ │   │
│  │                         │  │ components      │ file_metadata               │ │   │
│  │                         │  └─────────────────┴─────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                          │                                          │
│  ┌───────────────────────────────────────▼──────────────────────────────────────┐   │
│  │                      Infrastructure Layer                                    │   │
│  ├──────────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                              │   │
│  │  Docker Compose Environment                                                  │   │
│  │  ┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐   │   │
│  │  │   PostgreSQL    │    pgAdmin      │    Grafana      │   MCP Server    │   │   │
│  │  │   Port: 5433    │   Port: 5050    │   Port: 3000    │   Port: 3001    │   │   │
│  │  │   Volume: DB    │   Volume: Admin │   Volume: Dash  │   Local Dev     │   │   │
│  │  └─────────────────┴─────────────────┴─────────────────┴─────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Feature Integration Map
```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                         MCP Context Server Feature Matrix                            │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  Development Workflow              │  Project Management                             │
│  ┌───────────────────────────────┐ │ ┌────────────────────────────────────────────┐  │
│  │ ▸ File History & Versioning   │ │ │ ▸ Task & Issue Tracking                    │  │
│  │ ▸ Context Persistence         │ │ │ ▸ Team & Role Management                   │  │
│  │ ▸ Conversation Memory         │ │ │ ▸ Dependency Management                    │  │
│  │ ▸ Component Relationships     │ │ │ ▸ Build & CI/CD Integration                │  │
│  └───────────────────────────────┘ │ └────────────────────────────────────────────┘  │
│                                    │                                                 │
│  Security & Compliance             │  Analytics & Monitoring                         │
│  ┌───────────────────────────────┐ │ ┌────────────────────────────────────────────┐  │
│  │ ▸ Activity Auditing           │ │ │ ▸ Performance Metrics                      │  │
│  │ ▸ Environment Protection      │ │ │ ▸ Usage Analytics                          │  │
│  │ ▸ Access Control              │ │ │ ▸ Project Insights                         │  │
│  │ ▸ Data Integrity              │ │ │ ▸ Real-time Dashboards                     │  │
│  └───────────────────────────────┘ │ └────────────────────────────────────────────┘  │
│                                    │                                                 │
│                ┌─────────────────────────────┐                                       │
│                │      Documentation Hub      │                                       │
│                │  ▸ API Reference (26 tools) │                                       │
│                │  ▸ Architecture Diagrams    │                                       │
│                │  ▸ Integration Guides       │                                       │
│                │  ▸ Demo & Test Scripts      │                                       │
│                └─────────────────────────────┘                                       │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

## 📚 API Reference

### Core APIs (4)
- `store_context` - Store project context
- `get_context` - Retrieve project context
- `store_conversation` - Store conversation history
- `get_conversation_history` - Retrieve conversation history

### Extended APIs (22)
See [EXTENDED-API-DOCS.md](./EXTENDED-API-DOCS.md) for complete documentation.

#### File Management
- `store_file_history`, `get_file_history`
- `store_file_metadata`, `get_file_metadata`

#### User Management
- `store_project_user`, `get_project_users`

#### Task Management
- `store_project_task`, `get_project_tasks`

#### Dependency Management
- `store_project_dependency`, `get_project_dependencies`

#### Environment Configuration
- `store_environment_config`, `get_environment_configs`

#### Activity Logging
- `log_activity`, `get_activity_logs`

#### Build Management
- `store_build`, `update_build_status`, `get_build_history`

#### Documentation
- `store_documentation`, `get_documentation`

#### Component Architecture
- `store_project_component`, `store_component_relationship`
- `get_project_components`, `get_component_relationships`

## 🔒 Security Features

- **Sensitive Configuration Protection** - Marked and protected sensitive fields
- **Complete Activity Auditing** - Log all project activities
- **IP and User-Agent Tracking** - Security monitoring
- **Data Integrity Checksums** - File verification
- **Role-based Access Control** - Granular permissions

## 📈 Performance & Scalability

- **Connection Pooling** - Optimized PostgreSQL connections
- **Strategic Indexing** - Fast query performance
- **JSONB Metadata** - Flexible schema extension
- **Structured Logging** - Advanced analytics support
- **Optimized Queries** - Efficient data retrieval

## 🛡 Monitoring & Administration

The stack includes:

- **pgAdmin** (http://localhost:5050) - Database administration
  - Username: `admin@admin.com`
  - Password: `admin`

- **Grafana** (http://localhost:3000) - Monitoring dashboards
  - Username: `admin`
  - Password: `admin`

## 🤝 Contributing

**Contributions are welcomed and greatly appreciated!** 🎉

We believe in the power of community collaboration to make this project even better. Whether you're a seasoned developer or just starting out, there are many ways to contribute to the MCP Context Server project.

### 🌟 Ways to Contribute

- **🐛 Bug Reports** - Found a bug? Let us know!
- **💡 Feature Requests** - Have an idea for improvement? Share it!
- **📝 Documentation** - Help improve our docs and examples
- **🔧 Code Contributions** - Fix bugs, add features, or optimize performance
- **🧪 Testing** - Help us test new features and report issues
- **🎨 UI/UX** - Improve user experience and interfaces
- **📊 Analytics** - Add new monitoring and analytics capabilities

### 🚀 Getting Started

1. **Fork the repository**
   ```bash
   git fork https://github.com/your-username/mcp-context-server
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/mcp-context-server.git
   cd mcp-context-server
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/bug-description
   # or 
   git checkout -b docs/improvement-description
   ```

4. **Set up development environment**
   ```bash
   cp .env.example .env
   docker compose -f docker/docker-compose.yml up -d
   cd mcp-server && npm install
   ```

5. **Make your changes**
   - Write clean, well-documented code
   - Follow existing code style and conventions
   - Add tests for new functionality
   - Update documentation as needed

6. **Test your changes**
   ```bash
   npm test
   node scripts/test-extended-apis.js
   node scripts/demo-extended-functionality.js
   ```

7. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   # Use conventional commits: feat:, fix:, docs:, style:, refactor:, test:, chore:
   ```

8. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

9. **Open a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Include screenshots if applicable
   - Ensure all tests pass

### 📋 Contribution Guidelines

- **Code Quality** - Write clean, readable, and well-documented code
- **Testing** - Include tests for new features and bug fixes
- **Documentation** - Update docs to reflect your changes
- **Commit Messages** - Use conventional commit format
- **Pull Requests** - Keep PRs focused and include clear descriptions
- **Issues** - Use issue templates and provide detailed information

### 🎯 Priority Areas

We're especially looking for contributions in these areas:

- **🔌 MCP Tool Integrations** - New tools for different development workflows
- **📊 Analytics Dashboard** - Enhanced Grafana dashboards and metrics
- **🔒 Security Features** - Advanced security and compliance tools
- **⚡ Performance Optimization** - Database queries and connection pooling
- **📱 Mobile Support** - Mobile-friendly interfaces and APIs
- **🌐 Internationalization** - Multi-language support
- **🔗 Integrations** - GitHub, GitLab, Jira, Slack, etc.

### 💬 Community & Support

- **GitHub Discussions** - Ask questions and share ideas
- **Issues** - Report bugs and request features
- **Pull Requests** - Submit your contributions
- **Code Reviews** - Help review and improve contributions

### 🏆 Recognition

Contributors will be:
- Added to our Contributors section
- Mentioned in release notes
- Invited to join our maintainer team (for significant contributions)

**Thank you for making the MCP Context Server better for everyone!** 🙏

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support and questions:

1. Check the [documentation](./EXTENDED-API-DOCS.md)
2. Run the demo script to verify functionality
3. Check server logs for debugging
4. Verify database configuration

## 🗂 Project Structure

```
mcp-context-server/
├── docker/                     # Docker configuration
│   ├── docker-compose.yml     # Infrastructure setup
│   └── postgres/
│       └── init.sql           # Database schema
├── mcp-server/                # MCP server implementation
│   ├── src/
│   │   ├── index.js          # Main server file
│   │   └── database.js       # Database operations
│   └── package.json          # Node.js dependencies
├── scripts/                   # Utility scripts
│   ├── demo-extended-functionality.js
│   └── test-extended-apis.js
├── EXTENDED-API-DOCS.md       # Complete API documentation
├── README.md                  # This file
└── .gitignore                # Git ignore patterns
```

---

**Transform your development workflow with comprehensive project context management!** 🚀
