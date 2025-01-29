
# Contentstack Audit Log Backup System
Automated  backup system for Contentstack audit logs. Fetches today's logs, stores them as JSON files, and uploads to Contentstack assets with automatic local file cleanup.

## Features

- 📅 **Date Filtering**: Only processes today's entries (can be modified)
- 💾 **JSON Backup**: Creates timestamped JSON files
- ☁️ **Cloud Storage**: Uploads to Contentstack assets
- 🧹 **Auto-Cleanup**: Removes local files after upload

## Prerequisites

| Requirement | Version | Notes |
 |----------------------|----------|------------------------------------| 
 | Node.js | ≥16.x | LTS version recommended |
| Contentstack Account | - | Requires management token |
| npm | ≥7.x | Included with Node.js 16+ | 
## Installation

```bash
git clone https://github.com/your-username/cs-audit-log-backup.git
cd cs-audit-log-backup
npm install
```

Create `.env` file from template:
```bash
cp .env.example .env
```

## Configuration

| Environment Variable | Required | Example Value | Description | 
|----------------------------|----------|----------------------------|-----------------------------|
 | `CONTENTSTACK_API_KEY` | Yes | `blt1234567890` | Contentstack API key |
| `CONTENTSTACK_AUTH_TOKEN` | Yes | `cs1234567890` | Management token |
| `CONTENTSTACK_FOLDER_UID` | Yes | `bltfolder123456` | Target assets folder UID | 
## Dependencies

| Package | Version | Purpose |
 |---------------|-----------|-------------------------------| 
 | Axios | ^1.4.0 | HTTP client for API requests |
| date-fns | ^2.30.0 | Date formatting/manipulation |
| dotenv | ^16.0.3 | Environment variable loader |
| chalk | ^4.1.2 | Terminal output styling |
| form-data | ^4.0.0 | File upload handling | 
## Project Structure

| Path | Description | 
|---------------------|--------------------------------------| 
| `/config` | Configuration files |
| `/lib` | Core utilities (logging) |
| `/services` | API clients and integrations |
| `/utils` | Helper functions |
| `index.js` | Main application entry point | 
## Usage

```bash
node index.js
```

Sample output:
```bash
🚀 Starting audit log export...
💾 Saved 142 logs to Audit_Log_09_15_23.json
📤 Uploaded asset ID: blt1234567890abcdef
🎉 Process completed successfully
```

## Error Handling

| Code | Description | Resolution | 
|------------|------------------------------------|--------------------------------| 
| ENV_MISSING| Missing environment variables | Check .env file |
| API_FAIL | Contentstack API connection issue | Verify network/credentials |
| FS_ERROR | File system operation failed | Check permissions/disk space |

