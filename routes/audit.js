// routes/audit.js
import { fetchAuditLogs, uploadLogsToCS } from '../services/contentstack.js';
import { generateFilename, cleanupFile } from '../services/fileServices.js';
import { logger } from '../utils/logger.js';

const processAuditLogs = async (req, res, next) => {
  try {
    const logs = await fetchAuditLogs();
    
    if (logs.length === 0) {
      logger.info('No logs found for processing');
      return res.status(204).json({ message: 'No logs found' });
    }

    const filename = generateFilename();
    console.log(filename);
    const assetDetails = await uploadLogsToCS(logs, filename);
    
    res.json({
      success: true,
      filename,
      assetId: assetDetails.uid,
      url: assetDetails.url
    });
    
  } catch (error) {
    next(error);
  }
};

export default processAuditLogs;