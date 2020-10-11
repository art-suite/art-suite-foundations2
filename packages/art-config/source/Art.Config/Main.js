// Generated by CoffeeScript 1.12.7
(function() {
  var ConfigRegistry, Main, Promise, clone, compactFlatten, deepMerge, defineModule, expandPathedProperties, formattedInspect, getExternalEnvironment, inspect, isPlainObject, isString, log, merge, mergeInto, normalizeArtConfigName, parseQuery, pushIfNotPresent, ref, ref1, upperCamelCase,
    slice = [].slice;

  ref = require('art-standard-lib'), defineModule = ref.defineModule, log = ref.log, Promise = ref.Promise, inspect = ref.inspect, formattedInspect = ref.formattedInspect, merge = ref.merge, deepMerge = ref.deepMerge, mergeInto = ref.mergeInto, parseQuery = ref.parseQuery, pushIfNotPresent = ref.pushIfNotPresent, isPlainObject = ref.isPlainObject, isString = ref.isString, upperCamelCase = ref.upperCamelCase, expandPathedProperties = ref.expandPathedProperties, clone = ref.clone, compactFlatten = ref.compactFlatten;

  ConfigRegistry = require('./ConfigRegistry');

  ref1 = require('./Lib'), normalizeArtConfigName = ref1.normalizeArtConfigName, getExternalEnvironment = ref1.getExternalEnvironment;

  defineModule(module, Main = (function() {
    var getArtConfig, getArtConfigName, getDefaultArtConfigName, setArtConfigName;

    function Main() {}

    Main.getArtConfigName = getArtConfigName = function() {
      return Neptune.Art.Config.configName;
    };

    Main.getArtConfig = getArtConfig = function() {
      return Neptune.Art.Config.config;
    };

    Main.getDefaultArtConfigName = getDefaultArtConfigName = function() {
      return Neptune.Art.Config.defaultArtConfigName;
    };


    /* getArtConfigSave
      OUT: artConfig, but only the non-default values
     */

    Main.getArtConfigSave = function() {
      var configurable, i, len, out, ref2, saveConfig;
      out = {};
      ref2 = ConfigRegistry.configurables;
      for (i = 0, len = ref2.length; i < len; i++) {
        configurable = ref2[i];
        if (saveConfig = configurable.getConfigSave()) {
          mergeInto(out, saveConfig);
        }
      }
      return out;
    };

    setArtConfigName = function(name) {
      return Neptune.Art.Config.configName = name;
    };


    /*
    IN: configureOptions:
      artConfigName: string
        can be passed in:
          as an argument
          via process.env
          via the browser query string
    
        default: "Development"
    
        EFFECT:
          ArtConfig.configName =
            externalEnvironment.artConfigName ||
            artConfigName
    
      artConfig: JSON string OR plain object structure
        can be passed in:
          as an argument
          via process.env
          via the browser query string
    
        default: {}
    
        EFFECT:
          mergeInto ArtConfig.config, deepMerge
            ConfigRegistry.configs[artConfigName]
            global.artConfig
            artConfig
            externalEnvironment.artConfig
    
      onConfig: (config) ->
        gets called as soon as config completes with the final config
    
    EFFECTS:
      callback @artConfig for callback in ConfigRegistry.configurables
    
    Note the priority order of artConfig sources:
    
    Priority:
      #1. externalEnvironment.artConfig
      #2. the artConfig passed into configure
    
    
    EXAMPLES:
       * artConfig = verbose: true
      ConfigRegistry.configure
        verbose: true
    
       * artConfig = verbose: true
       * artConfigName = "Production"
      ConfigRegistry.configure
        artConfigName: "Production"
        verbose: true
    
       * artConfig = verbose: true
       * artConfigName = "Production"
      ConfigRegistry.configure
        artConfigName: "Production"
        artConfig: verbose: true
    
    TEST INPUTS: the second and third inputs are env and
      queryString, and are only there as mocks for testing.
     */

    Main.configure = function() {
      var __testEnv, artConfigArgument, artConfigNameArgument, c, conf, config, configName, configurable, configureOptions, defaultArtConfigName, externalEnvironment, i, len, obj, onConfig, ref2, ref3, ref4, verbose;
      configureOptions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      ref2 = Main.configureOptions = deepMerge.apply(null, configureOptions), artConfigNameArgument = ref2.artConfigName, artConfigArgument = ref2.artConfig, __testEnv = ref2.__testEnv, onConfig = ref2.onConfig;
      externalEnvironment = getExternalEnvironment(__testEnv);
      config = getArtConfig();
      defaultArtConfigName = getDefaultArtConfigName();
      configName = normalizeArtConfigName(externalEnvironment.artConfigName || artConfigNameArgument || global.artConfigName) ? (configName = normalizeArtConfigName(externalEnvironment.artConfigName || artConfigNameArgument || global.artConfigName), configName && !ConfigRegistry.configs[configName] ? log.warn("ArtConfig.configure: no config registered with name: '" + configName + "'") : void 0, configName) : defaultArtConfigName;
      setArtConfigName(configName);
      Main.resetCurrentConfig();
      ref3 = compactFlatten([
        (function() {
          var j, len, ref3, results;
          ref3 = ConfigRegistry.configurables;
          results = [];
          for (j = 0, len = ref3.length; j < len; j++) {
            configurable = ref3[j];
            results.push(configurable.getPathedDefaultConfig());
          }
          return results;
        })(), ConfigRegistry.configs[configName], global.artConfig, artConfigArgument, externalEnvironment.artConfig
      ]);
      for (i = 0, len = ref3.length; i < len; i++) {
        conf = ref3[i];
        expandPathedProperties(conf, config);
      }
      verbose = config.verbose;
      verbose || (verbose = (ref4 = Main.configureOptions) != null ? ref4.verbose : void 0);
      if (verbose) {
        log("------------- ConfigRegistry: inputs");
        log({
          ConfigRegistry: {
            configNames: Object.keys(ConfigRegistry.configs),
            configurables: (function() {
              var j, len1, ref5, results;
              ref5 = ConfigRegistry.configurables;
              results = [];
              for (j = 0, len1 = ref5.length; j < len1; j++) {
                c = ref5[j];
                results.push(c.namespacePath);
              }
              return results;
            })(),
            setConfigName: {
              algorithm: "select LAST non-null",
              inputs: {
                defaultArtConfigName: defaultArtConfigName,
                "global.artConfigName": global.artConfigName,
                "arguments.artConfigName": artConfigNameArgument,
                "environment.artConfigName": externalEnvironment.artConfigName
              }
            },
            setConfig: {
              algorithm: "deep, pathed merge-all, LAST has priority",
              inputs: (
                obj = {
                  defaultConfigs: (function() {
                  var j, len1, ref5, results;
                  ref5 = ConfigRegistry.configurables;
                  results = [];
                  for (j = 0, len1 = ref5.length; j < len1; j++) {
                    configurable = ref5[j];
                    results.push(configurable.getPathedDefaultConfig());
                  }
                  return results;
                })()
                },
                obj["configs." + configName] = ConfigRegistry.configs[configName],
                obj["global.artConfig"] = global.artConfig,
                obj["arguments.artConfig"] = artConfigArgument,
                obj["environment.artConfig"] = externalEnvironment.artConfig,
                obj
              )
            }
          }
        });
        log("------------- ConfigRegistry: configuring Configurables...");
      }
      Main._configureAllConfigurables();
      if (verbose) {
        log("------------- ConfigRegistry: configured");
        log({
          Art: {
            configName: configName,
            config: config
          }
        });
        log("------------- ConfigRegistry: done");
      }
      if (typeof onConfig === "function") {
        onConfig(config);
      }
      global.artConfig = config;
      global.artConfigName = configName;
      return config;
    };

    Main.resetCurrentConfig = function() {
      var config, k, results, v;
      config = getArtConfig();
      results = [];
      for (k in config) {
        v = config[k];
        results.push(delete config[k]);
      }
      return results;
    };

    Main.reload = function() {
      return Main.configure(Main.configureOptions);
    };

    Main._configureAllConfigurables = function() {
      var configurable, i, len, ref2;
      ref2 = ConfigRegistry.configurables;
      for (i = 0, len = ref2.length; i < len; i++) {
        configurable = ref2[i];
        configurable.configure(getArtConfig());
      }
      return this._notifyConfigurablesConfigured();
    };

    Main._notifyConfigurablesConfigured = function() {
      var configurable, i, len, ref2, results;
      ref2 = ConfigRegistry.configurables;
      results = [];
      for (i = 0, len = ref2.length; i < len; i++) {
        configurable = ref2[i];
        results.push(configurable.configured());
      }
      return results;
    };

    return Main;

  })());

}).call(this);
