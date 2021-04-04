// Generated by CoffeeScript 1.12.7
(function() {
  var BlueBirdPromise, ErrorWithInfo, Promise, deepEach, deepMap, defineModule, getEnv, isFunction, isPlainObject, isPromise, namespace, promiseDebug, ref,
    slice = [].slice;

  Promise = BlueBirdPromise = require('bluebird/js/browser/bluebird.core.min');

  ref = require('./TypesExtended'), deepMap = ref.deepMap, deepEach = ref.deepEach, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject;

  defineModule = require('./CommonJs').defineModule;

  getEnv = require('./Environment').getEnv;

  namespace = require('./namespace');

  if (promiseDebug = getEnv().artPromiseDebug) {
    console.log("Art.StandardLib.Promise: BlueBirdPromise debug ENABLED");
  }

  BlueBirdPromise.config({
    warnings: promiseDebug,
    longStackTraces: promiseDebug,
    cancellation: promiseDebug,
    monitoring: promiseDebug
  });

  isPromise = require('./Core/Types').isPromise;

  ErrorWithInfo = require("./ErrorWithInfo");


  /*
  ArtPromise extends ES6 Promises in the following ways:
  
  - constructing a promise with no parameters is allowed
  - promise.resolve and promise.reject are supported as
    alternative ways to resolve or reject a promise
  
  If native promises are supported, they are used,
  otherwise a polyfill is used.
  
  TODO:
    ES6 says Promises are designed to be extensible:
    http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects
  
    If I properly extend Promise, will my new methods be available on all promise objects... ???
      At least all promises chained off of one created using my Promise class... ???
  
    But I had problems doing that. Maybe it's how CoffeeScript extends things?
  
  TODO:
    I want a way to do 'then' and 'catch' without effecting any following 'thens' or 'caches'
  
    It's easy to implement, but what to call it? Leaning towards tapThen. If I had Ruby's 'tap', then
    I could do this effectively with:
  
      .tap (a) -> a.then ->
      but
      .tapThen ->
      is even nicer
  
    Will it be available on returned promises?
      (see ES6 Promise extension above)
  
    tapThen: (successF, failF) ->
      @then successF, failF
      @ # return the current promise, not the one returned from the then-call above
   */

  defineModule(module, function() {
    var ArtPromise, k, v;
    ArtPromise = (function() {
      var deepAll, logPromiseProblems, noop;

      function ArtPromise() {}

      ArtPromise.isPromise = isPromise;

      ArtPromise.testPromise = function(promise) {
        promise.then(function(v) {
          return console.log("promise.resolve", v);
        });
        return promise["catch"](function(v) {
          return console.log("promise.reject", v);
        });
      };

      ArtPromise.mapAll = function(map) {
        var key, keys;
        keys = Object.keys(map);
        return Promise.all((function() {
          var j, len, results;
          results = [];
          for (j = 0, len = keys.length; j < len; j++) {
            key = keys[j];
            results.push(map[key]);
          }
          return results;
        })()).then(function(values) {
          var i, j, key, len, out;
          out = {};
          for (i = j = 0, len = keys.length; j < len; i = ++j) {
            key = keys[i];
            out[key] = values[i];
          }
          return out;
        });
      };

      ArtPromise.containsPromises = function(plainStructure) {
        var containsPromises;
        containsPromises = false;
        deepEach(plainStructure, function(v) {
          return containsPromises || (containsPromises = isPromise(v));
        });
        return containsPromises;
      };


      /*
      For use with Node-style callbacks:
        IN: (error, data) ->
          error: null or set if there was an error
          data: set if error is null
      
      Example:
        Promise.withCallback (callback) ->
          doAsyncStuff -> callback()
       */

      ArtPromise.withCallback = function(startPromiseBodyFunction) {
        return new BlueBirdPromise(function(resolve, reject) {
          var callback;
          callback = function(err, data) {
            if (err) {
              return reject(new Error(err));
            }
            return resolve(data);
          };
          return startPromiseBodyFunction(callback);
        });
      };

      ArtPromise.newExternallyResolvable = function() {
        var out, p;
        out = {};
        p = new BlueBirdPromise(function(resolve, reject) {
          out.resolve = resolve;
          return out.reject = reject;
        });
        p.resolve = out.resolve;
        p.reject = out.reject;
        return p;
      };

      noop = function(a) {
        return a;
      };

      ArtPromise.deepAll = deepAll = function(plainStructure, resolvedResultPreprocessor) {
        var promises;
        if (resolvedResultPreprocessor == null) {
          resolvedResultPreprocessor = noop;
        }
        promises = [];
        deepEach(plainStructure, function(v) {
          if (isPromise(v)) {
            return promises.push(v);
          }
        });
        return Promise.all(promises).then(function(resolved) {
          var i;
          i = 0;
          return deepMap(plainStructure, function(v) {
            if (isPromise(v)) {
              return resolvedResultPreprocessor(resolved[i++]);
            } else {
              return v;
            }
          });
        });
      };

      ArtPromise.deepResolve = deepAll;


      /*
      Serializer makes it easy to ensure promise-returning functions are invoked in order, after each
      promise is resolved.
      
      USAGE:
      
         * EXAMPLE 1: Basic - not too different from normal Promise sequences
        serializer = new ArtPromise.Serializer
        serializer.then -> doA()
      
         * then execute sometime later, possbly asynchronously:
        serializer.then -> doB()
      
         * then execute sometime later, possbly asynchronously:
        serializer.then (doBResult) ->
           * doA and doB have completed and any returning promises resolved
           * the result of the last 'then' is passed in
      
         * EXAMPLE 2: apply the same async function serially to each element in list
         * - list's order is preserved
         * - each invocation waits for the previous one to complete
        serializer = new ArtPromise.Serializer
        list.forEach serializer.serialize f = (element) -> # do something with element, possibly returning a promise
        serializer.then (lastFResult) ->
           * do something after the last invocation of f completes
           * the result of the last invocation of 'f' is passed in
      
         * EXAMPLE 3: mix multiple serialized functions and manual @then invocations
         * - invocation order is perserved
        serializer = new ArtPromise.Serializer
        serializedA = serializer.serialize aFunction
        serializedB = serializer.serialize bFunction
      
        serializedB()
        serializer.then -> @cFunction()
        serializedB()
        serializedA()
        serializedB()
      
        serializer.then (lastBFunctionResult) ->
           * this is invoked AFTER:
           * evaluating, in order, waiting for any promises:
           *   bFunction, cFunction, bFunction, aFunction, bFunction
       */

      ArtPromise.Serializer = (function() {
        function Serializer() {
          this._lastPromise = BlueBirdPromise.resolve();
        }


        /*
        Returns a new function, serializedF, that acts just like 'f'
          - f is forced to be async:
            - if f doesn't return a promise, a promise wrapping f's result is returned
          - invoking serializedF queues f in this serializer instance's sequence via @then
        IN: any function with any signature
        OUT: (f's signature) -> promise.then (fResult) ->
        
        Example with Comparison:
        
           * all asyncActionReturningPromise(element)s get called immediately
           * and may complete randomly at some later event
          myArray.forEach (element) ->
            asyncActionReturningPromise element
        
           * VS
        
           * asyncActionReturningPromise(element) only gets called
           * after the previous call completes.
           * If a previous call failes, the remaining calls never happen.
          serializer = new Promise.Serializer
          myArray.forEach serializer.serialize (element) ->
            asyncActionReturningPromise element
        
           * bonus, you can do things when all the promises complete:
          serializer.then =>
        
           * or if anything fails
          serializer.catch =>
        
           * VS - shortcut
        
           * Just insert "Promise.serialize" before your forEach function to ensure serial invocations.
           * However, you don't get the full functionality of the previous example.
          myArray.forEach Promise.serialize (element) ->
            asyncActionReturningPromise element
         */

        Serializer.prototype.serialize = function(f) {
          return (function(_this) {
            return function() {
              var args;
              args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
              return _this.then(function() {
                return f.apply(null, args);
              });
            };
          })(this);
        };

        Serializer.prototype.then = function(resolved, rejected) {
          return this._lastPromise = this._lastPromise.then(resolved, rejected);
        };

        Serializer.prototype["catch"] = function(rejected) {
          return this._lastPromise = this._lastPromise["catch"](rejected);
        };

        Serializer.prototype.always = function(f) {
          return this._lastPromise = this._lastPromise["catch"]((function(_this) {
            return function() {
              return null;
            };
          })(this)).then(f);
        };


        /*
        OUT: promise that resolves / rejects only when there are no more
          pending tasks queued with the serializer.
        
          .then (lastResult) ->
          .catch (lastError) ->
        
        NOTE: allDonePromise could complete, then more tasks could be queued with the serializer.
          Promises can't be resolved/rejected twice, so when the more-tasks complete, the first
          allDonePromise won't do anything.
          However, you can call allDonePromise again once the tasks are queued and get notified
          when THEY are done.
         */

        Serializer.prototype.allDonePromise = function() {
          var currentLastPromise;
          currentLastPromise = this._lastPromise;
          return currentLastPromise.then((function(_this) {
            return function(lastResult) {
              if (currentLastPromise === _this._lastPromise) {
                return lastResult;
              } else {
                return _this.allDonePromise();
              }
            };
          })(this))["catch"]((function(_this) {
            return function(lastError) {
              if (currentLastPromise === _this._lastPromise) {
                throw lastError;
              } else {
                return _this.allDonePromise();
              }
            };
          })(this));
        };

        return Serializer;

      })();


      /*
      OUT: serializedF = -> Promise.resolve f args...
        IN: any args
        EFFECT: f is invoked with args passed in AFTER the last invocation of serializedF completes.
        OUT: promise.then -> results from f
      
      NOTE: 'f' can return a promise, but it doesn't have to. If it does return a promise, the next
        'f' invocation will not start until and if the previous one's promise completes.
      
      USAGE:
        serializedF = Promise.serialize f = -> # do something, possibly returning a promise
        serializedF()
        serializedF()
        serializedF()
        .then (resultOfLastF)->
           * executed after f was executed and any returned promises resolved, 3 times, sequentially
      
      OR
        serializedF = Promise.serialize f = (element) -> # do something with element, possibly returning a promise
        Promise.all (serializedF item for item in list)
        .then (results) ->
           * f was excuted list.length times sequentially
           * results contains the result values from each execution, in order
       */

      ArtPromise.serialize = function(f) {
        return new ArtPromise.Serializer().serialize(f);
      };

      ArtPromise.logPromise = function(context, p) {
        var currentSecond, log, startTime;
        if (p == null) {
          p = context;
          context = "(context not specified)";
        }
        log = namespace.log, currentSecond = namespace.currentSecond;
        log({
          logPromise_start: context
        });
        startTime = currentSecond();
        return Promise.then(function() {
          if (isFunction(p)) {
            return p();
          } else {
            return p;
          }
        }).tap(function(result) {
          return log({
            logPromise_success: {
              context: context,
              result: result,
              seconds: currentSecond() - startTime
            }
          });
        }).tapCatch(function(error) {
          return log.error({
            logPromise_error: {
              context: context,
              error: error,
              seconds: currentSecond() - startTime
            }
          });
        });
      };

      ArtPromise.logPromiseProblems = logPromiseProblems = function(context, p) {
        var currentSecond, log, startTime;
        log = namespace.log, currentSecond = namespace.currentSecond;
        startTime = currentSecond();
        return Promise.then(function() {
          if (isFunction(p)) {
            return p();
          } else {
            return p;
          }
        }).tapCatch(function(error) {
          return log.error({
            logRejectedPromises: {
              context: context,
              error: error,
              seconds: currentSecond() - startTime
            }
          });
        });
      };

      ArtPromise.logPromiseErrors = logPromiseProblems;

      ArtPromise.logRejectedPromises = logPromiseProblems;

      ArtPromise.invert = function(promise) {
        return promise.then(function(e) {
          throw new ErrorWithInfo("" + e, e);
        }, function(v) {
          return v;
        });
      };

      ArtPromise["finally"] = function(promise, action) {
        return BlueBirdPromise.resolve(promise)["finally"](action);
      };

      ArtPromise.then = BlueBirdPromise["try"];

      return ArtPromise;

    })();
    for (k in ArtPromise) {
      v = ArtPromise[k];
      BlueBirdPromise[k] || (BlueBirdPromise[k] = v);
    }
    return BlueBirdPromise;
  });

}).call(this);

//# sourceMappingURL=Promise.js.map
