const FormData = require('form-data');
const fs = require('fs');
const config = require('../config');
const apiClient = require('./apiClient');

module.exports = {
  uploadAsset: async (filename) => {
    try {
      const client = apiClient.createContentstackClient();
      const form = new FormData();
      
      form.append('asset[upload]', fs.createReadStream(filename));
      form.append('asset[title]', filename);
      form.append('asset[description]', 'Audit Log Automated Report');
      form.append('asset[parent_uid]', process.env.CONTENTSTACK_FOLDER_UID);

      const response = await client.post(
        config.CONTENTSTACK.ASSETS_PATH, 
        form, 
        { headers: form.getHeaders() }
      );

      return response.data.asset.uid;
    } catch (error) {
      throw new Error(`Asset upload failed: ${error.response?.data?.error_message || error.message}`);
    }
  },

  fetchAuditLogs: async () => {
    try {
      const client = apiClient.createContentstackClient();
      const response = await client.get(config.CONTENTSTACK.AUDIT_LOGS_PATH);
      return response.data.logs || [];
    } catch (error) {
      throw new Error(`Audit logs fetch failed: ${error.response?.data?.error_message || error.message}`);
    }
  }
};