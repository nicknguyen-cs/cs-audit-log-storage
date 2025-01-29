# Contentstack Audit Log Backup System

![Contentstack Logo](https://www.contentstack.com/docs/static/contentstack_logo_black-72d7e5e1e7a9d88a6cce5a5f5b1c0a0a.svg)

Automated daily backup system for Contentstack audit logs. Fetches, filters, and stores audit logs in JSON format while uploading them to Contentstack as assets.

## 📌 Features

- **Daily Log Retrieval**: Automatically fetches audit logs from Contentstack
- **Date Filtering**: Only processes logs from the current day
- **JSON Backup**: Saves filtered logs to timestamped JSON files
- **Contentstack Integration**: Uploads backups as assets to specified folder
- **Automatic Cleanup**: Deletes local files after successful upload
- **Logging**: Colored console output with timestamps and emojis
- **Error Handling**: Robust error tracking and reporting

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- Contentstack account with:
  - Management token 
  - API Key
  - Target folder UID for asset storage (can use base folder if you want. I use a folder called "Assets")

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/cs-audit-log-backup.git
cd cs-audit-log-backup
Install dependencies:

bash
Copy
npm install
Create .env file:

bash
Copy
cp .env.example .env
Configuration
Update .env with your credentials:

ini
Copy
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_AUTH_TOKEN=your_management_token
CONTENTSTACK_FOLDER_UID=your_target_folder_uid
🛠 Usage
bash
Copy
npm start
Sample output:

Copy
🚀 Starting audit log export...
💾 Saved 142 logs to Audit_Log_09_15_23.json
📤 Uploaded asset ID: blt1234567890abcdef
🎉 Process completed successfully
Scheduling (Cron Job Example)
Run daily at 2 AM:

bash
Copy
0 2 * * * /usr/local/bin/node /path/to/project/index.js
📂 Project Structure
Copy
cs-audit-log-backup/
├── config/               # Configuration files
├── lib/                  # Custom libraries
│   └── logger.js         # Logging utilities
├── services/             # API clients and services
├── utils/                # Helper functions
├── .env.example          # Environment template
├── index.js              # Main entry point
└── package.json
🔧 Technical Details
Dependencies
Package	Purpose
axios	HTTP client for API requests
date-fns	Date formatting and manipulation
dotenv	Environment variable management
chalk	Terminal output styling
form-data	File upload handling
Environment Variables
Variable	Description
CONTENTSTACK_API_KEY	Contentstack API key
CONTENTSTACK_AUTH_TOKEN	Management token for authentication
CONTENTSTACK_FOLDER_UID	Target folder UID for asset storage
🚨 Error Handling
The system implements multiple error handling layers:

Environment validation at startup

API request retries (future implementation)

File operation error tracking

Graceful shutdown on critical errors

Check logs for detailed error messages:

bash
Copy
[2023-09-15T14:30:45.000Z] ERROR: 💥 Critical error: Missing API credentials