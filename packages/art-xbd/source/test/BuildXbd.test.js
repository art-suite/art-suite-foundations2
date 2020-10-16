"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["createTagFactories", "test", "assert"],
    [global, require("./StandardImport")],
    (createTagFactories, test, assert) => {
      let Foo, Boo, Baz;
      ({ Foo, Boo, Baz } = createTagFactories("foo\nboo\nbaz", ""));
      test("building xbd one nested tag", function () {
        let t;
        t = Foo(Boo());
        return assert.equal(t.toString(), "<foo>\n  <boo/>\n</foo>");
      });
      test("building xbd with attrs", function () {
        let t;
        t = Foo({ bar: 1, baz: 2 });
        return assert.equal(t.toString(), "<foo bar='1' baz='2'/>");
      });
      test("building xbd double nested tag", function () {
        let t, shouldBe;
        t = Foo(Boo(Baz()));
        shouldBe = "<foo>\n  <boo>\n    <baz/>\n  </boo>\n</foo>";
        return assert.equal(t.toString(), shouldBe);
      });
      return test("get tag", function () {
        let t;
        t = Foo(null, Boo({ a: 1 }), Baz({ a: 2 }));
        assert.equal(t.tag("boo").attrs["a"], 1);
        return assert.equal(t.tag("baz").attrs["a"], 2);
      });
    }
  );
});
