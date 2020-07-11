"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let parentImports;
  return Caf.importInvoke(
    ["ArtCli"],
    (parentImports = [global, require("./StandardImport")]),
    ArtCli => {
      return Caf.importInvoke(
        [
          "describe",
          "test",
          "stripAnsi",
          "getHelp",
          "assert",
          "getCommandDetails"
        ],
        [parentImports, ArtCli.Help],
        (describe, test, stripAnsi, getHelp, assert, getCommandDetails) => {
          let help, description;
          help = {
            description: (description = "abc-description"),
            commands: {
              walk: {
                description: "walk about",
                examples: "walk",
                options: { gate: ["mph", "estimated mph for yer walking"] }
              },
              run: {
                description: "run about",
                options: { gate: ["mph", "estimated mph for yer walking"] }
              },
              info: { description: "show info" },
              cartewheel: { description: "this stuff is hard", advanced: true }
            }
          };
          return describe({
            basic: function() {
              return test("getHelp", () => {
                let h;
                h = stripAnsi(getHelp("myCommand", help));
                assert.match(h, /walk/);
                assert.match(h, /gate/);
                assert.match(h, /run/);
                return assert.notMatch(h, /yer walking/);
              });
            },
            detailedHelp: function() {
              test("getCommandDetails", () => {
                let h;
                h = getCommandDetails("walk", help.commands.walk);
                assert.match(h, /walk/);
                assert.notMatch(h, description);
                assert.match(h, /gate/);
                assert.match(h, /option/);
                return assert.match(h, /yer walking/);
              });
              return test("getHelp specific command", () => {
                let h;
                h = getHelp("myCommand", help, "walk");
                assert.match(h, /walk/);
                assert.match(h, /gate/);
                assert.match(h, /option/);
                assert.notMatch(h, /run/);
                return assert.match(h, /yer walking/);
              });
            },
            regressions: function() {
              test("getHelp on a command with no options should still show details", () => {
                let h;
                h = stripAnsi(getHelp("myCommand", help, "info"));
                return assert.match(h, /usage/);
              });
              test("getHelp only returns on copy of the description", () => {
                let h;
                h = stripAnsi(getHelp("myCommand", help));
                return assert.eq(
                  h.match(RegExp(`${Caf.toString(description)}`, "g")).length,
                  1
                );
              });
              return test("multi-word commands", () => {
                let details;
                assert.match(
                  stripAnsi(
                    getHelp(
                      "myCli",
                      {
                        commands: {
                          "list-buckets": (details = {
                            description: "Just give me some fun."
                          })
                        }
                      },
                      "list-buckets"
                    )
                  ),
                  /myCli/i
                );
                assert.match(
                  stripAnsi(
                    getHelp(
                      "myCli",
                      { commands: { "list-buckets": details } },
                      "listBuckets"
                    )
                  ),
                  /myCli/i
                );
                assert.match(
                  stripAnsi(
                    getHelp(
                      "myCli",
                      { commands: { listBuckets: details } },
                      "list-buckets"
                    )
                  ),
                  /myCli/i
                );
                return assert.match(
                  stripAnsi(
                    getHelp(
                      "myCli",
                      { commands: { listBuckets: details } },
                      "listBuckets"
                    )
                  ),
                  /myCli/i
                );
              });
            }
          });
        }
      );
    }
  );
});
