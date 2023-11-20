
const { defineConfig } = require("cypress");
const { configurePlugin } = require("cypress-mongodb");

module.exports = defineConfig({
  env: {
    mongodb: {
      uri: "mongodb://testUser:qwerty12345@5.189.186.217:27017/?authMechanism=DEFAULT",
      database: "admin",
    },
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
      const email = process.env.EMAIL;
      const password = process.env.PASSWORD;

      config.env = { email, password };
      console.log(config);
      // implement node event listeners here
    },
  },
});
