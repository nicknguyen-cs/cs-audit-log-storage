require('dotenv').config();

module.exports = {
  CONTENTSTACK: {
    API_ENDPOINT: 'https://api.contentstack.io/v3',
    ASSETS_PATH: '/assets',
    AUDIT_LOGS_PATH: '/audit-logs',
    REQUIRED_ENV: [
      'CONTENTSTACK_API_KEY',
      'CONTENTSTACK_AUTH_TOKEN',
      'CONTENTSTACK_FOLDER_UID'
    ]
  },
  FILE_SETTINGS: {
    PREFIX: 'Audit_Log',
    ENCODING: 'utf8',
    INDENTATION: 2
  }
};