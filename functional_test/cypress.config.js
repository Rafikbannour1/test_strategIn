const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default
const report = require('multiple-cucumber-html-reporter');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());

    },
    specPattern: ["**/**/**/*.feature"],
    supportFile: "cypress/support/e2e.js",
    env: {
      baseUrl: "http://localhost:3000/"
    },
    videosFolder: './cypress/videos',
    video: true,

    screenshotOnRunFailure: true,
    screenshotsFolder: './cypress/screenshots',
    viewportWidth: 1600,
    viewportHeight: 1000,
    defaultCommandTimeout: 5000,
    pageLoadTimeout: 3000,
    chromeWebSecurity: false,
    waitForAnimations: true,

   // specPattern: ["**/*.feature"],
    //supportFile: false,

    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: './reports/mochawesome',
      overwrite: false,
      html: false,
      json: true
    },
  }
});
