// Generated by CoffeeScript 1.12.7
(function() {
  var Inspector, Map, escapeJavascriptString, isArray, isBrowserObject, isClass, isFunction, isObject, isPlainArray, isPlainObject, isString, objectName, ref,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Map = require("../Map");

  escapeJavascriptString = require('../StringExtensions').escapeJavascriptString;

  ref = require('../TypesExtended'), objectName = ref.objectName, isString = ref.isString, isArray = ref.isArray, isFunction = ref.isFunction, isObject = ref.isObject, isClass = ref.isClass, isBrowserObject = ref.isBrowserObject, isPlainObject = ref.isPlainObject, isPlainArray = ref.isPlainArray;

  module.exports = Inspector = (function() {
    var inspect;

    Inspector.unquotablePropertyRegex = /^([0-9]+|[_a-zA-Z][_0-9a-zA-Z]*)$/;

    Inspector.customInspectable = function(obj) {
      return obj.inspect && !(typeof obj === "function");
    };

    Inspector.parentString = function(distance) {
      switch (distance) {
        case 0:
          return "parent";
        case 1:
          return "grandparent";
        case 2:
          return "great grandparent";
        default:
          return "great^" + (distance - 1) + " grandparent";
      }
    };

    function Inspector(options) {
      if (options == null) {
        options = {};
      }
      this.inspect = bind(this.inspect, this);
      this.inspectInternal = bind(this.inspectInternal, this);
      this.inspectObject = bind(this.inspectObject, this);
      this.inspectArray = bind(this.inspectArray, this);
      this.maxLength = options.maxLength || 10000;
      this.allowCustomInspectors = !options.noCustomInspectors;
      this.maxDepth = options.maxDepth != null ? options.maxDepth : 10;
      this.outArray = [];
      this.length = 0;
      this.depth = 0;
      this.inspectingMap = new Map;
      this.done = false;
    }

    Inspector.inspect = inspect = function(obj, options) {
      var inspector;
      if (options == null) {
        options = {};
      }
      if (this && this !== global) {
        return Neptune.Base.inspect.call(this);
      }
      inspector = new Inspector(options);
      inspector.inspect(obj);
      return inspector.getResult();
    };

    Inspector.shallowInspect = function(obj) {
      if (obj == null) {
        return "" + obj;
      } else if (Inspector.customInspectable(obj)) {
        return Inspector.inspect(obj);
      } else if (isString(obj)) {
        return escapeJavascriptString(obj);
      } else if (isArray(obj)) {
        return "<<Array length: " + obj.length + ">>";
      } else if (isFunction(obj) && obj.name === "") {
        return "<<function args: " + obj.length + ">>";
      } else {
        return "<<" + (typeof obj) + ": " + (obj.name || obj) + ">>";
      }
    };

    Inspector.inspectLean = function(object, options) {
      var fullInspect, match;
      fullInspect = inspect(object, options);
      if (!isFunction(object != null ? object.inspect : void 0) && (isPlainObject(object) || (isPlainArray(object) && (object.length > 1 || (options != null ? options.forArgs : void 0))))) {
        match = fullInspect.match(/^\[(.+)\]$|^\{(.+)\}$/);
        if (match) {
          return match[1] || match[2] || match[3];
        } else {
          return fullInspect;
        }
      } else {
        return fullInspect;
      }
    };

    Inspector.prototype.put = function(s) {
      var remaining;
      if (this.done) {
        return;
      }
      if (this.length + s.length > this.maxLength) {
        this.done = true;
        remaining = this.maxLength - this.length;
        s = (s.slice(0, remaining)) + "<... first " + remaining + "/" + s.length + ">";
      }
      this.length += s.length;
      this.outArray.push(s);
      return s;
    };

    Inspector.prototype.getResult = function() {
      return this.outArray.join("");
    };

    Inspector.prototype.maxDepthOutput = function(obj) {
      var keys, name;
      switch (typeof obj) {
        case "string":
        case "number":
        case "boolean":
        case "undefined":
          return this.inspectInternal(obj);
        case "function":
          return this.put(objectName(obj));
        case "object":
          return this.put(obj === null ? "null" : isArray(obj) ? "[" + obj.length + " elements]" : (keys = Object.keys(obj), name = objectName(obj), name === "Object" ? "{" + keys.length + " keys}" : keys.length > 0 ? "{" + name + " " + keys.length + " keys}" : name));
      }
    };

    Inspector.prototype.inspectArray = function(array) {
      var first, i, len, obj;
      this.put("[");
      first = true;
      for (i = 0, len = array.length; i < len; i++) {
        obj = array[i];
        if (!first) {
          this.put(", ");
        }
        this.inspect(obj);
        first = false;
      }
      return this.put("]");
    };

    Inspector.prototype.inspectObject = function(obj) {
      var attributes, first, i, k, keys, len, name, v;
      attributes = [];
      keys = Object.keys(obj);
      name = objectName(obj);
      if (isFunction(obj) && keys.length === 0) {
        return this.put(name + "()");
      } else if (isBrowserObject(obj)) {
        return this.put("{" + name + "}");
      } else {
        this.put("{");
        if (obj.constructor !== Object) {
          this.put(name + " ");
        }
        first = true;
        for (i = 0, len = keys.length; i < len; i++) {
          k = keys[i];
          if (!(k !== "__uniqueId")) {
            continue;
          }
          if (!first) {
            this.put(", ");
          }
          v = obj[k];
          if (Inspector.unquotablePropertyRegex.test(k)) {
            this.put(k);
          } else {
            this.inspect(k);
          }
          this.put(": ");
          this.inspect(v);
          first = false;
        }
        return this.put("}");
      }
    };

    Inspector.prototype.inspectInternal = function(obj) {
      if (obj == null) {
        return this.put("" + obj);
      } else if (isString(obj)) {
        return this.put(escapeJavascriptString(obj));
      } else if (isArray(obj)) {
        return this.inspectArray(obj);
      } else if (isClass(obj)) {
        return this.put(objectName(obj));
      } else if (this.allowCustomInspectors && Inspector.customInspectable(obj)) {
        if (obj.inspect.length > 0) {
          return obj.inspect(this);
        } else {
          return this.put(obj.inspect());
        }
      } else if (obj instanceof RegExp) {
        return this.put("" + obj);
      } else if (isObject(obj) || isFunction(obj)) {
        return this.inspectObject(obj);
      } else if (isFunction(obj != null ? obj.toString : void 0)) {
        return this.put(obj.toString());
      } else {
        return this.put("" + obj);
      }
    };

    Inspector.prototype.inspect = function(obj) {
      var objDepth;
      if (this.done) {
        return;
      }
      if (objDepth = this.inspectingMap.get(obj)) {
        this.put("<" + (Inspector.parentString(this.depth - objDepth)) + ">");
        return null;
      }
      if (this.depth >= this.maxDepth) {
        this.maxDepthOutput(obj);
      } else {
        this.depth++;
        this.inspectingMap.set(obj, this.depth);
        this.inspectInternal(obj);
        this.inspectingMap["delete"](obj);
        this.depth--;
      }
      return null;
    };

    return Inspector;

  })();

}).call(this);

//# sourceMappingURL=Inspector.js.map
