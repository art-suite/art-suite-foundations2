"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let parentImports;
  return Caf.importInvoke(
    ["Presentation"],
    (parentImports = [global, require("./StandardImport")]),
    Presentation => {
      return Caf.importInvoke(
        ["test", "assert", "generateFailedMessage"],
        [parentImports, Presentation],
        (test, assert, generateFailedMessage) => {
          test("generateFailedMessage string context", function() {
            return assert.match(
              generateFailedMessage("myContext", "a", "b", "myLines"),
              /myContext(.|\n)*myLines/
            );
          });
          test("generateFailedMessage function context", function() {
            return assert.match(
              generateFailedMessage(
                (a, b, c) => a + b + c,
                "abc",
                "123",
                "myLines"
              ),
              /abc123myLines/
            );
          });
          test("generateFailedMessage object context", function() {
            return assert.match(
              generateFailedMessage(
                { foo: 123, bar: [true, "string"] },
                "abc",
                "123",
                "myLines"
              ),
              /foo: 123/
            );
          });
          return test("function context not invoked until failure", function() {
            let invokedCount, fContext, error;
            invokedCount = 0;
            fContext = () => {
              invokedCount++;
              return { invokedCount };
            };
            assert.eq(1, 1, fContext);
            assert.eq(invokedCount, 0);
            try {
              assert.eq(1, 2, fContext);
            } catch (error1) {
              error = error1;
              ("whatever");
            }
            return assert.eq(invokedCount, 1);
          });
        }
      );
    }
  );
});
