const axios = require('axios');
require('dotenv').config();

const CLICKATELL_API_KEY = process.env.CLICKATELL_API_KEY;
const CLICKATELL_API_URL = 'https://api.clickatell.com/rest/message';

/**
 * Send SMS using Clickatell API.
 * @param {string} to - Recipient phone number.
 * @param {string} message - SMS message content.
 * @returns {Promise} - Response from Clickatell API.
 */
async function sendSMS(to, message) {
  try {
    const response = await axios.post(CLICKATELL_API_URL, {
      messages: [{ to, body: message }],
    }, {
      headers: {
        'Authorization': `Bearer ${CLICKATELL_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',  // Add Accept header
        'X-Clickatell-Version': '1.0' // Specify API version
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error sending SMS: ${error.response ? error.response.data : error.message}`);
  }
}

module.exports = { sendSMS };
