module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** external "require('caffeine-script-runtime' /* ABC - not inlining fellow NPM *_/)" ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('caffeine-script-runtime' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, bin, dependencies, description, devDependencies, license, name, scripts, version, default */
/***/ (function(module) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC\"","bin":{"abc":"./abc"},"dependencies":{"art-build-configurator":"*","art-class-system":"*","art-config":"*","art-filebuilder":"*","art-object-tree-factory":"*","art-standard-lib":"*","art-testbench":"*","bluebird":"^3.5.3","caffeine-script":"*","caffeine-script-runtime":"*","case-sensitive-paths-webpack-plugin":"^2.1.2","chai":"^4.2.0","coffee-loader":"^0.7.3","coffee-script":"^1.12.7","colors":"^1.3.2","commander":"^2.19.0","css-loader":"^1.0.1","dateformat":"^3.0.3","detect-node":"^2.0.4","fs-extra":"^7.0.1","glob":"^7.1.4","glob-promise":"^3.4.0","json-loader":"^0.5.7","mocha":"^5.2.0","neptune-namespaces":"*","pluralize":"^7.0.0","recursive-copy":"^2.0.6","script-loader":"^0.7.2","style-loader":"^0.23.1","webpack":"^4.32.2","webpack-cli":"*","webpack-dev-server":"^3.4.1","webpack-merge":"^4.2.1","webpack-node-externals":"^1.7.2","webpack-stylish":"^0.1.8"},"description":"Tools for configuring npm (package.json) and webpack (webpack.config.js)","devDependencies":{"mock-fs":"^4.10.0"},"license":"ISC","name":"art-build-configurator","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress --env.devServer","test":"nn -s;mocha -u tdd","testInBrowser":"webpack-dev-server --progress --env.devServer"},"version":"1.19.9"};

/***/ }),
/* 6 */
/*!**********************!*\
  !*** ./index.coffee ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./source/Art/Build/Configurator */ 7);


/***/ }),
/* 7 */
/*!************************************************!*\
  !*** ./source/Art/Build/Configurator/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art/Build/Configurator/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 8))
.includeInNamespace(__webpack_require__(/*! ./Configurator */ 14))
.addModules({
  DefaultFiles:         __webpack_require__(/*! ./DefaultFiles */ 34),
  Publish:              __webpack_require__(/*! ./Publish */ 38),
  RunNeptuneNamespaces: __webpack_require__(/*! ./RunNeptuneNamespaces */ 36),
  StandardImport:       __webpack_require__(/*! ./StandardImport */ 15),
  Versioning:           __webpack_require__(/*! ./Versioning */ 39)
});
__webpack_require__(/*! ./Configurators */ 26);
__webpack_require__(/*! ./Data */ 18);

/***/ }),
/* 8 */
/*!****************************************************!*\
  !*** ./source/Art/Build/Configurator/namespace.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art/Build/Configurator/namespace.js

module.exports = __webpack_require__(/*! ../namespace */ 9).addNamespace(
  'Configurator',
  (class Configurator extends Neptune.PackageNamespace {})
  ._configureNamespace(__webpack_require__(/*! ../../../../package.json */ 5))
);
__webpack_require__(/*! ./Configurators/namespace */ 12);
__webpack_require__(/*! ./Data/namespace */ 13);

/***/ }),
/* 9 */
/*!***************************************!*\
  !*** ./source/Art/Build/namespace.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art/Build/namespace.js

module.exports = module.exports =  __webpack_require__(/*! ../namespace */ 10).vivifySubnamespace('Build');
__webpack_require__(/*! ./Configurator/namespace */ 8);

/***/ }),
/* 10 */
/*!*********************************!*\
  !*** ./source/Art/namespace.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art/namespace.js

module.exports = module.exports =  __webpack_require__(/*! neptune-namespaces */ 11).vivifySubnamespace('Art');
__webpack_require__(/*! ./Build/namespace */ 9);

/***/ }),
/* 11 */
/*!*************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 12 */
/*!******************************************************************!*\
  !*** ./source/Art/Build/Configurator/Configurators/namespace.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art/Build/Configurator/Configurators/namespace.js

module.exports = __webpack_require__(/*! ../namespace */ 8).addNamespace(
  'Configurators',
  class Configurators extends Neptune.PackageNamespace {}
);


/***/ }),
/* 13 */
/*!*********************************************************!*\
  !*** ./source/Art/Build/Configurator/Data/namespace.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art/Build/Configurator/Data/namespace.js

module.exports = __webpack_require__(/*! ../namespace */ 8).addNamespace(
  'Data',
  class Data extends Neptune.PackageNamespace {}
);


