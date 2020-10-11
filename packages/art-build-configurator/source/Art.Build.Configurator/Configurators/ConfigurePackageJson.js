"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "Promise",
      "StandardPackageJson",
      "isFunction",
      "deepMerge",
      "consistentJsonStringify",
    ],
    [global, require("../StandardImport")],
    (
      Promise,
      StandardPackageJson,
      isFunction,
      deepMerge,
      consistentJsonStringify
    ) => {
      let ConfigurePackageJson;
      return (ConfigurePackageJson = Caf.defClass(
        class ConfigurePackageJson extends require("./ConfigureBase") {},
        function (ConfigurePackageJson, classSuper, instanceSuper) {
          this.outFileName = "package.json";
          this.get = (npmRoot, abcConfig) =>
            Promise.then(() => StandardPackageJson.get(abcConfig)).then(
              (baseConfig) => {
                let packageConfig;
                return isFunction((packageConfig = abcConfig.package))
                  ? packageConfig(baseConfig)
                  : deepMerge(baseConfig, packageConfig);
              }
            );
          this.getFileContents = function (npmRoot, abcConfig) {
            return this.get(npmRoot, abcConfig).then(
              (contents) => consistentJsonStringify(contents, "  ") + "\n"
            );
          };
        }
      ));
    }
  );
});
