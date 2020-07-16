"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["compactFlatten", "repeat", "Object"],
    [global, require("art-standard-lib")],
    (compactFlatten, repeat, Object) => {
      return require("./ArtSuite.Cli").start({
        description: "A demo of the art-suite/cli library.",
        commands: {
          sing: {
            run: function({ song, args }) {
              return `♫ ${Caf.toString(
                song != null ? song : Caf.exists(args) && args.join(" ")
              )} ♫!`;
            },
            description: "Sing any name you choose",
            options: {
              args: { description: "your favorite lyrics" },
              song: { description: "name of the song to sing", required: true }
            }
          },
          "send-cheer": function() {
            return "May you have a holly, jolly Christmas this year!";
          },
          xmas: {
            run: function({ santa, rudolph }) {
              return compactFlatten([
                "Will Santa come this year?",
                santa > 0 ? repeat("Ho! ", santa) : "No Santa this year.",
                rudolph ? "Rudolph's nose glows!" : undefined
              ]).join("\n");
            },
            description: "This will tell you exactly what you need.",
            options: {
              rudolph: "Should Rudolph come too?",
              santa: [
                "number-of-ho-hos",
                "Santa will come if he says 'Ho!' at least once."
              ]
            },
            examples: [
              { santa: 10 },
              "output:\n\n  Will Santa come this year?\n  Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho!",
              { rudolph: true },
              "output:\n\n  Will Santa come this year?\n  No Santa this year.\n  Rudolph's nose glows!",
              { rudolph: true, santa: 10 },
              "output:\n\n  Will Santa come this year?\n  Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho!\n  Rudolph's nose glows!"
            ]
          },
          stat: {
            description: "stat the listed files",
            run: function({ args }) {
              return Caf.object(args, arg => {
                let stat;
                stat = require("fs").statSync(arg);
                return Caf.object(
                  Object.keys(stat),
                  k => stat[k],
                  null,
                  null,
                  k => k
                );
              });
            }
          }
        }
      });
    }
  );
});