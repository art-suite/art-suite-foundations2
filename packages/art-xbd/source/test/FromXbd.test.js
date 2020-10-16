"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "fromXbd", "assert"],
    [global, require("./StandardImport")],
    (test, fromXbd, assert) => {
      let fs, path, testAssetRoot, decodeAttributeValues;
      fs = require("fs").promises;
      path = require("path");
      testAssetRoot = "test/assets/xbd_test";
      decodeAttributeValues = function (tag, func) {
        Caf.object(tag.attrs, (v, k) => func(v, k, tag.name), null, tag.attrs);
        return Caf.each2(tag.tags, (t) => decodeAttributeValues(t, func));
      };
      test("load trival.xbd", function () {
        return fs
          .readFile(path.join(testAssetRoot, "trivial.xbd"))
          .then((test_data) => {
            let tag;
            tag = fromXbd(test_data);
            assert.equal(tag.name, "RootTag");
            return assert.equal(tag.tags[0].name, "single_tag");
          });
      });
      test("load simple.xbd - hierarchy and attrs", function () {
        return fs
          .readFile(path.join(testAssetRoot, "simple.xbd"))
          .then((test_data) => {
            let tag, top_tag, child_tag1, child_tag2, grand_child_tag;
            tag = fromXbd(test_data);
            assert.equal(tag.name, "RootTag");
            decodeAttributeValues(tag, (str) => str.toString());
            top_tag = tag.tags[0];
            assert.equal(top_tag.name, "top_tag");
            assert.deepEqual(top_tag.attrs, {
              animal: "(ᵔᴥᵔ)",
              fruit: "orange",
            });
            child_tag1 = top_tag.tags[0];
            assert.equal(child_tag1.name, "child_tag1");
            assert.deepEqual(child_tag1.attrs, { fruit: "apple" });
            child_tag2 = top_tag.tags[1];
            assert.equal(child_tag2.name, "child_tag2");
            assert.deepEqual(child_tag2.attrs, { planet: "mars" });
            grand_child_tag = child_tag2.tags[0];
            assert.equal(grand_child_tag.name, "grand_child_tag");
            return assert.deepEqual(grand_child_tag.attrs, {
              animal: "horse",
              color: "red",
            });
          });
      });
      return test("load 4-1gb.kimi", function () {
        return fs
          .readFile(path.join(testAssetRoot, "4-1gb.kimi"))
          .then((test_data) => {
            let tag;
            tag = fromXbd(test_data);
            return assert.equal(tag.name, "RootTag");
          });
      });
    }
  );
});
