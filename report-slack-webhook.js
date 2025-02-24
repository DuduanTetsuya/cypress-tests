//Lokal Slack using Webhook

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

    // Format test details for Slack
    const testDetailsText = report.testDetails
      .map((test, index) => `${index + 1}. *${test.testName}*: ${test.status.toUpperCase()}`)
      .join('\n');

    // Build the Slack message
    const message = {
      text: 'Cypress Test Report Local',
      attachments: [
        {
          color: report.totalFailed > 0 ? 'danger' : 'good',
          title: 'Summary',
          fields: [
            { title: 'Total Tests', value: report.totalTests, short: true },
            { title: 'Passed', value: report.totalPassed, short: true },
            { title: 'Failed', value: report.totalFailed, short: true },
            { title: 'Skipped', value: report.totalSkipped, short: true },
          ],
          footer: `Browser: ${report.browser}, OS: ${report.os}, Cypress v${report.cypressVersion}`,
        },
        {
          color: '#36A64F', // Use a different color for details section
          title: 'Test Details',
          text: testDetailsText,
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
