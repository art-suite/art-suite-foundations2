"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["chainedTest", "assert"],
    [global, require("./StandardImport")],
    (chainedTest, assert) => {
      chainedTest(function() {
        return 123;
      })
        .tapTest("tapTest", function() {
          return 3;
        })
        .thenTest("thenTest", function(val) {
          return assert.eq(val, 123);
        });
      return chainedTest("start", function() {
        return 123;
      })
        .tapTest(
          [
            "one",
            function(val) {
              assert.eq(val, 123);
              return 1;
            }
          ],
          [
            "two",
            function(val) {
              assert.eq(val, 123);
              return 2;
            }
          ]
        )
        .softTapTest(
          [
            "one",
            function(val) {
              assert.eq(val, 123);
              return 1;
            }
          ],
          [
            "two",
            function(val) {
              assert.eq(val, 123);
              return 2;
            }
          ]
        )
        .thenTest(
          [
            "should_be_123",
            function(val) {
              assert.eq(val, 123);
              return 456;
            }
          ],
          [
            "should_be_456",
            function(val) {
              return assert.eq(val, 456);
            }
          ]
        );
    }
  );
});
