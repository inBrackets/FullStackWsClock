// karma.conf.js
console.log("Using karma.conf.js");
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    reporters: ['progress', 'junit'],
    junitReporter: {
      outputDir: 'dist/test-results',    // folder for results
      outputFile: 'test-results.xml',    // optional file name
      useBrowserName: false              // single XML file
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: false,
  });
};
