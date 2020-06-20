// Generated by CoffeeScript 1.12.7
(function() {
  var AsyncExtensions, Promise, toSeconds;

  Promise = require('./Promise');

  toSeconds = require('./DateExtensions').toSeconds;

  module.exports = AsyncExtensions = (function() {
    var interval, timeout;

    function AsyncExtensions() {}

    AsyncExtensions.timeout = timeout = function(ms, f) {
      var p;
      p = new Promise(function(resolve) {
        return setTimeout(resolve, ms);
      });
      if (f != null) {
        return p.then(f);
      } else {
        return p;
      }
    };

    AsyncExtensions.timeoutAt = function(second, f) {
      return timeout((second - toSeconds()) * 1000, f);
    };

    AsyncExtensions.interval = interval = function(ms, f) {
      var intervalId, p;
      if (f == null) {
        f = function() {};
      }
      intervalId = null;
      p = new Promise(function(resolve) {
        return intervalId = setInterval(function() {
          return Promise.then(f).then(function() {
            return resolve();
          });
        }, ms);
      });
      p.stop = function() {
        if (intervalId != null) {
          return clearInterval(intervalId);
        }
      };
      return p;
    };

    AsyncExtensions.requestAnimationFrame = self.requestAnimationFrame || self.webkitRequestAnimationFrame || self.mozRequestAnimationFrame || self.oRequestAnimationFrame || self.msRequestAnimationFrame || function(f) {
      return setTimeout(f, 1000 / 60);
    };

    AsyncExtensions.nextTick = function(f) {
      return Promise.resolve().then(function() {
        return typeof f === "function" ? f() : void 0;
      });
    };

    AsyncExtensions.throwErrorOutOfStack = function(e) {
      console.log(e);
      return timeout(0, function() {
        throw e;
      });
    };

    AsyncExtensions.evalAndThrowErrorsOutOfStack = function(f) {
      var e;
      try {
        return f();
      } catch (error) {
        e = error;
        Neptune.Art.StandardLib.log.error("evalAndThrowErrorsOutOfStack", e);
        return AsyncExtensions.throwErrorOutOfStack(e);
      }
    };

    return AsyncExtensions;

  })();

}).call(this);
