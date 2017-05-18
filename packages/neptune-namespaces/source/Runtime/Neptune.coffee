NamespaceBaseClass = require './NamespaceBaseClass'

global.Neptune ||= module.exports = class Neptune extends NamespaceBaseClass
  @Base: NamespaceBaseClass
  @namespacePath: "Neptune"
  @namespace: null
  @isNamespace: (klass) -> klass?.prototype instanceof NamespaceBaseClass
  @isNode: require 'detect-node'
  @version: (require "../../package.json").version

NamespaceBaseClass.namespace = Neptune
