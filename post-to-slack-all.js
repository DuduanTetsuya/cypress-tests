const axios = require('axios');
const path = require('path');

// Slack webhook URL
const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

// Path to the custom report file
const reportFile = path.resolve(__dirname, './cypress/reports/custom-report.js');

async function postToSlack() {
  try {
    // Dynamically import the custom report file
    const report = require(reportFile);

    // Build the Slack message
    const message = {
      text: 'Cypress Test Report',
      attachments: [
        {
          color: report.totalFailed > 0 ? 'danger' : 'good',
          title: 'Test Results',
          fields: [
            { title: 'Total Tests', value: report.totalTests, short: true },
            { title: 'Passed', value: report.totalPassed, short: true },
            { title: 'Failed', value: report.totalFailed, short: true },
            { title: 'Skipped', value: report.totalSkipped, short: true },
          ],
          footer: `Browser: ${report.browser}, OS: ${report.os}, Cypress v${report.cypressVersion}`,
        },
      ],
    };

    // Send the message to Slack
    const response = await axios.post(SLACK_WEBHOOK_URL, message);
    console.log('Report sent to Slack:', response.status, response.statusText);
  } catch (error) {
    console.error('Error sending to Slack:', error.message);
    if (error.response?.data) {
      console.error('Slack API response:', error.response.data);
    }
  }
}

// Run the Slack notification
postToSlack();
