// Generated by CoffeeScript 1.12.7
(function() {
  var InspectedObjects, dateFormat, deepMap, escapeJavascriptString, inspectedObjectLiteral, isClass, isDate, isFunction, isNonNegativeInt, isPlainArray, isPlainObject, isPromise, isRegExp, isString, isTypedArray, ref;

  ref = require('../TypesExtended'), isTypedArray = ref.isTypedArray, isDate = ref.isDate, deepMap = ref.deepMap, isNonNegativeInt = ref.isNonNegativeInt, isClass = ref.isClass, isPlainArray = ref.isPlainArray, isPlainObject = ref.isPlainObject, isString = ref.isString, isFunction = ref.isFunction, isPromise = ref.isPromise, isRegExp = ref.isRegExp;

  escapeJavascriptString = require('../StringExtensions').escapeJavascriptString;

  inspectedObjectLiteral = require('./InspectedObjectLiteral').inspectedObjectLiteral;

  dateFormat = require('dateformat');

  module.exports = InspectedObjects = (function() {
    var toInspectedObjects;

    function InspectedObjects() {}

    InspectedObjects.toInspectedObjects = toInspectedObjects = function(m) {
      var functionString, literal, oldm, out, reducedFunctionString;
      if (m == null) {
        return m;
      }
      oldm = m;
      if (m === global) {
        return inspectedObjectLiteral("global");
      } else if (out = typeof m.getInspectedObjects === "function" ? m.getInspectedObjects() : void 0) {
        return out;
      } else if (isPromise(m)) {
        return inspectedObjectLiteral("Promise");
      } else if (isPlainObject(m) || isPlainArray(m)) {
        return deepMap(m, function(v) {
          return toInspectedObjects(v);
        });
      } else if (isTypedArray(m)) {
        return m;
      } else if (m instanceof Error) {
        literal = inspectedObjectLiteral(m.stack || m.toString(), true);
        if (m.info) {
          return toInspectedObjects({
            Error: {
              info: m.info,
              stack: literal
            }
          });
        } else {
          return {
            Error: {
              "class": toInspectedObjects(m.constructor),
              stack: literal
            }
          };
        }
      } else if (isRegExp(m)) {
        return inspectedObjectLiteral("" + m);
      } else if (isDate(m)) {
        return inspectedObjectLiteral(dateFormat(m, "UTC:yyyy-mm-dd HH:MM:ss Z"));
      } else if (isClass(m)) {
        return inspectedObjectLiteral("class " + ((typeof m.getName === "function" ? m.getName() : void 0) || m.name));
      } else if (isFunction(m)) {
        functionString = "" + m;
        reducedFunctionString = functionString.replace(/\s+/g, ' ').replace(/^function (\([^)]*\))/, "$1 ->").replace(/^\(\)\s*/, '');
        return inspectedObjectLiteral(reducedFunctionString.length < 80 ? reducedFunctionString : functionString.slice(0, 5 * 80));
      } else if (m && !isString(m)) {
        if (isNonNegativeInt(m.length)) {
          return inspectedObjectLiteral("{" + m.constructor.name + " length: " + m.length + "}");
        } else if (isNonNegativeInt(m.byteLength)) {
          return inspectedObjectLiteral("{" + m.constructor.name + " byteLength: " + m.byteLength + "}");
        } else {
          return m;
        }
      } else {
        return m;
      }
    };

    return InspectedObjects;

  })();

}).call(this);
