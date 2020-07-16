// Generated by CoffeeScript 1.12.7
(function() {
  var Promise, Reporter, SuiteReporter, fastBind, findSourceReferenceUrlRegexp, log, ref;

  if (global.document) {
    ref = require('art-foundation'), log = ref.log, fastBind = ref.fastBind, Promise = ref.Promise, findSourceReferenceUrlRegexp = ref.findSourceReferenceUrlRegexp;
    SuiteReporter = (function() {
      function SuiteReporter(suite1) {
        this.suite = suite1;
        this.failedTests = [];
        this.passedTests = [];
        this.tests = [];
      }

      SuiteReporter.prototype.addTest = function(test) {
        return this.tests.push(test);
      };

      SuiteReporter.prototype.addFailure = function(test, err) {
        return this.failedTests.push(Promise.resolve([test, err, err.stack]));
      };

      SuiteReporter.prototype.addPass = function(test) {
        return this.passedTests.push(test);
      };

      SuiteReporter.prototype.mergeStackTraces = function(normalStackTrace, mappedStackTrace) {
        var i, j, len, line, mappedLine, normalStackTraceArray, output, ref1, rest, sourceRefRegex, url;
        normalStackTraceArray = normalStackTrace.split('\n');
        output = normalStackTraceArray.slice(0, 1);
        rest = normalStackTraceArray.slice(1);
        sourceRefRegex = /\([^)]+\:\d+\:\d+\)/;
        if (rest.length === (mappedStackTrace != null ? mappedStackTrace.length : void 0)) {
          for (i = j = 0, len = rest.length; j < len; i = ++j) {
            line = rest[i];
            mappedLine = mappedStackTrace[i];
            url = (ref1 = mappedLine.match(sourceRefRegex)) != null ? ref1[0] : void 0;
            if (url) {
              rest[i] = line.replace(sourceRefRegex, url);
            }
          }
        }
        return normalStackTraceArray[0] + "\n" + (rest.join("\n"));
      };

      SuiteReporter.prototype.outputFailedTests = function(failedTests) {
        var err, j, len, mappedStackTrace, ref1, test;
        console.group("Failures");
        for (j = 0, len = failedTests.length; j < len; j++) {
          ref1 = failedTests[j], test = ref1[0], err = ref1[1], mappedStackTrace = ref1[2];
          console.error(this.mergeStackTraces(test.err.stack, mappedStackTrace));
          console.log({
            Expected: err.expected,
            Actual: err.actual
          });
        }
        return console.groupEnd();
      };

      SuiteReporter.prototype.outputPassedTest = function(passedTests) {
        var j, len, test;
        console.groupCollapsed("Passes");
        for (j = 0, len = passedTests.length; j < len; j++) {
          test = passedTests[j];
          console.log(test.title);
        }
        return console.groupEnd();
      };

      SuiteReporter.prototype.output = function() {
        var passedTests, title;
        title = this.suite.title + " (" + (this.tests.length - this.failedTests.length) + "/" + this.tests.length + " passed)";
        passedTests = this.passedTests;
        return Promise.all(this.failedTests).then((function(_this) {
          return function(failedTests) {
            if (failedTests.length === 0) {
              console.groupCollapsed(title);
            } else {
              console.group(title);
              _this.outputFailedTests(failedTests);
            }
            _this.outputPassedTest(passedTests);
            return console.groupEnd();
          };
        })(this), function(err) {
          return console.err("promise error", err);
        });
      };

      return SuiteReporter;

    })();
    module.exports = Reporter = (function() {
      function Reporter(runner, options) {
        this.runner = runner;
        new Mocha.reporters.HTML(this.runner);
        this.registerHandlers();
      }

      Reporter.prototype.registerHandlers = function() {
        this.runner.on('pass', (function(_this) {
          return function(test) {
            return _this.suiteReporter.addPass(test);
          };
        })(this));
        this.runner.on('test', (function(_this) {
          return function(test) {
            return _this.suiteReporter.addTest(test);
          };
        })(this));
        this.runner.on('fail', (function(_this) {
          return function(test, err) {
            return _this.suiteReporter.addFailure(test, err);
          };
        })(this));
        this.runner.on('suite', (function(_this) {
          return function(suite) {
            return _this.suiteReporter = new SuiteReporter(suite);
          };
        })(this));
        return this.runner.on('suite end', (function(_this) {
          return function(suite) {
            var ref1;
            if ((ref1 = _this.suiteReporter) != null) {
              ref1.output();
            }
            return _this.suiteReporter = null;
          };
        })(this));
      };

      return Reporter;

    })();
  }

}).call(this);