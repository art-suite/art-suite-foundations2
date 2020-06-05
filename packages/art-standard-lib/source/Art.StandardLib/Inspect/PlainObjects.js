// Generated by CoffeeScript 1.12.7
(function() {
  var PlainObjects, deepMap, hasKeys, inspectedObjectLiteral, isClass, isFunction, isPlainArray, isPlainObject, ref;

  ref = require('../TypesExtended'), deepMap = ref.deepMap, hasKeys = ref.hasKeys, isPlainArray = ref.isPlainArray, isPlainObject = ref.isPlainObject, isFunction = ref.isFunction, isClass = ref.isClass;

  inspectedObjectLiteral = require('./InspectedObjectLiteral').inspectedObjectLiteral;

  module.exports = PlainObjects = (function() {
    var toPlainObjects;

    function PlainObjects() {}

    PlainObjects.toPlainObjects = toPlainObjects = function(m) {
      var functionString, oldm, out, reducedFunctionString;
      if (m == null) {
        return m;
      }
      oldm = m;
      if (out = typeof m.getPlainObjects === "function" ? m.getPlainObjects() : void 0) {
        return out;
      } else if (isPlainObject(m) || isPlainArray(m)) {
        return deepMap(m, function(v) {
          return toPlainObjects(v);
        });
      } else if (isClass(m)) {
        return inspectedObjectLiteral("<" + (m.getName()) + ">");
      } else if (isFunction(m)) {
        functionString = "" + m;
        reducedFunctionString = functionString.replace(/\s+/g, ' ').replace(/^function (\([^)]*\))/, "$1 ->").replace(/^\(\)\s*/, '');
        return inspectedObjectLiteral(reducedFunctionString.length < 80 ? reducedFunctionString : functionString.slice(0, 5 * 80));
      } else {
        return m;
      }
    };

    return PlainObjects;

  })();

}).call(this);
