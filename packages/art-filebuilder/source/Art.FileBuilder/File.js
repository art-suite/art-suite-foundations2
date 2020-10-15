"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["createObjectTreeFactory", "BaseClass", "isFunction", "isRegExp", "log"],
    [global, require("./StandardImport"), require("art-object-tree-factory")],
    (createObjectTreeFactory, BaseClass, isFunction, isRegExp, log) => {
      let Path, fsExtra, FileClass;
      Path = require("path");
      fsExtra = require("fs-extra");
      return createObjectTreeFactory(
        (FileClass = Caf.defClass(
          class FileClass extends BaseClass {
            constructor(props = {}, children = []) {
              super(...arguments);
              this.props = props;
              this.children = children;
              this.props.filename = this.children[0];
              this.props.contents = this.children[1];
            }
          },
          function (FileClass, classSuper, instanceSuper) {
            this.getter({
              plainObjects: function () {
                return { [this.props.filename]: this.props.contents };
              },
            });
            this.prototype.write = function (options = {}) {
              let filename,
                contents,
                path,
                pretend,
                force,
                verbose,
                select,
                fs,
                selected,
                exists,
                logContents,
                temp;
              ({ filename, contents } = this.props);
              ({
                path,
                pretend,
                force,
                verbose,
                select,
                fs = fsExtra,
              } = options);
              path = Path.join(path || ".", filename);
              selected =
                select != null
                  ? isFunction(select)
                    ? select(path)
                    : isRegExp(select)
                    ? select.test(path)
                    : undefined
                  : true;
              return selected
                ? ((exists = fs.existsSync(path)),
                  verbose
                    ? ((logContents = exists
                        ? contents === fs.readFileSync(path).toString()
                          ? `same:    ${Caf.toString(path)}`.gray
                          : force
                          ? "overwriting: ".yellow + path.green
                          : `skipped: ${Caf.toString(path)}`.gray +
                            " (cowardly refusing to overwrite - use: force)"
                              .yellow
                        : "writing: ".gray + path.green),
                      log(
                        pretend ? "PRETEND-".green + logContents : logContents
                      ))
                    : undefined,
                  !pretend && (!exists || force)
                    ? (fs.ensureDirSync(Path.dirname(path)),
                      fs.writeFileSync(
                        path,
                        (temp = Caf.exists(contents) && contents.nodeBuffer) !=
                          null
                          ? temp
                          : contents
                      ),
                      path)
                    : undefined)
                : undefined;
            };
          }
        ))
      );
    }
  );
});
