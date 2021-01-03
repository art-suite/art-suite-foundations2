"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["log", "compactFlatten", "repeat", "Object"], [global, require('art-standard-lib')], (log, compactFlatten, repeat, Object) => {return require("@art-suite/cli").start({description: "A demo of the art-suite/cli library.\n\nPirateIpsum.me Heave down stern heave to hearties crack Jennys tea cup topgallant snow reef sails belaying pin haul wind. Strike colors mizzenmast nipper draft scurvy skysail gangplank ye list interloper. Squiffy bring a spring upon her cable line chandler execution dock plunder topgallant scourge of the seven seas crimp ahoy.\n\nJack Ketch Yellow Jack main sheet list black spot spyglass hearties barque sutler fathom. Stern gally crimp run a rig execution dock lugsail hogshead boatswain Davy Jones' Locker jolly boat. Tender Pieces of Eight league matey mizzenmast take a caulk nipperkin capstan furl chantey.", commands: {simplestCommandDefinition: function() {return "This command demos the easiest way to define a command - using just a function. Non-null/undefined return values are output at the end of execution. In this case, this string is presented.";}, simplestOptionsDefinition: {description: "This command demos the easiest way to define your options as an array of strings.", options: ["color", "length"], run: function({color, length}) {return log({color, length});}}, "advanced-and-required-options": {run: function(options) {return options;}, options: {myExpertOption: {advanced: true}, myRequiredOption: {required: true}}}, sing: {run: function({song, args}) {return `♫ ${Caf.toString(song != null ? song : Caf.exists(args) && args.join(" "))} ♫!`;}, description: "Sing any name you choose", options: {args: {description: "your favorite lyrics"}, song: {description: "name of the song to sing", required: true}}}, "send-cheer": function() {return "May you have a holly, jolly Christmas this year!";}, xmas: {run: function({santa, rudolph}) {return compactFlatten(["Will Santa come this year?", (santa > 0) ? repeat("Ho! ", santa) : "No Santa this year.", rudolph ? "Rudolph's nose glows!" : undefined]).join("\n");}, description: "This will tell you exactly what you need.", options: {rudolph: "Should Rudolph come too?", santa: ["number-of-ho-hos", "Santa will come if he says 'Ho!' at least once."]}, examples: [{santa: 10}, "output:\n\n  Will Santa come this year?\n  Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho!", {rudolph: true}, "output:\n\n  Will Santa come this year?\n  No Santa this year.\n  Rudolph's nose glows!", {rudolph: true, santa: 10}, "output:\n\n  Will Santa come this year?\n  Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho! Ho!\n  Rudolph's nose glows!"]}, stat: {description: "stat the listed files", run: function({args}) {return Caf.object(args, (arg) => {let stat; stat = require('fs').statSync(arg); return Caf.object(Object.keys(stat), (k) => stat[k]);});}}}});});});
//# sourceMappingURL=demo.js.map