/***/ }),
/* 14 */
/*!********************************************************!*\
  !*** ./source/Art/Build/Configurator/Configurator.caf ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "log",
      "Promise",
      "path",
      "fs",
      "process",
      "ConfigurePackageJson",
      "merge",
      "compactFlatten",
      "formattedInspect",
      "ConfigureWebpack",
      "console"
    ],
    [global, __webpack_require__(/*! ./StandardImport */ 15), __webpack_require__(/*! ./Configurators */ 26)],
    (
      log,
      Promise,
      path,
      fs,
      process,
      ConfigurePackageJson,
      merge,
      compactFlatten,
      formattedInspect,
      ConfigureWebpack,
      console
    ) => {
      let realRequire, Configurator;
      realRequire = eval("require");
      return (Configurator = Caf.defClass(
        class Configurator extends Object {},
        function(Configurator, classSuper, instanceSuper) {
          this.configFilename = "art.build.config.caf";
          this.configBasename = "art.build.config";
          this.registerLoadersFilename = "register.js";
          this.go = (npmRoot, options) => {
            let pretend, configure, init, force;
            ({ pretend, configure, init, force } = options);
            if (pretend) {
              log("PRETEND.green");
            }
            return Promise.then(() => {
              if (init) {
                this.init(npmRoot, options);
              }
              return this.runNeptuneNamespaces(npmRoot);
            }).then(() => this.loadAndWriteConfig(npmRoot, options));
          };
          this.registerLoaders = (npmRoot, vivify = false) => {
            let file;
            file = path.join(npmRoot, this.registerLoadersFilename);
            return fs
              .exists(file)
              .then(exists =>
                exists
                  ? realRequire(file)
                  : (vivify
                      ? (this.init(npmRoot, {
                          verbose: true,
                          select: /register.js/
                        }),
                        realRequire(file))
                      : undefined,
                    {})
              );
          };
          this.loadConfig = (npmRoot, vivifyConfigFile = false) =>
            this.registerLoaders(npmRoot, vivifyConfigFile).then(() => {
              let configFilepath;
              configFilepath = path.join(process.cwd(), this.configBasename);
              return __webpack_require__(/*! glob-promise */ 33)(configFilepath + "*")
                .then(results =>
                  results.length > 0
                    ? realRequire(configFilepath)
                    : (vivifyConfigFile
                        ? this.init(npmRoot, {
                            verbose: true,
                            select: /art.build.config/
                          })
                        : undefined,
                      {})
                )
                .then(config => {
                  let p, packageFile;
                  config.npm || (config.npm = config.package);
                  p = config.npm
                    ? Promise.resolve(config.npm)
                    : fs
                        .exists(
                          (packageFile = path.join(
                            npmRoot,
                            ConfigurePackageJson.outFileName
                          ))
                        )
                        .then(exists =>
                          exists ? realRequire(packageFile) : {}
                        );
                  return p.then(finalNpm => merge(config, { npm: finalNpm }));
                });
            });
          this.init = function(npmRoot, options) {
            let wrote;
            log(`\nINIT: ${Caf.toString(npmRoot)}`);
            wrote = compactFlatten(
              __webpack_require__(/*! ./DefaultFiles */ 34)
                .getDefaultFiles(npmRoot, options)
                .write(options)
            );
            return log(`INIT: wrote ${Caf.toString(wrote.length)} files`);
          };
          this.pretendWriteConfig = function(npmRoot, abcConfig) {
            return log(
              formattedInspect(
                merge({
                  abcConfig,
                  npm: {
                    out: {
                      "package.json": ConfigurePackageJson.get(
                        npmRoot,
                        abcConfig
                      )
                    }
                  },
                  indexHtml: abcConfig.indexHtml
                    ? "<html>\n</html>"
                    : undefined,
                  webpack: {
                    configGeneratedOnDemand: ConfigureWebpack.get(
                      npmRoot,
                      abcConfig
                    ),
                    out: {
                      "webpack.config.js":
                        ConfigureWebpack.standardWebpackConfigJs
                    }
                  }
                }),
                { color: true }
              )
            );
          };
          this.runNeptuneNamespaces = function(npmRoot, options) {
            let executable, firstArg, isWebpackDevServer;
            [executable, firstArg] = process.argv;
            isWebpackDevServer = !!(
              executable.match(/\/node$/) &&
              (Caf.exists(firstArg) && firstArg.match(/webpack-dev-server/))
            );
            log(`\nNN: ${Caf.toString(npmRoot)}`);
            return __webpack_require__(/*! ./RunNeptuneNamespaces */ 36)(
              npmRoot,
              isWebpackDevServer
            );
          };
          this.loadAndWriteConfig = function(npmRoot, options) {
            let pretend, configure;
            ({ pretend, configure } = options);
            log(`\nCONFIGURE: ${Caf.toString(npmRoot)}`);
            return this.loadConfig(npmRoot, configure).then(abcConfig =>
              pretend
                ? this.pretendWriteConfig(npmRoot, abcConfig)
                : this.writeConfig(npmRoot, abcConfig)
            );
          };
          this.writeConfig = function(npmRoot, abcConfig) {
            ConfigurePackageJson.writeConfig(npmRoot, abcConfig);
            ConfigureWebpack.writeConfig(npmRoot, abcConfig);
            console.log("indexHtml?");
            return abcConfig.indexHtml ? console.log("indexHtml!") : undefined;
          };
          this.getWebpackConfig = (npmRoot, env, argv) =>
            this.loadConfig(npmRoot).then(abcConfig => {
              this.writeConfig(npmRoot, abcConfig);
              return this.runNeptuneNamespaces(npmRoot).then(() =>
                ConfigureWebpack.get(npmRoot, abcConfig, { env, argv })
              );
            });
          this.updateFile = function(fileName, contents) {
            let oldContents;
            if (fs.existsSync(fileName)) {
              oldContents = fs.readFileSync(fileName).toString();
            }
            return oldContents !== contents
              ? (log("writing: ".gray + fileName.green),
                fs.writeFileSync(fileName, contents))
              : log(`same:    ${Caf.toString(fileName)}`.gray);
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./source/Art/Build/Configurator/StandardImport.caf ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return __webpack_require__(/*! art-standard-lib */ 16).mergeWithSelf(
    __webpack_require__(/*! art-class-system */ 17),
    __webpack_require__(/*! ./Data */ 18),
    { Configurator: __webpack_require__(/*! ./namespace */ 8) },
    { fs: __webpack_require__(/*! fs-extra */ 25), path: __webpack_require__(/*! path */ 23) }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 16 */
/*!***********************************************************************************!*\
  !*** external "require('art-standard-lib' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-standard-lib' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 17 */
/*!***********************************************************************************!*\
  !*** external "require('art-class-system' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-class-system' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 18 */
/*!*****************************************************!*\
  !*** ./source/Art/Build/Configurator/Data/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art/Build/Configurator/Data/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 13))

.addModules({
  StandardDependencies:  __webpack_require__(/*! ./StandardDependencies */ 19),
  StandardPackageJson:   __webpack_require__(/*! ./StandardPackageJson */ 20),
  StandardWebpackConfig: __webpack_require__(/*! ./StandardWebpackConfig */ 22)
});

/***/ }),
/* 19 */
/*!*********************************************************************!*\
  !*** ./source/Art/Build/Configurator/Data/StandardDependencies.caf ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return { "art-build-configurator": "*" };
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 20 */
/*!********************************************************************!*\
  !*** ./source/Art/Build/Configurator/Data/StandardPackageJson.caf ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["peek", "process", "JSON", "merge"],
    [global, __webpack_require__(/*! art-standard-lib */ 16)],
    (peek, process, JSON, merge) => {
      let StandardPackageJson;
      return (StandardPackageJson = Caf.defClass(
        class StandardPackageJson extends Object {},
        function(StandardPackageJson, classSuper, instanceSuper) {
          this.get = function(abcConfig) {
            let base, base1;
            return {
              license: "ISC",
              name: peek(process.cwd().split("/")),
              version: __webpack_require__(/*! fs */ 21).existsSync("package.json")
                ? JSON.parse(
                    __webpack_require__(/*! fs */ 21)
                      .readFileSync("package.json")
                      .toString()
                  ).version
                : "0.0.1",
              author: 'Shane Brinkman-Davis Delamore, Imikimi LLC"',
              dependencies: __webpack_require__(/*! ./StandardDependencies */ 19),
              scripts: merge({
                test:
                  Caf.exists(abcConfig) &&
                  (Caf.exists((base = abcConfig.target)) && base.node)
                    ? "nn -s;mocha -u tdd"
                    : "webpack-dev-server  --progress --env.devServer",
                start:
                  "webpack-dev-server --hot --inline --progress --env.devServer",
                testInBrowser:
                  Caf.exists(abcConfig) &&
                  (Caf.exists((base1 = abcConfig.target)) && base1.node)
                    ? "webpack-dev-server --progress --env.devServer"
                    : undefined,
                build: "webpack --progress"
              })
            };
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 21 */
/*!*********************************************************************!*\
  !*** external "require('fs' /* ABC - not inlining fellow NPM *_/)" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('fs' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 22 */
/*!**********************************************************************!*\
  !*** ./source/Art/Build/Configurator/Data/StandardWebpackConfig.caf ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["getEnv"],
    [global, __webpack_require__(/*! art-standard-lib */ 16)],
    getEnv => {
      let StandardWebpackConfig;
      return (StandardWebpackConfig = Caf.defClass(
        class StandardWebpackConfig extends Object {},
        function(StandardWebpackConfig, classSuper, instanceSuper) {
          this.get = function(npmRoot, abcConfig, targetNode) {
            let outputPath, temp, temp1;
            outputPath =
              undefined !== (temp = abcConfig.webpack.outputPath)
                ? temp
                : "build";
            return {
              mode:
                (temp1 = getEnv().webpackMode) != null
                  ? temp1
                  : targetNode
                  ? "none"
                  : "development",
              resolve: {
                extensions: [
                  ".webpack.js",
                  ".web.js",
                  ".coffee",
                  ".caf",
                  ".caffeine",
                  ".js",
                  ".json"
                ]
              },
              output: {
                path: __webpack_require__(/*! path */ 23).join(npmRoot, outputPath),
                filename: "[name].js"
              },
              plugins: [new (__webpack_require__(/*! case-sensitive-paths-webpack-plugin */ 24))()],
              module: {
                rules: [
                  {
                    test: /\.caf(feine)?$/,
                    use: {
                      loader: "caffeine-mc/webpack-loader",
                      options: { prettier: true }
                    }
                  },
                  { test: /\.coffee$/, use: { loader: "coffee-loader" } },
                  {
                    test: /\.(coffee\.md|litcoffee)$/,
                    use: { loader: "coffee-loader?literate" }
                  },
                  { test: /\.css$/, use: ["style-loader", "css-loader"] },
                  {
                    test: /\.png$/,
                    use: { loader: "url-loader?limit=100000" }
                  },
                  { test: /\.jpg$/, use: { loader: "file-loader" } }
                ]
              }
            };
          };
          this.js =
            'module.exports = (env, argv) => require("art-build-configurator").getWebpackConfig(__dirname, env, argv);';
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 23 */
/*!***********************************************************************!*\
  !*** external "require('path' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('path' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 24 */
/*!******************************************************************************************************!*\
  !*** external "require('case-sensitive-paths-webpack-plugin' /* ABC - not inlining fellow NPM *_/)" ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('case-sensitive-paths-webpack-plugin' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 25 */
/*!***************************************************************************!*\
  !*** external "require('fs-extra' /* ABC - not inlining fellow NPM *_/)" ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('fs-extra' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 26 */
/*!**************************************************************!*\
  !*** ./source/Art/Build/Configurator/Configurators/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art/Build/Configurator/Configurators/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 12))

.addModules({
  ConfigureBase:        __webpack_require__(/*! ./ConfigureBase */ 27),
  ConfigureIndexHtml:   __webpack_require__(/*! ./ConfigureIndexHtml */ 28),
  ConfigurePackageJson: __webpack_require__(/*! ./ConfigurePackageJson */ 30),
  ConfigureWebpack:     __webpack_require__(/*! ./ConfigureWebpack */ 31)
});

/***/ }),
/* 27 */
/*!***********************************************************************!*\
  !*** ./source/Art/Build/Configurator/Configurators/ConfigureBase.caf ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "Configurator", "path"],
    [global, __webpack_require__(/*! ../StandardImport */ 15)],
    (BaseClass, Configurator, path) => {
      let ConfigureBase;
      return (ConfigureBase = Caf.defClass(
        class ConfigureBase extends BaseClass {},
        function(ConfigureBase, classSuper, instanceSuper) {
          this.outFileName = "index.html";
          this.getFileContents = function(npmRoot, abcConfig) {
            return this.get(npmRoot, abcConfig) + "\n";
          };
          this.writeConfig = function(npmRoot, abcConfig) {
            return Configurator.updateFile(
              path.join(npmRoot, this.outFileName),
              this.getFileContents(npmRoot, abcConfig)
            );
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 28 */
/*!****************************************************************************!*\
  !*** ./source/Art/Build/Configurator/Configurators/ConfigureIndexHtml.caf ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Html", "Body", "Ul", "Li", "A"],
    [
      global,
      __webpack_require__(/*! ../StandardImport */ 15),
      __webpack_require__(/*! art-browser-tools */ 29).DomElementFactories
    ],
    (Html, Body, Ul, Li, A) => {
      let ConfigureIndexHtml;
      return (ConfigureIndexHtml = Caf.defClass(
        class ConfigureIndexHtml extends __webpack_require__(/*! ./ConfigureBase */ 27) {},
        function(ConfigureIndexHtml, classSuper, instanceSuper) {
          this.outFileName = "index.html";
          this.get = (npmRoot, abcConfig) =>
            Html(
              Body(
                Ul(
                  Caf.array(["Client", "Admin"], target =>
                    Li(
                      A({ href: `./${Caf.toString(target)}` }, target),
                      "(",
                      A({ href: `./${Caf.toString(target)}?dev` }, "dev"),
                      ")"
                    )
                  )
                )
              )
            );
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 29 */
/*!************************************************************************************!*\
  !*** external "require('art-browser-tools' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-browser-tools' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 30 */
/*!******************************************************************************!*\
  !*** ./source/Art/Build/Configurator/Configurators/ConfigurePackageJson.caf ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "isFunction",
      "StandardPackageJson",
      "deepMerge",
      "consistentJsonStringify"
    ],
    [global, __webpack_require__(/*! ../StandardImport */ 15)],
    (isFunction, StandardPackageJson, deepMerge, consistentJsonStringify) => {
      let ConfigurePackageJson;
      return (ConfigurePackageJson = Caf.defClass(
        class ConfigurePackageJson extends __webpack_require__(/*! ./ConfigureBase */ 27) {},
        function(ConfigurePackageJson, classSuper, instanceSuper) {
          this.outFileName = "package.json";
          this.get = (npmRoot, abcConfig) => {
            let npmConfig;
            return isFunction((npmConfig = abcConfig.npm))
              ? npmConfig(StandardPackageJson.get(abcConfig))
              : deepMerge(StandardPackageJson.get(abcConfig), npmConfig);
          };
          this.getFileContents = (npmRoot, abcConfig) =>
            consistentJsonStringify(this.get(npmRoot, abcConfig), "  ") + "\n";
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 31 */
/*!**************************************************************************!*\
  !*** ./source/Art/Build/Configurator/Configurators/ConfigureWebpack.caf ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "StandardWebpackConfig",
      "webpackMerge",
      "compactFlatten",
      "objectWithout",
      "objectKeyCount",
      "merge",
      "isRegExp",
      "isFunction",
      "isPlainObject",
      "Error",
      "String"
    ],
    [
      global,
      __webpack_require__(/*! ../StandardImport */ 15),
      __webpack_require__(/*! ../Data */ 18),
      { webpackMerge: __webpack_require__(/*! webpack-merge */ 32) }
    ],
    (
      StandardWebpackConfig,
      webpackMerge,
      compactFlatten,
      objectWithout,
      objectKeyCount,
      merge,
      isRegExp,
      isFunction,
      isPlainObject,
      Error,
      String
    ) => {
      let nodeExternals, Configurator, ConfigureWebpack;
      nodeExternals = null;
      Configurator = __webpack_require__(/*! ./namespace */ 12);
      return (ConfigureWebpack = Caf.defClass(
        class ConfigureWebpack extends __webpack_require__(/*! ./ConfigureBase */ 27) {},
        function(ConfigureWebpack, classSuper, instanceSuper) {
          this.outFileName = "webpack.config.js";
          this.get = (npmRoot, abcConfig, webpackConfigOptions) => {
            let env,
              devServer,
              argv,
              config,
              common,
              targets,
              targetNode,
              standard,
              baseConfig,
              entriesWithNoOverrides,
              temp,
              base;
            abcConfig != null ? abcConfig : (abcConfig = {});
            if (Caf.exists(webpackConfigOptions)) {
              env = webpackConfigOptions.env;
              if (Caf.exists(env)) {
                devServer = env.devServer;
              }
              argv = webpackConfigOptions.argv;
            }
            temp = config = abcConfig.webpack || (abcConfig.webpack = {});
            common = temp.common;
            targets = temp.targets;
            targetNode =
              !devServer &&
              !!(Caf.exists((base = abcConfig.target)) && base.node);
            standard = StandardWebpackConfig.get(
              npmRoot,
              abcConfig,
              targetNode
            );
            baseConfig = webpackMerge(standard, common);
            targets || (targets = { index: {} });
            entriesWithNoOverrides = null;
            return compactFlatten(
              Caf.array(this.normalizeTargets(targets), targetConfig => {
                let includeNpms, keys, webpackEntry;
                ({ includeNpms } = targetConfig);
                if (includeNpms) {
                  targetConfig = objectWithout(targetConfig, "includeNpms");
                }
                return !entriesWithNoOverrides ||
                  (keys = 1 < objectKeyCount(targetConfig))
                  ? ((webpackEntry = webpackMerge(baseConfig, targetConfig)),
                    targetNode
                      ? webpackEntry.target || (webpackEntry.target = "node")
                      : undefined,
                    (config = this.normalizeTargetConfig(
                      webpackEntry,
                      includeNpms
                    )),
                    !keys ? (entriesWithNoOverrides = config) : undefined,
                    config)
                  : ((entriesWithNoOverrides.entry = merge(
                      entriesWithNoOverrides.entry,
                      targetConfig.entry
                    )),
                    null);
              })
            );
          };
          this.getTargets = function() {};
          this.normalizeTargetConfig = function(targetConfig, includeNpms) {
            return targetConfig.target === "node"
              ? webpackMerge(
                  {
                    output: { libraryTarget: "commonjs2", pathinfo: true },
                    externals: [
                      nodeExternals ||
                        (nodeExternals = (context, request, callback) => {
                          let shouldInclude;
                          return request.match(/^[^.]/)
                            ? ((shouldInclude = includeNpms
                                ? (() => {
                                    switch (false) {
                                      case !isRegExp(includeNpms):
                                        return includeNpms.test(request);
                                      case !isFunction(includeNpms):
                                        return includeNpms(request);
                                    }
                                  })()
                                : undefined),
                              shouldInclude
                                ? callback()
                                : callback(
                                    null,
                                    `root require('${Caf.toString(
                                      request
                                    )}' /* ABC - not inlining fellow NPM */)`
                                  ))
                            : callback();
                        })
                    ]
                  },
                  targetConfig
                )
              : webpackMerge({ output: { pathinfo: true } }, targetConfig);
          };
          this.normalizeTargets = function(targets = {}) {
            let from, into, temp;
            if (!isPlainObject(targets)) {
              throw new Error("targets must be an object");
            }
            return (
              (from = targets),
              (into = {}),
              from != null
                ? (() => {
                    for (let k in from) {
                      let targetConfig, targetName, entry;
                      targetConfig = from[k];
                      targetName = k;
                      temp = targetConfig
                        ? (into[k] = (Caf.is(
                            (entry = targetConfig.entry),
                            String
                          )
                            ? (targetConfig = objectWithout(
                                targetConfig,
                                "entry"
                              ))
                            : undefined,
                          webpackMerge(
                            {
                              entry: {
                                [targetName]:
                                  entry != null
                                    ? entry
                                    : `./${Caf.toString(targetName)}`
                              }
                            },
                            targetConfig
                          )))
                        : undefined;
                    }
                    return temp;
                  })()
                : undefined,
              into
            );
          };
          this.getFileContents = function() {
            return StandardWebpackConfig.js;
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 32 */
/*!********************************************************************************!*\
  !*** external "require('webpack-merge' /* ABC - not inlining fellow NPM *_/)" ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('webpack-merge' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 33 */
/*!*******************************************************************************!*\
  !*** external "require('glob-promise' /* ABC - not inlining fellow NPM *_/)" ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('glob-promise' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 34 */
/*!********************************************************!*\
  !*** ./source/Art/Build/Configurator/DefaultFiles.caf ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseClass",
      "getCapitalizedCodeWords",
      "peek",
      "log",
      "fileBuilder",
      "merge",
      "dashCase",
      "process"
    ],
    [global, __webpack_require__(/*! ./StandardImport */ 15), __webpack_require__(/*! art-filebuilder */ 35)],
    (
      BaseClass,
      getCapitalizedCodeWords,
      peek,
      log,
      fileBuilder,
      merge,
      dashCase,
      process
    ) => {
      let path, DefaultFiles;
      path = __webpack_require__(/*! path */ 23);
      return (DefaultFiles = Caf.defClass(
        class DefaultFiles extends BaseClass {},
        function(DefaultFiles, classSuper, instanceSuper) {
          this.getDefaultFiles = function(
            npmRoot = process.cwd(),
            options = {}
          ) {
            let app,
              clientApp,
              demoApp,
              npmName,
              namespacePath,
              namespaceDirPath,
              cafRequireFriendlyNamespaceDirPath,
              mostSpecificName,
              projectDotName;
            ({ app } = options);
            if (app === "demo") {
              clientApp = true;
              demoApp = true;
            } else {
              if (app != null) {
                clientApp = true;
              }
            }
            npmName = path.basename(npmRoot);
            namespacePath = getCapitalizedCodeWords(npmName);
            namespaceDirPath = namespacePath.join(".");
            cafRequireFriendlyNamespaceDirPath = namespacePath
              .join("")
              .replace(".", "");
            mostSpecificName = peek(namespacePath);
            projectDotName = namespacePath.join(".");
            log("-----------------------------------------");
            log(
              clientApp
                ? demoApp
                  ? "Initializing Demo ArtSuite client app."
                  : "Initializing Minimal ArtSuite client app."
                : "Initializing Basic ArtSuite NPM Module."
            );
            log("-----------------------------------------");
            log({
              InitAppInfo: {
                name: mostSpecificName,
                npmName,
                NeptuneNamespace: projectDotName
              }
            });
            return fileBuilder(
              merge(
                {
                  ".gitignore": "node_modules/",
                  ".travis.yml": 'language: node_js\nnode_js:\n  - "6"',
                  "package.json": "{}",
                  "register.js":
                    "require('coffee-script/register'); require('caffeine-mc/register');",
                  "art.build.config.caf": `target:\n  ##\n    configures for standard node-targeted library\n    NOTE: node-targeted libraries can also be built into broswer-targeted libraries.\n      They just can't be used *directly* in the browser\n  node: ${Caf.toString(
                    !clientApp
                  )}\n\nnpm:\n  description: "" ${Caf.toString(
                    projectDotName
                  )}\n  dependencies: ${Caf.toString(
                    clientApp
                      ? "art-suite-clientApp: :git://github.com/imikimi/art-suite-clientApp"
                      : "{}"
                  )}\n\nwebpack:\n  # common properties are merged into each target's properties\n  common: ${Caf.toString(
                    clientApp ? "mode: :development" : "{}"
                  )}\n\n  # each target's individual properties\n  targets: ${Caf.toString(
                    clientApp ? "Client" : "index"
                  )}: {}`
                },
                clientApp
                  ? {
                      "Client.caf": `&source/${Caf.toString(
                        cafRequireFriendlyNamespaceDirPath
                      )}/Client`,
                      "index.html":
                        '<html><body>\n  <h1>Development</h1>\n  <ul>\n    <li><a href="/Client?dev=true">Client</a></li>\n  </ul>\n  <h1>Production</h1>\n  <ul>\n    <li><a href="/Client">Client</a></li>\n  </ul>\n</body></html>'
                    }
                  : {
                      "index.js":
                        "if (false) { // use build? - true == fase, false == good for development\n  module.exports = require('./build');\n} else {\n  require('./register');\n  module.exports = require('./index.caf');\n};",
                      "index.caf": `&source/${Caf.toString(
                        cafRequireFriendlyNamespaceDirPath
                      )}`
                    },
                {
                  "README.md": `# ${Caf.toString(
                    projectDotName
                  )}\n\n> Initialized by Art.Build.Configurator\n\n### Install\n\n\`\`\`coffeescript\nnpm install ${Caf.toString(
                    dashCase(npmName)
                  )}\n\`\`\``,
                  test: {
                    "index.html":
                      '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8"/>\n  </head>\n  <body>\n    <script type="text/javascript" charset="utf-8" src="/test.js">\n  </body>\n</html>',
                    "index.js":
                      "require('../register');\nrequire('./index.caf');",
                    "index.caf":
                      "require '../index.caf'\n&art-testbench/testing\n.init\n  synchronous: true\n  defineTests: -> &tests",
                    "StandardImport.caf":
                      "&ArtStandardLib.merge &ArtStandardLib, &ArtClassSystem, test: (args...) -> global.test args...",
                    tests: {
                      [namespaceDirPath]: {
                        "Test.caf": `import &StandardImport\nsuite: ->\n  test '${Caf.toString(
                          mostSpecificName
                        )}' -> assert.eq 1, 1`
                      }
                    }
                  },
                  source: {
                    [namespaceDirPath]: {
                      "StandardImport.caf": clientApp
                        ? "&ArtSuite"
                        : "&ArtStandardLib.merge &ArtStandardLib, &ArtClassSystem",
                      Client: clientApp
                        ? !demoApp
                          ? {
                              "Main.caf": `import &StandardImport\n\n&ArtSuiteApp.initArtSuiteClient\n  title:         :${Caf.toString(
                                projectDotName
                              )}\n  MainComponent:\n    class CanvasComponent extends Component\n\n      render: ->\n        CanvasElement\n          draw: #eee\n\n          TextElement\n            padding: 10\n            text: "" 'Hello world!' - ${Caf.toString(
                                projectDotName
                              )}`
                            }
                          : {
                              "Main.caf": `import &StandardImport\n&Models\n&Pipelines\n\n&ArtSuiteApp.initArtSuiteClient\n  title:         :${Caf.toString(
                                projectDotName
                              )}\n  MainComponent:\n    class CanvasComponent extends Component\n\n      render: ->\n        CanvasElement &Components/App()`,
                              Components: {
                                "User.caf":
                                  "import &StandardImport\n\nclass User extends FluxComponent\n  @subscriptions :navState.alignUsersLeft\n\n  render: ->\n    Element\n      size: ww: 1 hch: 1\n      TextElement\n        &TextStyles.text\n        size: ww: 1 hch: 1\n        align: if @alignUsersLeft then :left else :right\n        animators: align: true\n        text: @props.user?.name",
                                "Users.caf":
                                  'import &StandardImport\n\nclass Users extends FluxComponent\n  @subscriptions allUsers: ""\n\n  render: ->\n    ScrollElement\n      clip: true\n      childrenMargins: 10\n      array user from @allUsers with &User {user}',
                                "App.caf": `import &StandardImport\n\nclass App extends FluxComponent\n  @subscriptions :navState.alignUsersLeft\n\n  addUser: ->\n    @models.user.create data: name: randomElement\n      ""\n        Craig   David   Elle      Frank\n        Greg    Hank    Ian       Jan\n        Kelly   Lois    Mary      Noah\n        Piper   Quinn   Robert    Sally\n        Tuck    Udy     Violette  William\n        Xavier  Yesler  Zane\n      .split /\\s+/\n\n    .then ->\n      @models.allUsers.reload ""\n\n  render: ->\n    Element\n      &StyleProps.background\n\n      Element\n        padding: 10\n        childrenLayout:   :column\n        childrenMargins:  10\n\n        Element\n          margin: 10\n          size: ww: 1 hch: 1\n          childrenLayout:     :row\n          childrenAlignment:  :centerLeft\n          childrenMargins:    10\n          TextElement &TextStyles.titleText, text: "${Caf.toString(
                                  projectDotName
                                )} Users"\n\n          &Button\n            text:   :add-user\n            action: @addUser\n\n          Element()\n\n          &Button\n            text: if @alignUsersLeft then 'alignment: left' else 'alignment: right'\n            action: @models.navState.toggleAlignUsersLeft\n\n        &Users()`,
                                "Button.caf":
                                  "import &StandardImport\n\nclass Button extends PointerActionsMixin Component\n\n  render: ->\n    Element\n      on:         @pointerHandlers\n      size:       cs: 1\n      padding:    10\n      cursor:     :pointer\n      animators:  :draw\n      draw:\n        rectangle: radius: 5\n        &Palette[if @hover then :secondary else :primary]\n\n      TextElement\n        &TextStyles.text\n        color:  &TextPalette.white.primary\n        text:   @props.text"
                              },
                              "StyleProps.caf":
                                "import &StandardImport\nclass StyleProps extends HotStyleProps\n  @background: draw: #f7f7f7",
                              "Palette.caf":
                                "import &StandardImport\nclass Palette extends HotStyleProps\n  @primary: #48f\n  @secondary: #f49",
                              "TextPalette.caf":
                                "import &StandardImport\nclass TextStyles extends HotStyleProps\n  @black:\n    primary:          rgbColor #000000d2\n    secondary:        rgbColor #0008\n    disabled:         rgbColor #0004\n\n  @white:\n    primary:          rgbColor #fffd\n    secondary:        rgbColor #fff8\n    disabled:         rgbColor #fff4",
                              "TextStyles.caf":
                                "import &StandardImport\nclass TextStyles extends HotStyleProps\n  @text:\n    fontFamily: :sans-serif\n    color: &TextPalette.black.secondary\n\n  @titleText:\n    fontSize:   24\n    fontWeight: :bold\n    fontFamily: :sans-serif\n    color: &TextPalette.black.primary",
                              Models: {
                                "NavState.caf":
                                  "import &StandardImport\n\nclass NavState extends ApplicationState\n  @stateFields\n    alignUsersLeft: true"
                              }
                            }
                        : undefined,
                      Pipelines: demoApp && {
                        "User.caf":
                          "import &StandardImport\n\nclass User extends Pipeline\n  @query\n    allUsers: (request) -> array request.pipeline.db\n\n  constructor: ->\n    super\n    @db =\n      abc123: id: :abc123 name: :Alice\n      efg456: id: :efg456 name: :Bill\n\n  @handlers\n    get: ({key}) ->\n      @db[key]\n\n    create: ({data}) ->\n      key = randomString()\n      @db[key] = merge data, {} key\n\n    update: ({data, key}) ->\n      if @db[key]\n        @db[key] = merge @db[key], data\n\n    delete: ({key}) ->\n      if @db[key]\n        @db = objectWithout @db, key\n        true"
                      }
                    }
                  }
                }
              )
            );
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 35 */
/*!**********************************************************************************!*\
  !*** external "require('art-filebuilder' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-filebuilder' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 36 */
/*!****************************************************************!*\
  !*** ./source/Art/Build/Configurator/RunNeptuneNamespaces.caf ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Promise", "log"],
    [global, __webpack_require__(/*! ./StandardImport */ 15)],
    (Promise, log) => {
      let NeptuneNamespacesGenerator;
      NeptuneNamespacesGenerator = __webpack_require__(/*! neptune-namespaces/generator */ 37);
      return function(dirname, watch) {
        let existingRoots, workers;
        existingRoots = Caf.array(
          NeptuneNamespacesGenerator.standardRoots,
          root => root,
          root =>
            __webpack_require__(/*! fs */ 21).existsSync(
              `${Caf.toString(dirname)}/${Caf.toString(root)}`
            )
        );
        Caf.array(existingRoots, root =>
          log(
            "neptune-namespaces scanning: ".grey +
              `${Caf.toString(
                __webpack_require__(/*! path */ 23).basename(dirname)
              )}/${Caf.toString(root)}/*`.green
          )
        );
        workers = Caf.array(existingRoots, root =>
          NeptuneNamespacesGenerator.generate(
            `${Caf.toString(dirname)}/${Caf.toString(root)}/*`,
            { watch }
          )
        );
        return Promise.all(workers).then(() =>
          log(
            "neptune-namespaces: ".grey +
              `done with ${Caf.toString(
                watch ? "initial " : ""
              )}namespace generation`.green
          )
        );
      };
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 37 */
/*!***********************************************************************************************!*\
  !*** external "require('neptune-namespaces/generator' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces/generator' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 38 */
/*!***************************************************!*\
  !*** ./source/Art/Build/Configurator/Publish.caf ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  let notPublished = global.notPublished,
    tagName;
  return notPublished
    ? ((tagName = "published"),
      `npm publish\ngit tag -f ${Caf.toString(
        tagName
      )}\ngit push origin "${Caf.toString(tagName)}" --force`)
    : undefined;
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 39 */
/*!******************************************************!*\
  !*** ./source/Art/Build/Configurator/Versioning.caf ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "JSON"],
    [global, __webpack_require__(/*! ./StandardImport */ 15)],
    (BaseClass, JSON) => {
      let Versioning;
      return (Versioning = Caf.defClass(
        class Versioning extends BaseClass {},
        function(Versioning, classSuper, instanceSuper) {
          this.classGetter({
            current: function() {
              return JSON.parse(
                __webpack_require__(/*! fs */ 21)
                  .readFileSync("package.json")
                  .toString()
              ).version;
            }
          });
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ })
/******/ ]);