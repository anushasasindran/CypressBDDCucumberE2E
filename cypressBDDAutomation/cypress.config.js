const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  supportsFolder: 'cypress/support',
  defaultCommandTimeout: 30000,
  pageLoadTimeout:120000,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
    baseUrl: 'https://practice.expandtesting.com/',
    testIsolation: false,
    specPattern: [
      'cypress/e2e/order-api-features.js',
      'cypress/e2e/order-ui-features.js'
    ],
      "env": {
        "TAGS": "@negative or @positive"
      },
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
      // implement node event listeners here
    },
  },
});