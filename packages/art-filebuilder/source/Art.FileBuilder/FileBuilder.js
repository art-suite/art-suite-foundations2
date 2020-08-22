"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["isPlainObject", "isString", "isBinary", "Error", "formattedInspect"],
    [global, require("./StandardImport")],
    (isPlainObject, isString, isBinary, Error, formattedInspect) => {
      let fileBuilder;
      return {
        fileBuilder: (fileBuilder = function (name, contents) {
          return (() => {
            switch (false) {
              case !isPlainObject(name):
                return require("./Dir")(
                  ".",
                  Caf.array(name, (contents, n) => fileBuilder(n, contents))
                );
              case !isString(contents):
                return require("./File")(name, contents);
              case !isBinary(contents):
                return require("./File")(name, contents);
              case !isPlainObject(contents):
                return require("./Dir")(name, fileBuilder(contents));
              case !(
                contents === null ||
                contents === undefined ||
                contents === false
              ):
                return null;
              default:
                return (() => {
                  throw new Error(
                    `expecting string, Art.Binary string, or plain object. got: ${Caf.toString(
                      formattedInspect({ name, contents })
                    )}`
                  );
                })();
            }
          })();
        }),
      };
    }
  );
});
