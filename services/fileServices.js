// src/services/fileService.js
import { promises as fs } from 'fs';
import { formatISO } from 'date-fns';
import { logger } from '../utils/logger.js';

// Ensure temp directory exists
const ensureTempDir = async () => {
  try {
    await fs.mkdir('./tmp', { recursive: true });
  } catch (error) {
    logger.error('Failed to create temp directory:', error);
    throw error;
  }
};

export const generateFilename = () => {
  const now = new Date();
  
  // Date components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  // Time components
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  

  return `audit_logs_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.json`;
};

export const writeLogFile = async (filename, logs) => {
  try {
    await ensureTempDir();
    const filePath = `./tmp/${filename}`;
    await fs.writeFile(filePath, JSON.stringify(logs, null, 2));
    logger.info(`📝 Wrote logs to ${filePath}`);
    return filePath;
  } catch (error) {
    logger.error('File write failed:', error);
    throw error;
  }
};

export const cleanupFile = async (filename) => {
  try {
    const filePath = `./tmp/${filename}`;
    await fs.unlink(filePath);
    logger.info(`🧹 Cleaned up file: ${filePath}`);
  } catch (error) {
    logger.error('File cleanup failed:', error);
    throw error;
  }
};