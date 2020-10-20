"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Configuration", "defineModule", "test", "assert"],
    [global, require("./StandardImport")],
    (Configuration, defineModule, test, assert) => {
      let MyBaseConfiguration, ConfigurationInheritance;
      MyBaseConfiguration = Caf.defClass(
        class MyBaseConfiguration extends Configuration {},
        function (MyBaseConfiguration, classSuper, instanceSuper) {
          this.prototype.baseConfigValue = "food";
          this.prototype.overiddenBaseValue = "foo";
        }
      );
      defineModule(
        module,
        (ConfigurationInheritance = Caf.defClass(
          class ConfigurationInheritance extends MyBaseConfiguration {},
          function (ConfigurationInheritance, classSuper, instanceSuper) {
            this.prototype.overiddenBaseValue = "bar";
          }
        ))
      );
      test("inherit value", function () {
        return assert.eq(
          ConfigurationInheritance.prototype.baseConfigValue,
          "food"
        );
      });
      return test("override value", function () {
        return assert.eq(
          ConfigurationInheritance.prototype.overiddenBaseValue,
          "bar"
        );
      });
    }
  );
});
