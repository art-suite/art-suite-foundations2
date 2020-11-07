"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["Types", "assert", "addTester", "isFunction", "Promise", "isPromise", "depricated", "failWithExpectedMessage", "isString", "escapeRegExp", "present", "isPlainObject", "objectHasKeys", "lowerCamelCase", "log", "failWithExpectedMessageBase", "indent", "format", "eq", "Function"], [global, require('art-standard-lib'), require('./Presentation'), require('chai'), require('./ArtChaiLib')], (Types, assert, addTester, isFunction, Promise, isPromise, depricated, failWithExpectedMessage, isString, escapeRegExp, present, isPlainObject, objectHasKeys, lowerCamelCase, log, failWithExpectedMessageBase, indent, format, eq, Function) => {let promisify, notMatch, notExists; promisify = function(a) {return isFunction(a) ? Promise.then(() => a()) : isPromise(a) ? a : Promise.resolve(a);}; Caf.array(Types, (tester, name) => addTester(name, tester), (tester, name) => name.match(/^is/)); Caf.array(["gt", "gte", "lte", "lt", "eq", "neq", "floatEq"], (name) => addTester(name, require('art-standard-lib')[name])); assert.rejectsWithStatus = function(status, _promise, context) {return assert.rejects(_promise, context).then((error) => assert.selectedEq({status}, error, context));}; assert.rejectsWith = function(_promise, rejectValue, context) {depricated("assert.rejectsWith(...)", "assert.rejects(...).then (rejectValue) -> assert.eq rejectValue, expectedRejectValue"); return assert.rejects(_promise).then((value) => assert.eq(value, rejectValue, `rejects with: ${Caf.toString(context)}`));}; addTester("instanceof", {customFailure: function(name, v1, v2, context) {return failWithExpectedMessage(context, v2, name, v1);}}, function(klass, obj) {return obj instanceof klass;}); addTester("is", function(a, b) {return Caf.is(a, b);}); assert.resolves = function(a, context) {return promisify(a).then((v) => v, (v) => failWithExpectedMessage(context, a, "to be resolved. Instead, it rejected with:", v));}; assert.rejects = function(a, context) {return promisify(a).then((v) => failWithExpectedMessage(context, a, "to be rejected. Instead, it succeeded with:", v), (v) => v);}; assert.within = function(a, b, c, context) {return (a && a.gte && a.lte) ? !(a.gte(b) && a.lte(c)) ? failWithExpectedMessage(context, a, "to be gte", b, "to be lte", c) : undefined : !(a >= b && a <= c) ? failWithExpectedMessage(context, a, "to be >=", b, "to be <=", c) : undefined;}; addTester("true", function(a) {return a === true;}); addTester("false", function(a) {return a === false;}); addTester("jsTrue", function(a) {return !!a;}); addTester("jsFalse", function(a) {return !a;}); addTester("rubyTrue", function(a) {return a !== false && a != null;}); addTester("rubyFalse", function(a) {return a === false || !(a != null);}); addTester("match", function(a, b) {return a.match(isString(b) ? escapeRegExp(b) : b);}); addTester("notMatch", notMatch = function(a, b) {return !a.match(isString(b) ? escapeRegExp(b) : b);}); addTester("doesNotMatch", notMatch); addTester("exists", function(a) {return a != null;}); addTester("notExists", notExists = function(a) {return !(a != null);}); addTester("doesNotExist", notExists); addTester("same", function(a, b) {return a === b;}); addTester("notSame", function(a, b) {return a !== b;}); addTester("present", function(a) {return present(a);}); addTester("notPresent", function(a) {return !present(a);}); addTester("isNotPresent", function(a) {depricated("isNotPresent", "notPresent"); return !present(a);}); addTester("isPresent", function(a) {depricated("isPresent", "present"); return present(a);}); addTester("hasKeys", function(a) {return isPlainObject(a) && objectHasKeys(a);}); addTester("hasNoKeys", function(a) {return isPlainObject(a) && !objectHasKeys(a);}); Caf.each2(["missing", "clientFailure", "clientFailureNotAuthorized"], (status) => {let name; return assert[status] = assert[name = lowerCamelCase(`is ${Caf.toString(status)}`)] = function(promiseOrString, context) {let temp; return isPromise(promiseOrString) ? assert.rejects(() => promiseOrString).then((response) => {if (response.status !== status) {log({[name]: {expected: status, got: response.status, response}});}; assert.eq(response.status, status, context); return response;}) : assert.eq(((temp = Caf.exists(promiseOrString) && promiseOrString.status) != null ? temp : promiseOrString), status, context);};}); addTester("selectedPropsEq", {customFailure: function(name, expectedProps, testObject, context) {return failWithExpectedMessageBase(context, expectedProps, testObject, [indent(format(expectedProps)), "to equal selected props:", indent(format(Caf.object([expectedProps, (v, k) => testObject[k]]))), "test object:", indent(format(testObject))]);}}, function(expectedProps, testObject) {let failures; failures = null; Caf.each2(expectedProps, (v, k) => {let v2; return (!eq(v, v2 = testObject[k])) ? (failures != null ? failures : failures = {})[k] = {expected: v, actual: v2} : undefined;}); return failures ? (log.warn({"assert.selectedPropsEq failureInfo": {failures, expectedProps, actualProps: Caf.object([expectedProps, (v, k) => testObject[k]])}}), false) : true;}); assert.selectedEq = assert.selectedPropsEq; assert.resolved = {}; Caf.each2(assert, (v, k) => assert.resolved[k] = function(...args) {return Promise.all(args).then((resolvedArgs) => v(...resolvedArgs));}, (v, k) => Caf.is(v, Function)); return require('chai');});});
//# sourceMappingURL=ArtChai.js.map
