const { format } = require('util');
const chalk = require('chalk');

const logLevels = {
  INFO: 'info',
  ERROR: 'error',
  WARN: 'warn',
  DEBUG: 'debug'
};

const logColors = {
  [logLevels.INFO]: chalk.cyan,
  [logLevels.ERROR]: chalk.red.bold,
  [logLevels.WARN]: chalk.yellow,
  [logLevels.DEBUG]: chalk.magenta
};

// Define logMessage first
const logMessage = (level, message, args) => {
  if (process.env.NODE_ENV === 'test' && level === logLevels.DEBUG) return;
  
  const timestamp = new Date().toISOString();
  const formattedMessage = format(message, ...args);
  const color = logColors[level] || chalk.white;
  
  console.log(
    color(`[${timestamp}] ${level.toUpperCase()}: ${formattedMessage}`)
  );
};

module.exports = {
  info: (message, ...args) => logMessage(logLevels.INFO, message, args),
  error: (message, ...args) => logMessage(logLevels.ERROR, message, args),
  warn: (message, ...args) => logMessage(logLevels.WARN, message, args),
  debug: (message, ...args) => logMessage(logLevels.DEBUG, message, args)
};