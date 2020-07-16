// Generated by CoffeeScript 1.12.7
(function() {
  var Chai, Promise, StandardLib, Types, addTester, array, assert, compact, compactFlatten, compactFlattenJoin, each, eq, escapeRegExp, failWithExpectedMessage, floatEq, formattedInspect, getTesterFor, i, indent, inspect, inspectLean, inspectedObjectLiteral, isFunction, isPlainArray, isPlainObject, isString, k, len, log, lowerCamelCase, name, notMatch, object, objectHasKeys, present, ref, ref1, ref2, ref3, statuses, tester, v, w,
    slice = [].slice;

  assert = (Chai = require('chai')).assert;

  ref = StandardLib = require('art-standard-lib'), log = ref.log, eq = ref.eq, inspect = ref.inspect, formattedInspect = ref.formattedInspect, floatEq = ref.floatEq, compactFlatten = ref.compactFlatten, escapeRegExp = ref.escapeRegExp, isString = ref.isString, compact = ref.compact, Types = ref.Types, object = ref.object, inspectedObjectLiteral = ref.inspectedObjectLiteral, compactFlattenJoin = ref.compactFlattenJoin, isFunction = ref.isFunction, inspectLean = ref.inspectLean, isPlainArray = ref.isPlainArray, Promise = ref.Promise, present = ref.present, objectHasKeys = ref.objectHasKeys, isPlainObject = ref.isPlainObject, lowerCamelCase = ref.lowerCamelCase, array = ref.array, each = ref.each, w = ref.w;

  ref1 = require('./Presentation'), failWithExpectedMessage = ref1.failWithExpectedMessage, indent = ref1.indent;

  ref2 = require('./ArtChaiLib'), getTesterFor = ref2.getTesterFor, addTester = ref2.addTester;

  assert = (module.exports = Chai).assert;

  assert.rejectsWithStatus = function(status, promise, context) {
    return assert.rejects(promise, context).then(function(error) {
      return assert.selectedEq({
        status: status
      }, error, context);
    });
  };

  assert.rejectsWith = function(promise, rejectValue, context) {
    log.error("DEPRICATED: assert.rejectsWith. Use: assert.rejects().then (rejectValue) -> assert.eq rejectValue, expectedRejectValue");
    return assert.rejects(promise).then(function(value) {
      return assert.eq(value, rejectValue, "rejects with: " + context);
    });
  };

  for (name in Types) {
    tester = Types[name];
    if (name.match(/^is/)) {
      addTester(name, tester);
    }
  }

  ref3 = w("gt gte lte lt eq neq floatEq");
  for (i = 0, len = ref3.length; i < len; i++) {
    name = ref3[i];
    addTester(name, StandardLib[name]);
  }

  addTester("instanceof", {
    customFailure: function(name, v1, v2, context) {
      return failWithExpectedMessage(context, v2, name, v1);
    }
  }, function(klass, obj) {
    return obj instanceof klass;
  });

  addTester("match", function(a, b) {
    return a.match(isString(b) ? escapeRegExp(b) : b);
  });

  addTester("notMatch", notMatch = function(a, b) {
    return !a.match(isString(b) ? escapeRegExp(b) : b);
  });

  addTester("doesNotMatch", notMatch);

  addTester("same", function(a, b) {
    return a === b;
  });

  addTester("notSame", function(a, b) {
    return a !== b;
  });

  addTester("doesNotExist", function(a) {
    return a == null;
  });

  addTester("exists", function(a) {
    return a != null;
  });

  addTester("notPresent", function(a) {
    return !present(a);
  });

  addTester("present", function(a) {
    return present(a);
  });

  addTester("isNotPresent", function(a) {
    return !present(a);
  });

  addTester("isPresent", function(a) {
    return present(a);
  });

  addTester("hasKeys", function(a) {
    return isPlainObject(a) && objectHasKeys(a);
  });

  addTester("hasNoKeys", function(a) {
    return isPlainObject(a) && !objectHasKeys(a);
  });

  addTester("is", function(a, b) {
    return a["class"] === b;
  });

  addTester("selectedPropsEq", {
    customFailure: function(name, expectedProps, testObject, context) {
      return failWithExpectedMessageBase(context, expectedProps, testObject, [
        indent(format(expectedProps)), "to equal selected props:", indent(format(object(expectedProps, function(v, k) {
          return testObject[k];
        }))), "test object:", indent(format(testObject))
      ]);
    }
  }, function(expectedProps, testObject) {
    var failures, k, v, v2;
    failures = null;
    for (k in expectedProps) {
      v = expectedProps[k];
      if (!eq(v, v2 = testObject[k])) {
        (failures || (failures = {}))[k] = {
          expected: v,
          actual: v2
        };
      }
    }
    if (failures) {
      log.warn({
        "assert.selectedPropsEq failureInfo": {
          failures: failures,
          expectedProps: expectedProps,
          actualProps: object(expectedProps, function(v, k) {
            return testObject[k];
          })
        }
      });
      return false;
    }
    return true;
  });

  assert.selectedEq = assert.selectedPropsEq;

  assert.resolved = {};

  for (k in assert) {
    v = assert[k];
    if (isFunction(v)) {
      (function(k, v) {
        return assert.resolved[k] = function() {
          var args1;
          args1 = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return Promise.all(args1).then(function(args2) {
            return v.apply(null, args2);
          });
        };
      })(k, v);
    }
  }

  statuses = w("missing clientFailure clientFailureNotAuthorized");

  each(statuses, function(status) {
    return assert[status] = assert[name = lowerCamelCase("is " + status)] = function(promise, context) {
      if (isString(promise)) {
        return assert.eq(promise, status, context);
      } else {
        return assert.rejects(function() {
          return promise;
        }).then(function(response) {
          var obj1;
          if (response.status !== status) {
            log((
              obj1 = {},
              obj1["" + name] = {
                expected: status,
                got: response.status,
                response: response
              },
              obj1
            ));
          }
          assert.eq(response.status, status, context);
          return response;
        });
      }
    };
  });

}).call(this);