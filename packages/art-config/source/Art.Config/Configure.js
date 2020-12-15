"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["deepMerge", "getExternalEnvironment", "_getArtConfig", "normalizeArtConfigName", "ConfigRegistry", "getDefaultArtConfigName", "setArtConfigName", "compactFlatten", "expandPathedProperties", "_getArtConfigName", "Object", "_resetArtConfigName"], [global, require('art-standard-lib'), require('./Lib'), require('./PublicLib'), {ConfigRegistry: require('./ConfigRegistry')}], (deepMerge, getExternalEnvironment, _getArtConfig, normalizeArtConfigName, ConfigRegistry, getDefaultArtConfigName, setArtConfigName, compactFlatten, expandPathedProperties, _getArtConfigName, Object, _resetArtConfigName) => {let Configure; return Configure = Caf.defClass(class Configure extends Object {}, function(Configure, classSuper, instanceSuper) {this._lastConfigurationOptions = null; this.configure = (...configureOptions) => {let log, verbose, artConfigNameArgument, artConfigArgument, __testEnv, onConfig, externalEnvironment, artConfig, artConfigName, temp; ({log = require('art-standard-lib').log, verbose, artConfigName: artConfigNameArgument, artConfig: artConfigArgument, __testEnv, onConfig} = this._lastConfigurationOptions = deepMerge(...configureOptions)); externalEnvironment = getExternalEnvironment(__testEnv); artConfig = _getArtConfig(); artConfigName = ((temp = normalizeArtConfigName(externalEnvironment.artConfigName || artConfigNameArgument || global.artConfigName) ? (artConfigName = normalizeArtConfigName(externalEnvironment.artConfigName || artConfigNameArgument || global.artConfigName), (artConfigName && !ConfigRegistry.configs[artConfigName] && artConfigName !== "Test") ? log(`ArtConfig.configure: no artConfig registered with name: '${Caf.toString(artConfigName)}'`) : undefined, artConfigName) : undefined) != null ? temp : getDefaultArtConfigName()); this._eraseAllConfiguration(); setArtConfigName(artConfigName); Caf.each2(compactFlatten([Caf.array(ConfigRegistry.configurables, (configurable) => configurable.getPathedDefaultConfig()), ConfigRegistry.configs[artConfigName], global.artConfig, artConfigArgument, externalEnvironment.artConfig]), (conf) => expandPathedProperties(conf, artConfig)); if (verbose) {log("------------- ArtConfig.configure: inputs"); log({"ArtConfig.configure": this.getVerboseConfigurationInfo()}); log("------------- ArtConfig.configure: configuring Configurables...");}; this._configureAllConfigurables(); if (verbose) {log("------------- ArtConfig.configure: configured"); log({Art: {artConfigName, artConfig}}); log("------------- ArtConfig.configure: done");}; Caf.isF(onConfig) && onConfig(artConfig); return artConfig;}; this.getVerboseConfigurationInfo = function() {let configOptions, externalEnvironment, artConfigName; configOptions = this._lastConfigurationOptions; externalEnvironment = getExternalEnvironment(configOptions.__testEnv); artConfigName = _getArtConfigName(); return {configNames: Object.keys(ConfigRegistry.configs), configurables: Caf.array(ConfigRegistry.configurables, (c) => c.namespacePath), setConfigName: {algorithm: "select LAST non-null", inputs: {defaultArtConfigName: getDefaultArtConfigName(), "global.artConfigName": global.artConfigName, "arguments.artConfigName": configOptions.artConfigName, "environment.artConfigName": externalEnvironment.artConfigName}}, setConfig: {algorithm: "deep, pathed merge-all, LAST has priority", inputs: {defaultConfigs: Caf.array(ConfigRegistry.configurables, (configurable) => configurable.getPathedDefaultConfig()), [`configs.${Caf.toString(artConfigName)}`]: ConfigRegistry.configs[artConfigName], "global.artConfig": global.artConfig, "arguments.artConfig": configOptions.artConfig, "environment.artConfig": externalEnvironment.artConfig}}};}; this._reconfigure = () => this.configure(this._lastConfigurationOptions); this._eraseAllConfiguration = function() {let artConfig; _resetArtConfigName(); return Caf.each2(artConfig = _getArtConfig(), (v, k) => delete artConfig[k]);}; this._configureAllConfigurables = function() {Caf.each2(ConfigRegistry.configurables, (configurable) => configurable.configure(_getArtConfig())); return this._notifyConfigurablesConfigured();}; this._notifyConfigurablesConfigured = function() {return Caf.each2(ConfigRegistry.configurables, (configurable) => configurable.configured());};});});});
//# sourceMappingURL=Configure.js.map
