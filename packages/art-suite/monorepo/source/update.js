"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Promise"],
    [global, require("art-standard-lib")],
    Promise => {
      return function(options) {
        return Promise.then(() =>
          require("./update-sub-packages")(options)
        ).then(() => require("./update-mono-package")(options));
      };
    }
  );
});
