# generated by Neptune Namespaces v3.x.x
# file: tests/namespace.coffee

module.exports = (require 'neptune-namespaces').addNamespace 'Tests', class Tests extends Neptune.PackageNamespace
  @version: require('../../package.json').version
require './Generation/namespace';
require './NeptuneNamespaces/namespace'