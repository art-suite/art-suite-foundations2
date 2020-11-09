"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["BaseClass", "compactFlatten", "Promise", "currentSecond", "isString", "isFunction", "Error", "formattedInspect"], [global, require('art-standard-lib'), require('art-class-system')], (BaseClass, compactFlatten, Promise, currentSecond, isString, isFunction, Error, formattedInspect) => {let chainedTest, ChainedTest; return ({chainedTest} = ChainedTest = Caf.defClass(class ChainedTest extends BaseClass {constructor(setupOnceFunction = () => {}, previousTestFunction = () => {}, testName, testFunction, shouldTap, shouldSkipIfNotSelected) {super(...arguments); this.setupOnceFunction = setupOnceFunction; this.previousTestFunction = previousTestFunction; this.testName = testName; this.testFunction = testFunction; this.shouldTap = shouldTap; this.shouldSkipIfNotSelected = shouldSkipIfNotSelected; if (this.testName) {global.test(this.testName, this.testFunction && this.setupAndTestOnceFunction);};};}, function(ChainedTest, classSuper, instanceSuper) {this.chainedTest = function(...args) {return ChainedTest.setup(...args);}; this.prototype.thenTest = function(...args) {return this._applySequence("_thenTest", compactFlatten(args));}; this.prototype.tapTest = function(...args) {return this._applySequence("_tapTest", compactFlatten(args));}; this.prototype.softTapTest = function(...args) {return this._applySequence("_softTapTest", compactFlatten(args));}; this.setup = function(a, b) {let setupFunction, setupName, setupOncePromise, setupOnceFunction; setupFunction = b != null ? b : a; if (b != null) {setupName = a;}; setupOncePromise = null; setupOnceFunction = () => setupOncePromise != null ? setupOncePromise : setupOncePromise = Promise.then(setupFunction != null ? setupFunction : (() => {})); if (setupFunction) {setupName = setupName ? `ChainedTest setup: ${Caf.toString(setupName)}` : "ChainedTest setup"; global.test(setupName, setupOnceFunction);}; return new ChainedTest(setupOnceFunction, setupOnceFunction);}; this.getter({resolvedSetup: function() {return Promise.then(this.setupOnceFunction);}, setupAndTestOnceFunction: function() {let temp; return ((temp = this._setupAndTestOnceFunction) != null ? temp : this._setupAndTestOnceFunction = () => {let temp1; return ((temp1 = this._testOncePromise) != null ? temp1 : this._testOncePromise = this.testFunction ? Promise.then(this.previousTestFunction).then((previousTestResult) => {let startTime; startTime = currentSecond(); return this.resolvedSetup.then((setupResult) => this.testFunction(previousTestResult, setupResult)).then((out) => this.shouldTap ? previousTestResult : out);}) : this.resolvedSetup);});}, setupAndTestOnceFunctionForChain: function() {return () => (this.shouldSkipIfNotSelected ? Promise.then(this.previousTestFunction) : this.setupAndTestOnceFunction()).catch((error) => {if (!/failed in/.test(error.message)) {error.message = "(ChainedTest failed in: " + (this.testName ? this.testName : "setup"); error.message += ")\n\n";}; return (() => {throw error;})();});}}); this.prototype._thenTest = function(nextTestName, nextTestFunction) {return new ChainedTest(this.setupOnceFunction, this.setupAndTestOnceFunctionForChain, nextTestName, nextTestFunction);}; this.prototype._tapTest = function(nextTestName, nextTestFunction) {return new ChainedTest(this.setupOnceFunction, this.setupAndTestOnceFunctionForChain, nextTestName, nextTestFunction, true);}; this.prototype._softTapTest = function(nextTestName, nextTestFunction) {return new ChainedTest(this.setupOnceFunction, this.setupAndTestOnceFunctionForChain, nextTestName, nextTestFunction, true, true);}; this.prototype._applySequence = function(applyMemberName, sequence) {let i, ct; i = 0; ct = this; while (i < sequence.length) {let v, f; if (isString(v = sequence[i++])) {if (!isFunction(f = sequence[i++])) {throw new Error(`ChainedTestError: expecting <Function> after <String>(${Caf.toString(formattedInspect(v))}) got: ${Caf.toString(formattedInspect(f))}`);}; ct = ct[applyMemberName](v, f);} else {throw new Error(`ChainedTestError: expecting <String> got: ${Caf.toString(formattedInspect(v))}`);};}; return ct;};}), {chainedTest});});});
//# sourceMappingURL=ChainedTest.js.map
