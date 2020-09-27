"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "log",
      "Promise",
      "fs",
      "path",
      "process",
      "merge",
      "dashCase",
      "ConfigurePackageJson",
      "ConfigureWebpack",
    ],
    [global, require("./StandardImport"), require("./Configurators")],
    (
      log,
      Promise,
      fs,
      path,
      process,
      merge,
      dashCase,
      ConfigurePackageJson,
      ConfigureWebpack
    ) => {
      let Main;
      return (Main = Caf.defClass(class Main extends Object {}, function (
        Main,
        classSuper,
        instanceSuper
      ) {
        this.realRequire = eval("require");
        this.configBasename = "art.build.config";
        this.registerLoadersFilename = "register.js";
        this.log = (...args) => (!this.quiet ? log(...args) : undefined);
        this.go = (npmRoot, options) => {
          let pretend, configure, init, force, quiet, git, temp;
          pretend = options.pretend;
          configure = options.configure;
          init = options.init;
          force = options.force;
          quiet = options.quiet;
          git = options.git;
          (temp = this.quiet) != null ? temp : (this.quiet = quiet);
          if (pretend) {
            this.log("PRETEND".green);
          }
          return Promise.then(() =>
            init ? this.init(init, npmRoot, options) : undefined
          )
            .then(() =>
              !(pretend && init)
                ? this.loadAndWriteConfig(npmRoot, options)
                : undefined
            )
            .then(() =>
              git
                ? require("fs").existsSync(".git")
                  ? this.log(
                      "git already initialized. Not touching it. Cheers!".yellow
                    )
                  : (this.log("initializing git...".yellow),
                    require("./ShellExecSimple")("git init")
                      .then(() => require("./ShellExecSimple")("git add ."))
                      .then(() =>
                        require("./ShellExecSimple")(
                          `git commit -m "initial checkin by art-build-configurator${Caf.toString(
                            init ? ` --init ${Caf.toString(init)}` : ""
                          )}"`
                        )
                      )
                      .then(() => this.log("git initialized".yellow)))
                : undefined
            );
        };
        this.shellExec = function (command) {
          return require("./ShellExecSimple")(command, { quiet: this.quiet });
        };
        this.registerLoaders = (npmRoot) => {
          let file;
          return fs
            .exists((file = path.join(npmRoot, this.registerLoadersFilename)))
            .then((exists) =>
              exists
                ? Main.realRequire(file)
                : (Main.realRequire("caffeine-script/register"), {})
            );
        };
        this.loadConfig = (npmRoot) =>
          this.registerLoaders(npmRoot).then(() => {
            let configFilepath;
            configFilepath = path.join(process.cwd(), this.configBasename);
            return require("glob-promise")(configFilepath + "*")
              .then(([configFilepath]) =>
                configFilepath != null
                  ? Main.realRequire(configFilepath)
                  : undefined
              )
              .then((config) => {
                let temp;
                return config
                  ? Promise.resolve(
                      (temp = config.package) != null ? temp : config.npm
                    ).then((packageConfig) =>
                      merge(config, { package: packageConfig })
                    )
                  : undefined;
              });
          });
        this.init = function (recipeName, npmRoot, options) {
          let pretend, verbose, recipe;
          pretend = options.pretend;
          verbose = options.verbose;
          if (pretend && !verbose) {
            options = merge(options, { verbose: true });
          }
          if (recipeName === true) {
            recipeName = null;
          }
          recipeName = dashCase(recipeName != null ? recipeName : "core");
          return recipeName === "Help"
            ? (log(
                `Please select a valid recipe name:\n\n  ${Caf.toString(
                  require("./Recipes").getModuleNames().join("\n  ")
                )}\n\nEx: abc -i node`
              ),
              Promise.reject("exiting"))
            : (this.log(
                `\n${Caf.toString(
                  pretend ? "PRETEND-" : undefined
                )}INIT-${Caf.toString(recipeName)}: ${Caf.toString(npmRoot)}`
              ),
              !(recipe = require("./RecipeRegistry").recipes[recipeName])
                ? (log({
                    recipes: Caf.object(
                      require("./RecipeRegistry").recipes,
                      (recipe, name) => {
                        let temp;
                        return (temp = recipe.description) != null
                          ? temp
                          : "(no description)";
                      }
                    ),
                  }),
                  Promise.reject("Please provide a valid recipe name."))
                : (recipe.writeFiles(npmRoot, options),
                  this.log(
                    `${Caf.toString(
                      pretend ? "PRETEND-" : undefined
                    )}INIT-${Caf.toString(recipeName)}: done`
                  )));
        };
        this.pretendWriteConfig = function (npmRoot, abcConfig) {
          return Promise.deepAll(
            merge({
              abcConfig,
              npm: {
                out: {
                  "package.json": ConfigurePackageJson.get(npmRoot, abcConfig),
                },
              },
              indexHtml: abcConfig.indexHtml ? "<html>\n</html>" : undefined,
              webpack: {
                configGeneratedOnDemand: ConfigureWebpack.get(
                  npmRoot,
                  abcConfig
                ),
                out: {
                  "webpack.config.js": ConfigureWebpack.getFileContents(),
                },
              },
            })
          ).then(this.log);
        };
        this.runNeptuneNamespaces = function (npmRoot, options) {
          let executable, firstArg, isWebpackDevServer;
          [executable, firstArg] = process.argv;
          isWebpackDevServer = !!(
            executable.match(/\/node$/) &&
            Caf.exists(firstArg) &&
            firstArg.match(/webpack-dev-server/)
          );
          this.log(`\nNeptuneNamespaces: ${Caf.toString(npmRoot)}`);
          return require("./RunNeptuneNamespaces")(npmRoot, isWebpackDevServer);
        };
        this.loadAndWriteConfig = function (npmRoot, options) {
          let pretend, configure, init;
          ({ pretend, configure, init } = options);
          return this.loadConfig(npmRoot).then((abcConfig) =>
            abcConfig
              ? pretend
                ? this.pretendWriteConfig(npmRoot, abcConfig)
                : this.writeConfig(npmRoot, abcConfig)
              : (this.log(
                  `No ${Caf.toString(this.configBasename)} found. Aborting...`
                    .yellow
                ),
                this.log(
                  `Create ${Caf.toString(
                    this.configBasename
                  )}.caf or ${Caf.toString(
                    this.configBasename
                  )}.js and export your config object.\nIf you want to use a custom config loader, create ${Caf.toString(
                    this.registerLoadersFilename
                  )} to register your NodeJS file loader.`.grey
                ))
          );
        };
        this.writeConfig = function (npmRoot, abcConfig) {
          return Promise.then(() =>
            abcConfig.package
              ? ConfigurePackageJson.writeConfig(npmRoot, abcConfig)
              : undefined
          ).then(() =>
            abcConfig.webpack
              ? ConfigureWebpack.writeConfig(npmRoot, abcConfig)
              : undefined
          );
        };
        this.getWebpackConfig = (npmRoot, env, argv) =>
          this.loadConfig(npmRoot).then((abcConfig) =>
            this.writeConfig(npmRoot, abcConfig).then(() =>
              this.runNeptuneNamespaces(npmRoot).then(() =>
                ConfigureWebpack.get(npmRoot, abcConfig, { env, argv })
              )
            )
          );
        this.updateFile = function (fileName, contents) {
          let oldContents;
          if (fs.existsSync(fileName)) {
            oldContents = fs.readFileSync(fileName).toString();
          }
          return oldContents !== contents
            ? (this.log("writing: ".gray + fileName.green),
              fs.writeFileSync(fileName, contents))
            : undefined;
        };
      }));
    }
  );
});
