# MCP Context Server - Extended API Documentation

## Overview

The MCP Context Server has been extended with multiple functionalities to provide a complete project context management system. In addition to basic context and conversation storage, it now includes:

## 🆕 New Features

### 1. **File History and Versioning** 📝
Stores and tracks changes in project files with complete version control.

**Available Tools:**
- `store_file_history` - Store file version with changes
- `get_file_history` - Get file version history

**Use Cases:**
- Source code change tracking
- Modification auditing
- Recovery of previous versions
- Code evolution analysis

### 2. **User and Role Management** 👥
Manages project users with specific roles and permissions.

**Available Tools:**
- `store_project_user` - Add/update project user
- `get_project_users` - Get users and their roles

**Available Roles:**
- `admin` - Full administrator
- `developer` - Developer with write permissions
- `viewer` - Read-only access
- `tester` - Testing-focused

### 3. **Task and Issue Management** 📋
Complete ticket, task, and issue tracking system.

**Available Tools:**
- `store_project_task` - Create/update tasks
- `get_project_tasks` - Get tasks with filters

**Task Types:**
- `feature` - New functionality
- `bug` - Error or failure
- `enhancement` - Improvement
- `documentation` - Documentation

**States:**
- `open` - Open
- `in_progress` - In progress
- `testing` - Testing
- `closed` - Closed

### 4. **Dependency Management** 📦
Tracks all project dependencies and packages.

**Available Tools:**
- `store_project_dependency` - Store dependency
- `get_project_dependencies` - Get dependencies

**Supported Package Managers:**
- `npm` - Node.js
- `pip` - Python
- `maven` - Java
- `gradle` - Java/Android
- `composer` - PHP
- `cargo` - Rust

### 5. **Environment Configuration** 🌍
Manages environment variables and configurations per environment.

**Available Tools:**
- `store_environment_config` - Store configuration
- `get_environment_configs` - Get configurations

**Typical Environments:**
- `development` - Development
- `staging` - Staging/Testing
- `production` - Production
- `testing` - Test environment

### 6. **Activity Logs and Auditing** 📊
Complete project activity logging for auditing purposes.

**Available Tools:**
- `log_activity` - Log activity
- `get_activity_logs` - Get activity logs

**Activity Types:**
- `file_changed` - File modified
- `task_created` - Task created
- `user_login` - User logged in
- `build_started` - Build started
- `deployment` - Deployment

### 7. **Build and Test Management** 🔨
Tracks builds, test results, and deployments.

**Available Tools:**
- `store_build` - Store build information
- `update_build_status` - Update build status
- `get_build_history` - Get build history

**Build Types:**
- `ci` - Continuous integration
- `manual` - Manual build
- `release` - Release build

**States:**
- `success` - Successful
- `failure` - Failed
- `in_progress` - In progress
- `cancelled` - Cancelled

### 8. **Documentation and Resources** 📚
Manages project documentation organized by types.

**Available Tools:**
- `store_documentation` - Store documentation
- `get_documentation` - Get documentation

**Documentation Types:**
- `api` - API documentation
- `user_guide` - User guide
- `technical` - Technical documentation
- `changelog` - Change log

### 9. **Component Relationships** 🔗
Maps relationships and dependencies between project modules.

**Available Tools:**
- `store_project_component` - Store component
- `store_component_relationship` - Store relationship
- `get_project_components` - Get components
- `get_component_relationships` - Get relationships

**Component Types:**
- `module` - Module
- `service` - Service
- `library` - Library
- `class` - Class
- `function` - Function

**Relationship Types:**
- `depends_on` - Depends on
- `implements` - Implements
- `extends` - Extends
- `calls` - Calls

### 10. **File Metadata** 🗂️
Detailed information about project files.

**Available Tools:**
- `store_file_metadata` - Store metadata
- `get_file_metadata` - Get metadata

**Included Information:**
- File size
- Type and extension
- Programming language
- Line count
- Checksum for integrity
- Last modification author

## 📊 Database

### New Tables Created

1. **file_history** - File version history
2. **project_users** - Project users and roles
3. **project_tasks** - Tasks and issues
4. **project_dependencies** - Dependencies and packages
5. **project_environments** - Environment configurations
6. **project_activity_logs** - Activity logs
7. **project_builds** - Build information
8. **project_documentation** - Documentation
9. **project_components** - Project components
10. **component_relationships** - Component relationships
11. **file_metadata** - File metadata

### Optimized Indexes

Each table includes optimized indexes for frequent queries:
- Project searches
- Type/status filters
- Date sorting
- Entity relationships

## 🚀 Advanced Use Cases

### Complete Project Analysis
```javascript
// Get all information for a project
const projectData = {
  context: await getContext(projectName),
  users: await getProjectUsers(projectName),
  tasks: await getProjectTasks(projectName),
  dependencies: await getProjectDependencies(projectName),
  components: await getProjectComponents(projectName),
  documentation: await getDocumentation(projectName),
  recentActivity: await getActivityLogs(projectName, null, null, 50)
};
```

### Security Auditing
```javascript
// Track all sensitive activities
await logActivity(projectName, 'security_access', user, 'sensitive_file', 'accessed');
const securityLogs = await getActivityLogs(projectName, 'security_access');
```

### Release Management
```javascript
// Prepare release information
const releaseInfo = {
  build: await storeBuild(projectName, 'v1.2.0', 'release', 'success'),
  dependencies: await getProjectDependencies(projectName),
  tests: await getBuildHistory(projectName, 'success'),
  docs: await getDocumentation(projectName, null, true) // Only published
};
```

### Dependency Analysis
```javascript
// Complete dependency analysis
const analysis = {
  npmPackages: await getProjectDependencies(projectName, 'npm'),
  components: await getProjectComponents(projectName),
  relationships: await getComponentRelationships(projectName)
};
```

## 🔧 Configuration

### Required Environment Variables
```bash
DB_HOST=localhost
DB_PORT=5433
DB_NAME=mcp_context
DB_USER=mcp_user
DB_PASSWORD=mcp_secure_password
```

### Database Schema
The schema is initialized automatically with Docker Compose. All tables include:
- Automatic timestamps (created_at, updated_at)
- JSONB metadata fields for extensibility
- Optimized indexes for performance
- Triggers for automatic timestamp updates

## 📈 Performance

### Implemented Optimizations
- **Connection Pooling**: Configured PostgreSQL connection pool
- **Strategic Indexes**: Indexes on frequently searched fields
- **JSONB Fields**: For flexible metadata and efficient queries
- **Pagination**: Default limits on large queries
- **Checksums**: File integrity verification

### Recommended Metrics
- Monitor connection pool usage
- Track query response times
- Alerts on data integrity failures
- Storage usage per project

## 🛡️ Security

### Security Features
- **Sensitive Configurations**: Marking of sensitive fields
- **Complete Auditing**: Log of all activities
- **Access Control**: Roles and permissions per user
- **Data Integrity**: Checksums and validations
- **IP Tracking**: IP address logging in activities

### Best Practices
1. Mark sensitive configurations as `isSensitive: true`
2. Log all critical activities
3. Verify checksums on important files
4. Review activity logs regularly
5. Configure alerts for suspicious activities

## 🧪 Testing

Run the complete test script:
```bash
node scripts/test-extended-apis.js
```

This script tests all new functionalities and generates a complete report.

## 📞 Support

For any questions about the new functionalities:
1. Review this documentation
2. Run tests to verify functionality
3. Check server logs for debugging
4. Verify database configuration

---

*This extension transforms the MCP Context Server into a complete project context management solution, providing all necessary tools for tracking, analysis, and administration of software development projects.*
