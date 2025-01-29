const axios = require('axios');
const config = require('../config');

module.exports = {
  createContentstackClient: () => {
    return axios.create({
      baseURL: config.CONTENTSTACK.API_ENDPOINT,
      headers: {
        api_key: process.env.CONTENTSTACK_API_KEY,
        authorization: process.env.CONTENTSTACK_AUTH_TOKEN
      },
      timeout: 10000
    });
  }
};