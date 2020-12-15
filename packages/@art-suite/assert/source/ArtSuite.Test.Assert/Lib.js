"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["isFunction", "isPlainObject", "Error", "failWithExpectedMessage", "inspectedObjectLiteral", "assert"], [global, require('art-standard-lib'), require('./Presentation'), require('chai')], (isFunction, isPlainObject, Error, failWithExpectedMessage, inspectedObjectLiteral, assert) => {let getTesterFor, addTester; return [require('./Presentation'), {getTesterFor: getTesterFor = function(name, a, b) {let tester, options; tester = isFunction(a) ? a : isPlainObject(a) ? (options = a, b) : (() => {throw new Error("expected object or function");})(); if (!isFunction(tester)) {throw new Error("expected tester function");}; return (() => {switch (tester.length) {case 1: return (testValue, context) => !tester(testValue) ? (Caf.exists(options) && options.customFailure) ? Caf.exists(options) && options.customFailure(name, testValue, context) : failWithExpectedMessage(context, inspectedObjectLiteral(name), "to be true for", testValue) : undefined; default: return (value1, value2, context) => !tester(value1, value2) ? (Caf.exists(options) && options.customFailure) ? Caf.exists(options) && options.customFailure(name, value1, value2, context) : failWithExpectedMessage(context, value1, name, value2) : undefined;};})();}, addTester: addTester = function(name, a, b) {let testerFor; return assert[name] = testerFor = getTesterFor(name, a, b);}}];});});
//# sourceMappingURL=Lib.js.map
