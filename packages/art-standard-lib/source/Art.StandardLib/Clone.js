// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";

  /*
  2018-07-27 SBD Notes
  
  I want to move towards:
  
    clone: is a combination of stuctural clone and calling .clone, if available. Otherwise, it doesn't do what I'm calling invasive-cloning.
      invasiveCloning: false
      customCloning: true
      recusiveSafe: fully
      Note: ArtAtomic objects have .clones that return new objects, however, ArtAtomic objects are designed to be used in a read-only way,
        so this is a waste most of the time. UNLESS you intend to modify the cloned object, which sometimes you do need to do.
        So, that's why cloneStructure is often the right answer - it won't clone non-plain-objects
  
    cloneStructure: clone only plain-object and arrays. Everything else is just a simple assignment.
      invasiveCloning: false
      customCloning: false
      recusiveSafe: stack - (See below)
  
    invasiveClone:
      invasiveCloning: false
      customCloning: false
      recusiveSafe: full
      (cloneByProperties basically did this)
      Deeply clone everything, manually cloning objects regardless if they have a .clone method.
  
  ---
  This current iteration of clone relies on some singleton variables shared across all invocations of clone.
  This is fine as long as javascript stays single-threaded.
  It also introduces a little bit of uglyness initializing clonedMap necessitating the "top" variable.
  
  FUTURE
  A potentially better solution would be to create a new closer each time clone is called at the top-most level,
  but when recursing, pass in a new function bound to that closure which is different from the global clone function.
  
  populateClone would need to take an additional argument - the clone function to use for recursive cloning.
   */
  var Clone, Map, Unique, byProperties, byStructure, clonedMap, inspect, isArray, isFunction, isPlainObject, ref, topObject, uniquePropertyName;

  Map = require("./Map");

  Unique = require('./Unique');

  inspect = require('./Inspect').inspect;

  ref = require('./Core/Types'), isPlainObject = ref.isPlainObject, isArray = ref.isArray, isFunction = ref.isFunction;

  uniquePropertyName = Unique.PropertyName;

  clonedMap = null;

  byStructure = false;

  byProperties = false;

  topObject = null;

  module.exports = Clone = (function() {
    var _clone, _cloneStructure, cloneArray, cloneByProperties, cloneByStructure, cloneObject, cloneStructure, cloneStructureFromStack, cloneStructurePush, cloneStructureToStack, cloneSturcturePop, emptyClone, isStructural;

    function Clone() {}

    cloneArray = function(array) {
      var clonedArray, index, j, len, value;
      clonedMap.set(array, clonedArray = array.slice());
      for (index = j = 0, len = clonedArray.length; j < len; index = ++j) {
        value = clonedArray[index];
        clonedArray[index] = _clone(value);
      }
      return clonedArray;
    };

    cloneObject = function(obj) {
      var clonedObject, k, v;
      clonedMap.set(obj, clonedObject = emptyClone(obj));
      if ((obj !== topObject || !byProperties) && obj.populateClone) {
        obj.populateClone(clonedObject);
      } else {
        for (k in obj) {
          v = obj[k];
          clonedObject[k] = _clone(v);
        }
      }
      return clonedObject;
    };

    Clone.emptyClone = emptyClone = function(obj) {
      if (isArray(obj)) {
        return [];
      } else {
        return Object.create(Object.getPrototypeOf(obj));
      }
    };

    Clone._clone = _clone = function(obj, mode) {
      var cloned, got;
      switch (mode) {
        case "byStructure":
          byStructure = true;
          break;
        case "byProperties":
          byProperties = true;
      }
      if (obj === null || obj === void 0 || typeof obj !== "object") {
        return obj;
      }
      if (byStructure && !(isArray(obj || isPlainObject(obj)))) {
        return obj;
      }
      if (clonedMap) {
        if (got = clonedMap.get(obj)) {
          return got;
        }
      } else {
        topObject = obj;
        clonedMap = new Map;
      }
      cloned = (function() {
        switch (false) {
          case !isFunction(obj.clone):
            return obj.clone();
          case !isArray(obj):
            return cloneArray(obj);
          case !isPlainObject(obj):
            return cloneObject(obj);
        }
      })();
      if (topObject === obj) {
        byStructure = false;
        byProperties = false;
        topObject = null;
        clonedMap = null;
      }
      return cloned;
    };

    Clone.clone = function(obj, mode) {
      if (mode != null) {
        console.error("2018-07-27: clone mode-param is DEPRICATED. Partial solution, see: cloneStructure");
      }
      return _clone(obj, mode);
    };

    Clone.cloneByProperties = cloneByProperties = function(obj) {
      console.error("2018-07-27: cloneByProperties is DEPRICATED. Partial solution, see: cloneStructure");
      return _clone(obj, "byProperties");
    };

    Clone.cloneByStructure = cloneByStructure = function(obj) {
      console.error("2018-07-27: cloneByStructure is DEPRICATED. Use: cloneStructure");
      return _clone(obj, "byStructure");
    };

    Clone.prototype.isStructural = isStructural = function(obj) {
      return isPlainObject(obj) || isArray(obj);
    };


    /*
    clones plain objects and arrays, but not any other type
    
    FEATURES
      - no allocations beyond the newly crearted object and arrays
    
    recursiveSafe: uses a stack
      This means:
        NO two objects or arrays in the output structure will be "==="
        UNLESS they were in a (grand)parent/(grand)child relationship in the source.
    
        This means if you have the same (===) object/array more than once in the structure,
        in a non (grand)parent/(grand)child way, each use will get a separate cloned output
        in the new structure. In other words
    
      This as a nice advantage: the output is JSON-compatible.
    
      This is mostly a performance optimization. It allows us to avoid any extra object allocations.
      Once we can safely use the new ES6 Map everywhere, we might perf-test again to see if full
      recursion-safety isn't just as fast.
      But then we lose JSON-compatible output guarantees...
     */

    Clone.cloneStructure = cloneStructure = function(inValue) {
      var cloningStructurePushed, isA;
      cloningStructurePushed = false;
      if (isPlainObject(inValue) || (isA = isArray(inValue))) {
        return _cloneStructure(inValue, isA);
      } else {
        return inValue;
      }
    };

    cloneStructureFromStack = [];

    cloneStructureToStack = [];

    cloneStructurePush = function(inValue, outValue) {
      cloneStructureFromStack.push(inValue);
      cloneStructureToStack.push(outValue);
      return true;
    };

    cloneSturcturePop = function() {
      cloneStructureFromStack.pop();
      return cloneStructureToStack.pop();
    };

    _cloneStructure = function(inObjOrArray, inputIsArray) {
      var i, j, k, len, outValue, pushed, v, vIsArray;
      if (0 <= (i = cloneStructureFromStack != null ? cloneStructureFromStack.indexOf(inObjOrArray) : void 0)) {
        return cloneStructureToStack[i];
      } else {
        pushed = false;
        outValue = null;
        if (inputIsArray) {
          outValue = [];
          for (j = 0, len = inObjOrArray.length; j < len; j++) {
            v = inObjOrArray[j];
            outValue.push(isPlainObject(v) || (vIsArray = isArray(v)) ? (pushed || (pushed = cloneStructurePush(inObjOrArray, outValue)), _cloneStructure(v, vIsArray)) : v);
          }
        } else {
          outValue = {};
          for (k in inObjOrArray) {
            v = inObjOrArray[k];
            outValue[k] = isPlainObject(v) || (vIsArray = isArray(v)) ? (pushed || (pushed = cloneStructurePush(inObjOrArray, outValue)), _cloneStructure(v, vIsArray)) : v;
          }
        }
        if (pushed) {
          cloneSturcturePop();
        }
        return outValue;
      }
    };

    return Clone;

  })();

}).call(this);
