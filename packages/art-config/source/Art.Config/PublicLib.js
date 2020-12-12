"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["Neptune", "Error", "mergeInto"], [global, require('art-standard-lib')], (Neptune, Error, mergeInto) => {let defaultArtConfigName, unconfiguredArtConfigName, getGlobalArtConfig, ArtConfig, _getArtConfig, _getArtConfigName, _resetArtConfigName, getArtConfigConfigured, validateArtConfigConfigured, getArtConfigName, temp1, temp2; require("./namespace"); defaultArtConfigName = "Development"; unconfiguredArtConfigName = "unconfigured"; getGlobalArtConfig = function() {let temp, base; return ((temp = (base = global).ArtConfig) != null ? temp : base.ArtConfig = Neptune.Art.Config);}; ArtConfig = getGlobalArtConfig(); ((temp1 = ArtConfig._artConfig) != null ? temp1 : ArtConfig._artConfig = {}); ((temp2 = ArtConfig._artConfigName) != null ? temp2 : ArtConfig._artConfigName = unconfiguredArtConfigName); return {getGlobalArtConfig, getDefaultArtConfigName: function() {return defaultArtConfigName;}, _getArtConfig: _getArtConfig = function() {return ArtConfig._artConfig;}, _getArtConfigName: _getArtConfigName = function() {return ArtConfig._artConfigName;}, _resetArtConfigName: _resetArtConfigName = function() {return ArtConfig._artConfigName = unconfiguredArtConfigName;}, getArtConfigConfigured: getArtConfigConfigured = function() {return _getArtConfigName() !== unconfiguredArtConfigName;}, validateArtConfigConfigured: validateArtConfigConfigured = function() {if (!getArtConfigConfigured()) {throw new Error("ArtConfig has not been configured. Run: ArtConfig.configure()");}; return true;}, getArtConfig: function() {return validateArtConfigConfigured() && _getArtConfig();}, getArtConfigName: getArtConfigName = function() {return validateArtConfigConfigured() && _getArtConfigName();}, isDev: function() {return getArtConfigName() === "Development";}, isProd: function() {return getArtConfigName() === "Production";}, isTest: function() {return getArtConfigName() === "Test";}, setArtConfigName: function(name) {return ArtConfig._artConfigName = name;}, getArtConfigSave: function() {let out; return Caf.each2(require('./ConfigRegistry').configurables, (configurable) => mergeInto(out, configurable.getConfigSave()), null, out = {});}};});});
//# sourceMappingURL=PublicLib.js.map
