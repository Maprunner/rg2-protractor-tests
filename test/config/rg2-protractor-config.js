exports.config = {
// ----- How to setup Selenium -----
//
// There are three ways to specify how to use Selenium. Specify one of the
// following:
//
// 1. seleniumServerJar - to start Selenium Standalone locally.
// 2. seleniumAddress - to connect to a Selenium server which is already
// running.
// 3. sauceUser/sauceKey - to use remote Selenium servers via SauceLabs.
//
// If the chromeOnly option is specified, no Selenium server will be started,
// and chromeDriver will be used directly (from the location specified in
// chromeDriver)
// The location of the selenium standalone server .jar file, relative
// to the location of this config. If no other method of starting selenium
// is found, this will default to protractor/selenium/selenium-server...
seleniumServerJar: null,//'./selenium/selenium-server-standalone-2.37.0.jar',
// The port to start the selenium server on, or null if the server should
// find its own unused port.
seleniumPort: 3010,//3010,
// Chromedriver location is used to help the selenium standalone server
// find chromedriver. This will be passed to the selenium jar as
// the system property webdriver.chrome.driver. If null, selenium will
// attempt to find chromedriver using PATH.
chromeDriver: '../../node_modules/chromedriver/lib/chromedriver/chromedriver.exe',
// If true, only chromedriver will be started, not a standalone selenium.
// Tests for browsers other than chrome will not run.
//chromeOnly: true,
directConnect: true,

// Additional command line options to pass to selenium. For example,
// if you need to change the browser timeout, use
// seleniumArgs: ['-browserTimeout=60'],
seleniumArgs: [],
// The address of a running selenium server. If specified, Protractor will
// connect to an already running instance of selenium. This usually looks like
//seleniumAddress: 'http://localhost:4444/wd/hub',
// If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
// The tests will be run remotely using SauceLabs.
// The timeout for each script run on the browser. This should be longer
// than the maximum time your application needs to stabilize between tasks.
allScriptsTimeout: 30000,
// ----- What tests to run -----
//
// Spec patterns are relative to the location of this config.
specs: [
  //'test/spec/*.spec.js'
  //'test/spec/core.spec.js'
  //'test/spec/draw.spec.js',
  //'test/spec/gps.spec.js'
  //'test/spec/manager1.spec.js'
  //'test/spec/manager2.spec.js'
  //'test/spec/manager3.spec.js',
  //'test/spec/manager4.spec.js',
  //'test/spec/manager5.spec.js',
  //'test/spec/manageredit.spec.js',
  'test/spec/replay.spec.js'
],
exclude: [],
// ----- Capabilities to be passed to the webdriver instance ----
//
// For a full list of available capabilities, see
// https://code.google.com/p/selenium/wiki/DesiredCapabilities
// and
// https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
capabilities: {
'browserName': 'chrome'
// 'browserName': 'firefox'
// 'browserName': 'phantomjs'
},

jasmineNodeOpts: {
  isVerbose: true,
  showColors: true,
  includeStackTrace: false
  },

maxSessions: 1,

params: {},

onPrepare: function(){
  var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
  jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all', displaySpecDuration: true}));
}

};
