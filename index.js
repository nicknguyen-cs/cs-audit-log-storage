const { formatDate } = require('./utils/dateUtils');
const { generateFilename, saveFile, deleteLocalFile } = require('./utils/fileUtils');
const { uploadAsset, fetchAuditLogs } = require('./services/contentstack');
const config = require('./config');
const logger = require('./lib/logger');

(async () => {
  try {
    logger.info('🚀 Starting audit log export...');
    
    const logs = await fetchAuditLogs();
    const filteredLogs = logs.filter(log => 
      formatDate(new Date(log.created_at), 'yyyy-MM-dd') === formatDate(new Date(), 'yyyy-MM-dd')
    );

    if (filteredLogs.length === 0) {
      logger.info('ℹ️ No logs found for today');
      return;
    }

    const filename = generateFilename();
    await saveFile(filename, JSON.stringify(filteredLogs, null, config.FILE_SETTINGS.INDENTATION));
    logger.info(`💾 Saved ${filteredLogs.length} logs to ${filename}`);

    const assetId = await uploadAsset(filename);
    logger.info(`📤 Uploaded asset ID: ${assetId}`);

    await deleteLocalFile(filename);
    logger.info('🎉 Process completed successfully');
    
  } catch (error) {
    logger.error(`💥 Critical error: ${error.message}`);
    process.exit(1);
  }
})();