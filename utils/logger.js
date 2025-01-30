// utils/logger.js
import { format } from 'util';
import chalk from 'chalk';

export const logger = {
  info: (message, ...args) => logMessage('info', message, args),
  error: (message, ...args) => logMessage('error', message, args)
};

const logMessage = (level, message, args) => {
  const timestamp = new Date().toISOString();
  const formatted = format(message, ...args);
  const color = level === 'info' ? chalk.cyan : chalk.red;
  console.log(color(`[${timestamp}] ${formatted}`));
};