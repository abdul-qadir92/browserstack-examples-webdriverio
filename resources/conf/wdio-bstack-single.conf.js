var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  onBrowserstack: true,
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  specs: [
     './src/test/suites/login/*.js',
        './src/test/suites/offers/*.js',
        './src/test/suites/product/*.js',
        './src/test/suites/e2e/*.js',
        './src/test/suites/user/*.js',
        './src/test/suites/accessibility/*.js'
  ],
  hostname: 'hub.browserstack.com',
  capabilities: [{
    maxInstances: 1,
    'browserstack.maskCommands':'setValues, getValues, setCookies, getCookies',
    'browserstack.debug': true,
    'browserstack.video': true,
    'browserstack.networkLogs': true,
    'browserstack.geoLocation':'IN',
    os: "OS X",
    os_version: "Ventura",
    browserName: 'Chrome',
    browser_version: "latest",
    acceptInsecureCerts: true,
    name: (require('minimist')(process.argv.slice(2)))['bstack-session-name'] || 'default_name',
    build: process.env.BROWSERSTACK_BUILD_NAME || 'wdio - Dragdrop'// + " - " + new Date().getTime()
  }],
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    if((require('minimist')(process.argv.slice(2)))['bstack-session-name']) {
      browser.executeScript("browserstack_executor: {\"action\": \"setSessionName\", \"arguments\": {\"name\":\"" +
        (require('minimist')(process.argv.slice(2)))['bstack-session-name'] +  "\" }}");
    } else {
      browser.executeScript("browserstack_executor: {\"action\": \"setSessionName\", \"arguments\": {\"name\":\"" + (require('minimist')(process.argv.slice(2)))['bstack-session-name']  +  "\" }}");
    }

    if(passed) {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}');
    } else {
      browser.takeScreenshot();
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}');
    }
  }
};

exports.config = _.defaultsDeep(overrides, defaults.config);
