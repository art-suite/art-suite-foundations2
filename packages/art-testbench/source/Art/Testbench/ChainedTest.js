// Generated by CoffeeScript 1.12.7
(function() {
  var BaseClass, ChainedTest, Promise, array, compactFlatten, currentSecond, defineModule, isArray, isFunction, isObject, isString, log, present, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  ref = require('art-standard-lib'), currentSecond = ref.currentSecond, compactFlatten = ref.compactFlatten, isArray = ref.isArray, isFunction = ref.isFunction, isString = ref.isString, isObject = ref.isObject, present = ref.present, Promise = ref.Promise, defineModule = ref.defineModule, log = ref.log, array = ref.array;

  BaseClass = require('art-class-system').BaseClass;

  module.exports = ChainedTest = (function(superClass) {
    extend(ChainedTest, superClass);

    ChainedTest.chainedTest = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return ChainedTest.setup.apply(ChainedTest, args);
    };


    /*
    IN:
      PATTERN 1:
        (setupFunciton) ->
    
      PATTERN 2:
        (setupTestName, setupFunction) ->
    
      setupTestName
        String
        If present, appended to the Mocha setup-test's name
      setupFunction
        Result: any arbitrary function.
        Result is resolved if it's a promise before passing to tests.
        The result is passed to every test as the test's 2nd argument.
        The result is ALSO passed to the very first test as the test's 1st argument.
     */

    ChainedTest.setup = function(a, b) {
      var setupFunction, setupName, setupOnceFunction, setupOncePromise;
      setupFunction = b != null ? b : a;
      if (b != null) {
        setupName = a;
      }
      setupOncePromise = null;
      setupOnceFunction = function() {
        return setupOncePromise != null ? setupOncePromise : setupOncePromise = Promise.then(setupFunction != null ? setupFunction : function() {});
      };
      if (setupFunction) {
        setupName = setupName ? "ChainedTest setup: " + setupName : "ChainedTest setup";
        test(setupName, setupOnceFunction);
      }
      return new ChainedTest(setupOnceFunction, setupOnceFunction);
    };

    ChainedTest.test = function(testName, testFunction) {
      return new ChainedTest(null, null, testName, testFunction);
    };


    /*
    IN:
      setupOnceFunction: [optional] ->
        OUT: promise result will be resolved and passed to every @testFunction
          as the second argument
          AND, as the first argument for the first test
        REQUIREMENT: should be re-invokable without additional side-effects
          and should always return the same thing
    
      testName: [optional] string
        if present, a mocha test is created
    
      testFunction: [optional] (setupOnceFunctionResult) ->
        IN: resolved result from @setupOnceFunction
        OUT: result will be resolved and passed to any thenTest tests
     */

    function ChainedTest(setupOnceFunction1, previousTestFunction, testName1, testFunction1, shouldTap, shouldSkipIfNotSelected) {
      this.setupOnceFunction = setupOnceFunction1 != null ? setupOnceFunction1 : function() {};
      this.previousTestFunction = previousTestFunction != null ? previousTestFunction : function() {};
      this.testName = testName1;
      this.testFunction = testFunction1;
      this.shouldTap = shouldTap;
      this.shouldSkipIfNotSelected = shouldSkipIfNotSelected;
      if (this.testName) {
        test(this.testName, this.testFunction && this.setupAndTestOnceFunction);
      }
    }

    ChainedTest.getter({
      resolvedSetup: function() {
        return Promise.then(this.setupOnceFunction);
      },
      setupAndTestOnceFunction: function() {
        return this._setupAndTestOnceFunction != null ? this._setupAndTestOnceFunction : this._setupAndTestOnceFunction = (function(_this) {
          return function() {
            return _this._testOncePromise != null ? _this._testOncePromise : _this._testOncePromise = _this.testFunction ? Promise.then(_this.previousTestFunction).then(function(previousTestResult) {
              var startTime;
              startTime = currentSecond();
              return _this.resolvedSetup.then(function(setupResult) {
                return _this.testFunction(previousTestResult, setupResult);
              }).then(function(out) {
                if (_this.shouldTap) {
                  return previousTestResult;
                } else {
                  return out;
                }
              });
            }) : _this.resolvedSetup;
          };
        })(this);
      },
      setupAndTestOnceFunctionForChain: function() {
        return (function(_this) {
          return function() {
            return (_this.shouldSkipIfNotSelected ? Promise.then(_this.previousTestFunction) : _this.setupAndTestOnceFunction())["catch"](function(error) {
              if (!/failed in/.test(error.message)) {
                error.message = "(ChainedTest failed in: " + (_this.testName ? _this.testName : "setup");
                error.message += ")\n\n";
              }
              throw error;
            });
          };
        })(this);
      }
    });


    /* TODO:
      softTapTest:
        softTapTests don't get run at all if they aren't selected by Mocha to run.
    
      remove "setupOnceFunction" - there's nothing special about it, it's just the first test
        -possibly- its a tad special in that it gets the name 'setup' automatically
     */

    ChainedTest.prototype._thenTest = function(nextTestName, nextTestFunction) {
      return new ChainedTest(this.setupOnceFunction, this.setupAndTestOnceFunctionForChain, nextTestName, nextTestFunction);
    };

    ChainedTest.prototype._tapTest = function(nextTestName, nextTestFunction) {
      return new ChainedTest(this.setupOnceFunction, this.setupAndTestOnceFunctionForChain, nextTestName, nextTestFunction, true);
    };

    ChainedTest.prototype._softTapTest = function(nextTestName, nextTestFunction) {
      return new ChainedTest(this.setupOnceFunction, this.setupAndTestOnceFunctionForChain, nextTestName, nextTestFunction, true, true);
    };

    ChainedTest.prototype.thenTest = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return this._applySequence("_thenTest", compactFlatten(args));
    };

    ChainedTest.prototype.tapTest = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return this._applySequence("_tapTest", compactFlatten(args));
    };

    ChainedTest.prototype.softTapTest = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return this._applySequence("_softTapTest", compactFlatten(args));
    };

    ChainedTest.prototype._applySequence = function(applyMemberName, sequence) {
      var ct, f, i, v;
      i = 0;
      ct = this;
      while (i < sequence.length) {
        if (isString(v = sequence[i++])) {
          if (!isFunction(f = sequence[i++])) {
            log.error({
              ChainedTestError: {
                name: v,
                shouldBeFunction: f
              }
            });
            throw new Error("expecting <Function> after <String> got: " + f);
          }
          ct = ct[applyMemberName](v, f);
        } else {
          log.error({
            ChainedTestError: {
              name: {
                shouldBeString: v
              }
            }
          });
          throw new Error("expecting <String> got: " + v);
        }
      }
      return ct;
    };

    return ChainedTest;

  })(BaseClass);

}).call(this);
