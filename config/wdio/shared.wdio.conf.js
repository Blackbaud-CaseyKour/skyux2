/**
 * WebDriver configuration options shared between CI and local versions.
 */

(function () {
  'use strict';

  var timestamp;
  module.exports = {
    specs: [
        'src/modules/**/alert.component.visual-spec.js'
    ],
    logLevel: 'verbose',
    coloredLogs: true,
    baseUrl: 'http://localhost:3000',
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'jasmine',
    jasmineNodeOpts: {
      defaultTimeoutInterval: 200000,
      expectationResultHandler: function () {

      }
    },
    waitforTimeout: 3000,
    services: [
      'visual-regression'
    ],

    before: function () {
      console.log('in before');
      timestamp = new Date().getTime();
      var commands = require('../utils/visual-browser-commands');
      /*Object.keys(commands).forEach(function (command) {
        browser.addCommand(command, function async() {
          var args = Array.from(arguments);
          args.unshift(this);
          commands[command].apply(this, args);
        });
      });*/

      browser.addCommand('setupTest', function async(url, screenWidth) {
        return commands.setupTest(this, url, screenWidth || 1280);
      });

      browser.addCommand('compareScreenshot', function async(options) {
        return commands.compareScreenshot(this, options);
      });

      browser.addCommand('moveCursorOffScreen', function async() {
        return commands.moveCursorOffScreen(this);
      });

      browser.addCommand('focusElement', function async(selector) {
        return commands.focusElement(this, selector);
      });

      console.log('end of before');

    },

    beforeTest: function () {
    },

    after: function () {

    },

    sync: false
  };

})();
