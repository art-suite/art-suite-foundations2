"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let process = global.process,
    console = global.console,
    String = global.String,
    ArtBuildConfigurator,
    realRequire,
    git,
    pv,
    pretend,
    configure,
    init,
    force,
    verbose,
    app,
    requireOption,
    commander;
  require("colors");
  ArtBuildConfigurator = require("./Art.Build.Configurator");
  realRequire = eval("require");
  ({
    git,
    pv,
    pretend,
    configure,
    init,
    force,
    verbose,
    app,
    require: requireOption
  } = commander = require("commander")
    .option("-c, --configure", "configure and update all")
    .option("-v, --verbose", "verbose")
    .option(
      "-r, --require [source]",
      "require(source) - use to register recipes"
    )
    .option(
      "-p, --pretend",
      "show the configs that will be generated without writing them"
    )
    .option("-f, --force", "when initialize, force overwrite all")
    .option(
      "-i, --init [recipe]",
      "initialize a new Art-style project [default recipe: core]"
    )
    .option("--git", "init git (unless .git is already present)")
    .option("--pv", "show YOUR package's current version")
    .version(require("../package").version)
    .on("--help", function() {
      return console.log(
        `\n${Caf.toString(
          "art-build-configurator (abc) - initialize and configure ArtSuiteJS projects"
            .white
        )}\n\nConfig: ${Caf.toString(
          ArtBuildConfigurator.configFilename.green
        )}\n\nManaged: (don't edit directly, edit abc's config)\n- ${Caf.toString(
          "package.json".green
        )}\n- ${Caf.toString("webpack.config.js".green)}`
      );
    })
    .parse(process.argv));
  return (() => {
    switch (false) {
      case !pv:
        return console.log(ArtBuildConfigurator.Versioning.current);
      case !(pretend || configure || init || git):
        if (Caf.is(requireOption, String)) {
          console.log(
            "loading: require ".blue + `'${Caf.toString(requireOption)}'`.green
          );
          realRequire(requireOption);
        }
        return ArtBuildConfigurator.go(process.cwd(), {
          pretend,
          configure,
          init,
          force,
          verbose,
          app,
          git
        })
          .tap(function() {
            return console.log("success".green);
          })
          .catch(function(e) {
            return require("art-standard-lib").log.error(e);
          });
      default:
        return commander.outputHelp();
    }
  })();
});
