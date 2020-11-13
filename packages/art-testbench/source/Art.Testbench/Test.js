"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["cleanErrorStack", "isPromise", "test", "assert"], [global, require('./StandardImport'), require('./ErrorExtensions'), require('@art-suite/assert')], (cleanErrorStack, isPromise, test, assert) => {return {test: function(name, test, ...rest) {return global.test(name, () => {let p, error; p = (() => {try {return test();} catch (error1) {error = error1; return (() => {throw cleanErrorStack(error, /art-testbench|caffeine-script-runtime|bluebird|jest-jasmine2/);})();};})(); return isPromise(p) ? p.catch((error) => (() => {throw cleanErrorStack(error, /art-testbench|caffeine-script-runtime|bluebird|jest-jasmine2/);})()) : undefined;}, ...rest);}, skipKnownFailingTest: function(name, f) {let message; message = `SKIPPING KNOWN-FAILING TEST: ${Caf.toString(name)}`; return test(message, () => assert.rejects(f, "This test is passing now, yay! Switch to a normal test."));}};});});
//# sourceMappingURL=Test.js.map
