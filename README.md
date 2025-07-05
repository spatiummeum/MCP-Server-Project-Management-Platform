# MCP Context Server - Complete Project Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue.svg)](https://www.docker.com/)

A comprehensive **Model Context Protocol (MCP)** server that enables editors like Cursor to maintain persistent memory about development projects. It functions as a bridge between your editor and a PostgreSQL database to store project context, conversation history, and complete project management data.

## 🚀 Features

### 📊 **Core Context & Conversations**
- Persistent project context storage
- Complete AI conversation history
- Flexible metadata with JSONB fields
- Real-time context retrieval

### 🆕 **Extended Project Management**

#### 📝 **File Management & Versioning**
- Complete file version history with change tracking
- File integrity verification with checksums
- Detailed metadata (size, type, author, etc.)
- Binary and generated file tracking

#### 👥 **User & Role Management**
- Multi-user system with roles (admin, developer, viewer, tester)
- Granular permissions per user
- Activity tracking per user
- Team collaboration features

#### 📋 **Task & Issue Management**
- Complete ticket and task system
- Configurable statuses and priorities
- Assignment and progress tracking
- Support for: features, bugs, enhancements, documentation

#### 📦 **Dependency Management**
- Track all project dependencies
- Multiple package manager support (npm, pip, maven, etc.)
- License and version information
- Production vs development dependencies

#### 🌍 **Environment Configuration**
- Environment variables per stage
- Protected sensitive configurations
- Secrets and configuration management
- Multi-environment support (dev, staging, prod)

#### 📊 **Activity Logs & Auditing**
- Complete project activity logging
- IP and User-Agent tracking
- Structured logs for analysis
- Security auditing capabilities

#### 🔨 **Builds & CI/CD**
- Build and deployment tracking
- Automated test results
- Build history per branch
- Artifact information storage

#### 📚 **Documentation System**
- Organized documentation by types
- Document versioning
- Tags and categorization
- Internal and external documentation

#### 🔗 **Component Architecture**
- System component mapping
- Module relationships tracking
- Internal dependency analysis
- Architecture visualization

## 📊 System Statistics

- **11 new database tables** with optimized schemas
- **26 MCP tools** (4 original + 22 extended)
- **30+ API endpoints** for complete project management
- **Enterprise-grade** project management system

## 🛠 Installation & Setup

### Prerequisites

- **Node.js** 22.x or higher
- **Docker** and **Docker Compose**
- **Git**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mcp-context-server
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the infrastructure**
   ```bash
   docker compose -f docker/docker-compose.yml up -d
   ```

4. **Install dependencies**
   ```bash
   cd mcp-server
   npm install
   ```

5. **Start the MCP server**
   ```bash
   npm start
   ```

### Environment Variables

```bash
DB_HOST=localhost
DB_PORT=5433
DB_NAME=mcp_context
DB_USER=mcp_user
DB_PASSWORD=mcp_secure_password
```

## 🎯 Usage Examples

### Basic Context Storage
```javascript
// Store project context
await storeContext('my-project', 'architecture', 'Microservices with React frontend');

// Retrieve context
const context = await getContext('my-project', 'architecture');
```

### Complete Project Analysis
```javascript
// Get full project overview
const projectOverview = {
  team: await getProjectUsers('my-project'),
  tasks: await getProjectTasks('my-project'),
  dependencies: await getProjectDependencies('my-project'),
  builds: await getBuildHistory('my-project'),
  docs: await getDocumentation('my-project'),
  activity: await getActivityLogs('my-project')
};
```

### Security Auditing
```javascript
// Track critical activities
await logActivity('my-project', 'security_access', 'user', 'sensitive-file', 'accessed');
const securityLogs = await getActivityLogs('my-project', 'security_access');
```

### Release Management
```javascript
// Prepare release information
await storeBuild('my-project', 'v2.1.0', 'release', 'success');
const releaseInfo = {
  dependencies: await getProjectDependencies('my-project'),
  tests: await getBuildHistory('my-project', 'success'),
  docs: await getDocumentation('my-project', null, true)
};
```

## 🧪 Testing & Demo

### Run the Demo
```bash
node scripts/demo-extended-functionality.js
```

This demonstrates a complete e-commerce project with:
- 4 team members with different roles
- 4 tasks (features and bugs)
- 11 dependencies (production and development)
- File history with version control
- Build tracking with test results
- API and user documentation
- Complete activity logs

### Run Tests
```bash
node scripts/test-extended-apis.js
```

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
