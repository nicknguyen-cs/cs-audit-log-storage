import dotenv from 'dotenv';
dotenv.config();

// Create config object first
const config = {
  CONTENTSTACK_API_BASE: process.env.CONTENTSTACK_API_BASE,
  CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
  CONTENTSTACK_AUTH_TOKEN: process.env.CONTENTSTACK_AUTH_TOKEN,
  CONTENTSTACK_FOLDER_UID: process.env.CONTENTSTACK_FOLDER_UID
};

// Validation function
const validateConfig = () => {
  const required = [
    'CONTENTSTACK_API_BASE',
    'CONTENTSTACK_API_KEY',
    'CONTENTSTACK_AUTH_TOKEN',
    'CONTENTSTACK_FOLDER_UID'
  ];

  required.forEach(key => {
    if (!config[key]) {
      throw new Error(`Missing required config: ${key}`);
    }
  });
};

// Validate before exporting
validateConfig();

// Export as default
export default config;