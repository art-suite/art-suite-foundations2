// Generated by CoffeeScript 1.12.7
(function() {
  var CallStack, inspect, isString, parseUrl;

  isString = require('./TypesExtended').isString;

  parseUrl = require('./ParseUrl').parseUrl;

  inspect = require('./Inspect').inspect;

  module.exports = CallStack = (function() {
    var CallStackLine;

    function CallStack() {}

    CallStack.errorToString = function(error) {
      return (error != null ? error.error : void 0) || (error != null ? error.message : void 0) || (isString(error) && error) || Neptune.Art.StandardLib.formattedInspect(error);
    };

    CallStack.CallStackLine = CallStackLine = (function() {
      CallStackLine.getter = function(map) {
        var getter, prop, results;
        results = [];
        for (prop in map) {
          getter = map[prop];
          results.push(Object.defineProperty(this.prototype, prop, {
            get: getter,
            configurable: true
          }));
        }
        return results;
      };

      CallStackLine.setter = function(map) {
        var prop, results, setter;
        results = [];
        for (prop in map) {
          setter = map[prop];
          results.push(Object.defineProperty(this.prototype, prop, {
            set: setter,
            configurable: true
          }));
        }
        return results;
      };

      function CallStackLine(line) {
        this.original = line;
        this["function"] = null;
        this.source = null;
        this["class"] = null;
        this.classPath = null;
        this.sourceFileName = null;
        this.sourcePath = null;
        this.sourceHostWithPort = null;
        this.sourceLine = 0;
        this.sourceColumn = 0;
        if (this.parseLineWithFunction(line)) {

        } else {
          this.parseLineWithoutFunction(line);
        }
        this.subParseFunction();
        this.subParseSource();
      }

      CallStackLine.prototype.toString = function() {
        return this.original;
      };

      CallStackLine.getter({
        fileWithLocation: function() {
          return this._fileWithLocation || (this._fileWithLocation = this.sourceFileName ? this.sourcePath + "/" + this.sourceFileName + ":" + this.sourceLine + ":" + this.sourceColumn : this.original);
        }
      });

      CallStackLine.prototype.parseLineWithFunction = function(line) {
        var r;
        if (r = line.match(/\s*at\s((new\s)?[a-zA-Z0-9_.<>]+)\s\(([^)]*):([0-9]+):([0-9]+)\)/)) {
          this["function"] = r[1];
          this.source = r[3];
          this.sourceLine = r[4] | 0;
          return this.sourceColumn = r[5] | 0;
        }
      };

      CallStackLine.prototype.parseLineWithoutFunction = function(line) {
        var r;
        if (r = line.match(/\s*at\s([^)]*):([0-9]+):([0-9]+)/)) {
          this.source = r[1];
          this.sourceLine = r[2] | 0;
          return this.sourceColumn = r[3] | 0;
        }
      };

      CallStackLine.prototype.subParseSource = function() {
        var url;
        if (this.source) {
          url = parseUrl(this.source);
          this.sourceFileName = url.fileName;
          this.sourcePath = url.path;
          return this.sourceHostWithPort = url.hostWithPort;
        }
      };

      CallStackLine.prototype.subParseFunction = function() {
        var f;
        if (this["function"]) {
          f = this["function"].split(".");
          this["function"] = f[f.length - 1];
          if (this["function"] === "<anonymous>") {
            this["function"] = void 0;
          }
          this["class"] = f[f.length - 2];
          return this.classPath = f.slice(0, f.length - 2);
        }
      };

      return CallStackLine;

    })();

    CallStack.rawCallStack = (new Error).stack ? function(ignoreTop) {
      if (ignoreTop == null) {
        ignoreTop = 0;
      }
      return (new Error).stack.split(/\n  */).slice(ignoreTop + 2);
    } : function(ignoreTop) {
      var e;
      if (ignoreTop == null) {
        ignoreTop = 0;
      }
      try {
        throw new Error;
      } catch (error1) {
        e = error1;
        return e.stack.split(/\n  */).slice(ignoreTop + 2);
      }
    };

    CallStack.callStack = function(ignoreTop) {
      var i, len, line, ref, results;
      if (ignoreTop == null) {
        ignoreTop = 0;
      }
      ref = CallStack.rawCallStack(ignoreTop + 1);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        results.push(new CallStackLine(line));
      }
      return results;
    };

    return CallStack;

  })();

}).call(this);

//# sourceMappingURL=CallStack.js.map
