const fs = require('fs');
const path = require('path');

module.exports = {
  e2e: {
    // Specify the pattern for test files
    specPattern: 'cypress/testcases/**/*.cy.{js,jsx,ts,tsx}',
    chromeWebSecurity: false, // Allows cross-origin requests
    testIsolation: false, // Prevent redirect to blank page

    // Konfigurasi reporter Mochawesome
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome-report',
      overwrite: false,
      html: true,
      json: true
    },

    setupNodeEvents(on, config) {
      
      // Event: Generate a custom report after tests complete
      on('after:run', (results) => {
        // Define the directory and file path for the custom report
        const reportDir = './cypress/reports';
        const customReportPath = path.join(reportDir, 'custom-report.js');

        // Ensure the reports directory exists
        if (!fs.existsSync(reportDir)) {
          fs.mkdirSync(reportDir, { recursive: true });
        }

        // Construct the content for the custom report
        const reportContent = `
          const report = {
            totalTests: ${results.totalTests},
            totalPassed: ${results.totalPassed},
            totalFailed: ${results.totalFailed},
            totalSkipped: ${results.totalSkipped},
            browser: '${results.browserName}',
            os: '${results.osName} ${results.osVersion}',
            cypressVersion: '${results.cypressVersion}',
            testDetails: ${JSON.stringify(
              results.runs.flatMap((run) =>
                run.tests.map((test) => ({
                  testName: test.title.join(' > '), // Combine nested titles for full test name
                  status: test.state // 'passed', 'failed', or 'skipped'
                }))
              ),
              null,
              2
            )}
          };
          
          module.exports = report;
        `;

        // Write the custom report file
        fs.writeFileSync(customReportPath, reportContent);
        console.log('Custom report generated at:', customReportPath);
      });

      return config;
    }
  }
};
