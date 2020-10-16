"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "log",
      "blue",
      "upperCase",
      "loadAllPackages",
      "pluralize",
      "Promise",
      "grey",
      "execShellCommand",
      "green",
      "red",
      "present",
      "yellow",
      "process",
    ],
    [global, require("./StandardImport")],
    (
      log,
      blue,
      upperCase,
      loadAllPackages,
      pluralize,
      Promise,
      grey,
      execShellCommand,
      green,
      red,
      present,
      yellow,
      process
    ) => {
      let indent, logRun;
      indent = function (str, amount = "   ") {
        return amount + str.replace(/\n/g, `\n${Caf.toString(amount)}`);
      };
      logRun = function (verb, packagePath) {
        return log(blue(`${Caf.toString(verb)}: `) + packagePath);
      };
      return function ({ command, verb, verbose }) {
        verb = upperCase(verb);
        return loadAllPackages()
          .then((packages) =>
            Caf.array(
              packages,
              ({ scripts }, packagePath) => packagePath,
              ({ scripts }, packagePath) => Caf.exists(scripts) && scripts.test
            )
          )
          .then((packagePaths) => {
            let passed, failed;
            logRun(
              `${Caf.toString(verb)}ING`,
              pluralize("package", packagePaths.length)
            );
            passed = [];
            failed = [];
            return Promise.all(
              Caf.array(packagePaths, (packagePath) => {
                logRun(verb, grey(packagePath));
                return execShellCommand(
                  `cd ${Caf.toString(packagePath)};${Caf.toString(command)}`
                ).then(
                  (stdout) => {
                    passed.push(packagePath);
                    if (verbose) {
                      log(
                        blue(
                          `${Caf.toString(packagePath)} > ${Caf.toString(
                            command
                          )} (stdout)`
                        )
                      );
                      log(indent(stdout.trim(), "  "));
                    }
                    logRun("SUCCESS", green(packagePath));
                    return verbose ? log("") : undefined;
                  },
                  ({ stdout, stderr }) => {
                    failed.push(packagePath);
                    logRun("FAILED", red(packagePath));
                    if (present(stdout)) {
                      log(
                        blue(
                          `  ${Caf.toString(packagePath)} > ${Caf.toString(
                            command
                          )} (stdout)`
                        )
                      );
                      log(indent(stdout.trim()));
                      log("");
                    }
                    return present(stderr)
                      ? (log(
                          blue(
                            `  ${Caf.toString(packagePath)} > ${Caf.toString(
                              command
                            )} (stderr)`
                          )
                        ),
                        log(red(indent(stderr.trim()))),
                        log(""))
                      : undefined;
                  }
                );
              })
            ).then(() => {
              log(blue("\nRESULTS:"));
              log(blue("  succeeded: " + yellow(passed.length)));
              if (failed.length > 0) {
                Caf.each2(failed, (f) => log(blue("  failed: " + red(f))));
                process.exit(1);
              }
              return null;
            });
          });
      };
    }
  );
});
