const axios = require('axios');
const path = require('path');
require('dotenv').config(); // Jika menggunakan .env file

// Gunakan Bot User OAuth Token dari environment variable
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const SLACK_CHANNEL = '#automation-report'; // Ganti dengan channel yang diinginkan

// Path ke custom report file
const reportFile = path.resolve(__dirname, './cypress/reports/custom-report.js');

async function postToSlack() {
  try {
    // Import custom report secara dinamis
    const report = require(reportFile);

    // Format detail hasil test untuk Slack
    const testDetailsText = report.testDetails
      .map((test, index) => `${index + 1}. *${test.testName}*: ${test.status.toUpperCase()}`)
      .join('\n');

    // Build Slack message
    const message = {
      channel: SLACK_CHANNEL,
      text: 'Cypress Test Report from GitHub cronJob Auto-Scheduler',
      attachments: [
        {
          color: report.totalFailed > 0 ? 'danger' : 'good',
          title: 'Summary',
          fields: [
            { title: 'Total Tests', value: report.totalTests.toString(), short: true },
            { title: 'Passed', value: report.totalPassed.toString(), short: true },
            { title: 'Failed', value: report.totalFailed.toString(), short: true },
            { title: 'Skipped', value: report.totalSkipped.toString(), short: true },
          ],
          footer: `Browser: ${report.browser}, OS: ${report.os}, Cypress v${report.cypressVersion}`,
        },
        {
          color: '#36A64F',
          title: 'Test Details',
          text: testDetailsText,
        },
      ],
    };

    // Kirim pesan ke Slack API menggunakan Bot Token
    const response = await axios.post(
      'https://slack.com/api/chat.postMessage',
      message,
      {
        headers: {
          Authorization: `Bearer ${SLACK_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Periksa apakah pengiriman berhasil
    if (!response.data.ok) {
      throw new Error(`Slack API Error: ${response.data.error}`);
    }

    console.log('Report sent to Slack:', response.data);
  } catch (error) {
    console.error('Error sending to Slack:', error.message);
    if (error.response?.data) {
      console.error('Slack API response:', error.response.data);
    }
  }
}

// Jalankan pengiriman laporan ke Slack
postToSlack();
