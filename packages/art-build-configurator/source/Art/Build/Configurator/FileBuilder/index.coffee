# generated by Neptune Namespaces v2.x.x
# file: Art/Build/Configurator/FileBuilder/index.coffee

module.exports = require './namespace'
module.exports
.includeInNamespace require './FileBuilder'
.addModules
  Dir:  require './Dir' 
  File: require './File'