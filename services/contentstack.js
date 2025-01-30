// services/contentstack.js
import axios from "axios";
import FormData from "form-data";
import fs from "fs"; // Regular fs for createReadStream
import { promises as fsp } from "fs"; // Promise-based fs
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "../utils/logger.js";
import config from "../config/index.js";
import { startOfDay, endOfDay } from "date-fns";

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure temporary directory path
const tmpDir = path.join(__dirname, "../tmp"); // Adjust based on your structure

const csClient = axios.create({
  baseURL: config.CONTENTSTACK_API_BASE,
  headers: {
    api_key: config.CONTENTSTACK_API_KEY,
    authorization: config.CONTENTSTACK_AUTH_TOKEN,
  },
  timeout: 10000,
});

export const fetchAuditLogs = async () => {
  try {
    const today = new Date();
    const response = await csClient.get("/audit-logs", {
      params: {
        start_time: startOfDay(today).toISOString(),
        end_time: endOfDay(today).toISOString(),
      },
    });

    return response.data.logs || [];
  } catch (error) {
    logger.error("Failed to fetch audit logs:", error);
    throw new Error("Failed to retrieve audit logs");
  }
};

export const uploadLogsToCS = async (logs, filename) => {
  const filePath = path.join(tmpDir, filename);
  let fileExists = false;

  try {
    // Ensure tmp directory exists
    console.log(filePath);
    await fsp.mkdir(tmpDir, { recursive: true });
    // Write logs to temporary file
    await fsp.writeFile(filePath, JSON.stringify(logs, null, 2));
    fileExists = true; // Track file creation

    // Prepare form data
    const form = new FormData();
    form.append("asset[upload]", fs.createReadStream(filePath));
    form.append("asset[title]", filename);
    form.append("asset[parent_uid]", config.CONTENTSTACK_FOLDER_UID);

    // Upload to Contentstack
    const response = await csClient.post(
      "https://api.contentstack.io/v3/assets",
      form,
      {
        headers: {
          ...form.getHeaders(), // FormData headers
          api_key: config.CONTENTSTACK_API_KEY, // Explicit auth headers
          authorization: config.CONTENTSTACK_AUTH_TOKEN,
        },
      }
    );

    return response.data.asset;
  } finally {
    // Cleanup only if the file was created
    if (fileExists) {
      try {
        await fsp.unlink(filePath);
        logger.info(`🧹 Cleaned up file: ${filePath}`);
      } catch (error) {
        logger.error('File cleanup failed:', error);
        throw error;
      }
    }
  }
};
