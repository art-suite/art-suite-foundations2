// Generated by CoffeeScript 1.12.7
(function() {
  var Eq, floatTrue0, isDate, isNumber, isString, min, objectKeyCount, ref, remove,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  remove = require('./ArrayExtensions').remove;

  objectKeyCount = require('./ObjectExtensions').objectKeyCount;

  floatTrue0 = require('./MathExtensions').floatTrue0;

  ref = require('./TypesExtended'), isString = ref.isString, isNumber = ref.isNumber;

  isDate = require('./Core/Types').isDate;

  min = Math.min;

  module.exports = Eq = (function() {
    var _plainObjectsDeepEq, compareStack, plainObjectsDeepDiff;

    function Eq() {}


    /*
    IN: see @compare
    OUT:
      true: if a and b are structurally equal
      false: otherwise
     */

    Eq.eq = function(a, b, compareFunctionsAsStrings) {
      return a === b || 0 === Eq.compare(a, b, true, compareFunctionsAsStrings);
    };

    Eq.neq = function(a, b, compareFunctionsAsStrings) {
      if (a === b) {
        return false;
      } else {
        return 0 !== Eq.compare(a, b, true, compareFunctionsAsStrings);
      }
    };

    Eq.fastEq = function(a, b) {
      return a === b || 0 === Eq.compare(a, b, false);
    };

    Eq.fastNeq = function(a, b) {
      if (a === b) {
        return false;
      } else {
        return 0 !== Eq.compare(a, b, false);
      }
    };

    Eq._compareArray = function(a, b, recursionBlockArray, compareFunctionsAsStrings) {
      var aLength, av, bLength, bv, i, j, ref1, val;
      aLength = a.length;
      bLength = b.length;
      for (i = j = 0, ref1 = Math.min(aLength, bLength); j < ref1; i = j += 1) {
        av = a[i];
        bv = b[i];
        if (0 !== (val = Eq._compare(av, bv, recursionBlockArray, compareFunctionsAsStrings))) {
          return val;
        }
      }
      return aLength - bLength;
    };

    Eq._compareObject = function(a, b, recursionBlockArray, compareFunctionsAsStrings) {
      var aLength, av, bv, compared, k, val;
      aLength = 0;
      compared = 0;
      for (k in a) {
        av = a[k];
        aLength++;
        av = a[k];
        bv = b[k];
        if (bv !== void 0 || b.hasOwnProperty(k)) {
          compared++;
          if (0 !== (val = Eq._compare(av, bv, recursionBlockArray, compareFunctionsAsStrings))) {
            return val;
          }
        }
      }
      if (aLength === compared && compared === objectKeyCount(b)) {
        return 0;
      } else {
        return 0/0;
      }
    };


    /*
    compare is recursive. However, it only recurses for 'plain' objects and arrays.
    
    If you want to compare custom objects deeply, you must add an .eq or .compare function to your custom objects.
      signature: a.eq b, recursionBlockArray => truthy if a equals b
      signature: a.compare b, recursionBlockArray => NaN / <0 / 0 / >0 for incomparable / a<b / a==b / a>b respectively
      IN:
        a: => this/@
        b: compared with a
        recursionBlockArray: an array of objects already on the stack being tested, pass this to
      It is an array of every object recursively currently being tested - don't test an object in this array
      recursionBlockArray can be altered, but should be returned in its original state. It may be null.
    
    IN:
      a and b: compare a and b
      recursionBlockEnabled:
        truthy: recursive structures will be handled correctly
        falsey: (default) faster, but recursive structures result in infinite recursion
    OUT:
      NaN:
        a and b are different types
        a and b are otherwise not comparable
    
      <0: a < b
      0:  a == b
      >0: a > b
    
    TODO:
      recursionBlockArray could be reused.
      Further, depth == 1 checks could be safely skipped to make
      even slow-compare fast for simple objects. Only if we
      have an object/array inside another object/array do we need
      to start checking.
     */

    Eq.compare = function(a, b, recursionBlockEnabled, compareFunctionsAsStrings) {
      return Eq._compare(a, b, recursionBlockEnabled && [], compareFunctionsAsStrings);
    };

    Eq._compare = function(a, b, recursionBlockArray, compareFunctionsAsStrings) {
      var _constructor;
      if (a === b) {
        return 0;
      }
      if ((a != null) && (b != null) && a.constructor === (_constructor = b.constructor)) {
        if (isString(a)) {
          return a.localeCompare(b);
        }
        if (isNumber(a) || isDate(a)) {
          return floatTrue0(a - b);
        }
        if (recursionBlockArray) {
          if (indexOf.call(recursionBlockArray, a) >= 0 || indexOf.call(recursionBlockArray, b) >= 0) {
            return 0;
          }
          recursionBlockArray.push(a);
          recursionBlockArray.push(b);
        }
        if (a.compare) {
          return a.compare(b, recursionBlockArray);
        }
        if (_constructor === Array) {
          return Eq._compareArray(a, b, recursionBlockArray, compareFunctionsAsStrings);
        }
        if (_constructor === Object) {
          return Eq._compareObject(a, b, recursionBlockArray, compareFunctionsAsStrings);
        }
        if (compareFunctionsAsStrings && _constructor === Function) {
          return ("" + a).localeCompare("" + b);
        }
        if (a.eq && a.eq(b, recursionBlockArray)) {
          return 0;
        }
        if (recursionBlockArray) {
          remove(recursionBlockArray, recursionBlockArray.length - 2, 2);
        }
      }
      return 0/0;
    };

    Eq.plainObjectsDeepEqArray = function(a, b) {
      var av, i, j, len1;
      if (a.length !== b.length) {
        return false;
      }
      for (i = j = 0, len1 = a.length; j < len1; i = ++j) {
        av = a[i];
        if (!_plainObjectsDeepEq(av, b[i])) {
          return false;
        }
      }
      return true;
    };

    Eq.plainObjectsDeepEqObject = function(a, b) {
      var aLength, av, bv, k;
      aLength = 0;
      for (k in a) {
        av = a[k];
        aLength++;
        bv = b[k];
        if (!((bv !== void 0 || b.hasOwnProperty(k)) && _plainObjectsDeepEq(av, bv))) {
          return false;
        }
      }
      return aLength === objectKeyCount(b);
    };

    compareStack = [];

    Eq.plainObjectsDeepEq = function(a, b) {
      try {
        return _plainObjectsDeepEq(a, b);
      } finally {
        compareStack = [];
      }
    };

    _plainObjectsDeepEq = function(a, b) {
      var _constructor, _isA, _isB;
      if (a === b) {
        return true;
      } else if ((indexOf.call(compareStack, a) >= 0) || (indexOf.call(compareStack, b) >= 0)) {
        return false;
      } else if (a && b && a.constructor === (_constructor = b.constructor)) {
        if (a.eq || (_isA = _constructor === Array) || (_isB = _constructor === Object)) {
          try {
            compareStack.push(a);
            compareStack.push(b);
            switch (false) {
              case !_isA:
                return Eq.plainObjectsDeepEqArray(a, b);
              case !_isB:
                return Eq.plainObjectsDeepEqObject(a, b);
              default:
                return a.eq(b);
            }
          } finally {
            compareStack.pop();
            compareStack.pop();
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    Eq.propsEq = Eq.plainObjectsDeepEq;

    Eq.plainObjectsDeepDiffArray = function(before, after) {
      var diff, i, j, l, len, m, ref1, ref2, ref3, ref4, ref5, res;
      res = null;
      len = min(before.length, after.length);
      for (i = j = 0, ref1 = len; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
        if (!(diff = plainObjectsDeepDiff(before[i], after[i]))) {
          continue;
        }
        res || (res = {});
        res[i] = diff;
      }
      if (len < before.length) {
        for (i = l = ref2 = len, ref3 = before.length; ref2 <= ref3 ? l < ref3 : l > ref3; i = ref2 <= ref3 ? ++l : --l) {
          res || (res = {});
          res[i] = {
            removed: before[i]
          };
        }
      }
      if (len < after.length) {
        for (i = m = ref4 = len, ref5 = after.length; ref4 <= ref5 ? m < ref5 : m > ref5; i = ref4 <= ref5 ? ++m : --m) {
          res || (res = {});
          res[i] = {
            added: after[i]
          };
        }
      }
      return res;
    };

    Eq.plainObjectsDeepDiffObject = function(before, after) {
      var afterV, beforeV, diff, k, res;
      res = null;
      for (k in before) {
        beforeV = before[k];
        if (after.hasOwnProperty(k)) {
          if (diff = plainObjectsDeepDiff(beforeV, after[k])) {
            res || (res = {});
            res[k] = diff;
          }
        } else {
          res || (res = {});
          res[k] = {
            removed: beforeV
          };
        }
      }
      for (k in after) {
        afterV = after[k];
        if (!(!before.hasOwnProperty(k))) {
          continue;
        }
        res || (res = {});
        res[k] = {
          added: afterV
        };
      }
      return res;
    };

    Eq.plainObjectsDeepDiff = plainObjectsDeepDiff = function(before, after) {
      var _constructor;
      if (before === after) {
        return null;
      } else if (before && after && before.constructor === (_constructor = after.constructor)) {
        if (before.eq) {
          if (before.eq(after)) {
            return null;
          } else {
            return {
              before: before,
              after: after
            };
          }
        } else if (_constructor === Array) {
          return Eq.plainObjectsDeepDiffArray(before, after);
        } else if (_constructor === Object) {
          return Eq.plainObjectsDeepDiffObject(before, after);
        } else {
          return {
            before: before,
            after: after
          };
        }
      } else {
        return {
          before: before,
          after: after
        };
      }
    };

    Eq.diff = plainObjectsDeepDiff;

    Eq.shallowEq = function(a, b) {
      return a === b || (a && b && a.eq && a.eq(b));
    };

    return Eq;

  })();

}).call(this);

//# sourceMappingURL=Eq.js.map
