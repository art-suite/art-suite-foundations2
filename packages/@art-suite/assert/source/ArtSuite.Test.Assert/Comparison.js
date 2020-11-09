"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["assert", "addTester", "failWithExpectedMessage", "isString", "escapeRegExp", "failWithExpectedMessageBase", "indent", "format", "eq"], [global, require('./StandardImport')], (assert, addTester, failWithExpectedMessage, isString, escapeRegExp, failWithExpectedMessageBase, indent, format, eq) => {let notMatch; Caf.array(["gt", "gte", "lte", "lt", "eq", "neq", "floatEq"], (name) => addTester(name, require('art-standard-lib')[name])); assert.within = function(a, b, c, context) {return (a != null && a.gte != null && a.lte != null) ? !(a.gte(b) && a.lte(c)) ? failWithExpectedMessage(context, a, "to be gte", b, "to be lte", c) : undefined : !(a >= b && a <= c) ? failWithExpectedMessage(context, a, "to be >=", b, "to be <=", c) : undefined;}; addTester("match", function(a, b) {return a.match(isString(b) ? escapeRegExp(b) : b);}); addTester("notMatch", notMatch = function(a, b) {return !a.match(isString(b) ? escapeRegExp(b) : b);}); addTester("doesNotMatch", notMatch); addTester("same", function(a, b) {return a === b;}); addTester("notSame", function(a, b) {return a !== b;}); addTester("selectedPropsEq", {customFailure: function(name, expectedProps, testObject, context) {return failWithExpectedMessageBase(context, expectedProps, testObject, [indent(format(expectedProps)), "to equal selected props:", indent(format(Caf.object(expectedProps, (v, k) => testObject[k]))), "test object:", indent(format(testObject))]);}}, function(expectedProps, testObject) {let failures; failures = null; Caf.each2(expectedProps, (v, k) => {let v2; return (!eq(v, v2 = testObject[k])) ? (failures != null ? failures : failures = {})[k] = {expected: v, actual: v2} : undefined;}); return !failures;}); return assert.selectedEq = assert.selectedPropsEq;});});
//# sourceMappingURL=Comparison.js.map
