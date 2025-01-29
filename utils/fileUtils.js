const { writeFile, unlink } = require('fs').promises;
const { join } = require('path');
const config = require('../config');

module.exports = {
  generateFilename: () => {
    const dateString = require('./dateUtils').formatDate(new Date(), 'MM_dd_yy');
    return `${config.FILE_SETTINGS.PREFIX}_${dateString}.json`;
  },

  deleteLocalFile: async (filename) => {
    try {
      await unlink(filename);
      return true;
    } catch (error) {
      throw new Error(`File deletion failed: ${error.message}`);
    }
  },

  saveFile: async (filename, content) => {
    try {
      await writeFile(filename, content, {
        encoding: config.FILE_SETTINGS.ENCODING
      });
      return filename;
    } catch (error) {
      throw new Error(`File save failed: ${error.message}`);
    }
  }
};