// Generated by CoffeeScript 1.12.7
(function() {
  var Namespace, Neptune, version,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  require('./global');

  require('./function');

  version = (require("../package.json")).version;

  if (global.Neptune) {
    console.warn("Load NeptuneNamespaces(" + version + ") FAILED. Another version already loaded: " + global.Neptune.version);
  }

  module.exports = global.Neptune = Neptune = (function(superClass) {
    extend(Neptune, superClass);

    function Neptune() {
      return Neptune.__super__.constructor.apply(this, arguments);
    }

    Namespace.namespace = Namespace.Neptune = Neptune;

    Neptune.Namespace = Namespace;

    Neptune.PackageNamespace = require('./PackageNamespace');

    Neptune.namespacePath = "Neptune";

    Neptune.namespace = null;

    Neptune.version = version;

    Neptune.verbose = false;

    Neptune.Base = Namespace;

    Neptune.isNode = require('detect-node');

    return Neptune;

  })(Namespace = require('./NamespaceClass'));

}).call(this);
