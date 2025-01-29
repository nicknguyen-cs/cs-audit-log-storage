// utils/dateUtils.js
const { format } = require('date-fns');

module.exports = {
  /**
   * Formats a date using specified pattern
   * @param {Date} date - Date object to format
   * @param {string} pattern - Date format pattern
   * @returns {string} Formatted date string
   */
  formatDate: (date, pattern = 'yyyy-MM-dd') => {
    try {
      return format(date, pattern);
    } catch (error) {
      throw new Error(`Date formatting failed: ${error.message}`);
    }
  },

  /**
   * Checks if a given date is today
   * @param {Date} date - Date to check
   * @returns {boolean} True if the date is today
   */
  isToday: (date) => {
    const today = new Date();
    return format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
  },

  /**
   * Validates a date string
   * @param {string} dateString - Date string to validate
   * @returns {boolean} True if valid date string
   */
  isValidDate: (dateString) => {
    return !isNaN(Date.parse(dateString));
  }
};