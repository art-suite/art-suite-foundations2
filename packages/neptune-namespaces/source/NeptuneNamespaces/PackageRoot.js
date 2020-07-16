// Generated by CoffeeScript 1.12.7
(function() {
  var PackageRoot, fs, normalizeDirectory, path;

  path = require('path');

  fs = require('fs-extra');

  normalizeDirectory = require('./MiniFoundation').normalizeDirectory;

  module.exports = PackageRoot = (function() {
    function PackageRoot() {}

    PackageRoot.getPackageRoot = function(directory) {
      return PackageRoot._findRootR(normalizeDirectory(directory));
    };

    PackageRoot._knownPackageRoots = {};


    /*
    IN:
      directory: must be a normalized string pointing at an actual directory
    OUT:
      string representing the first parent directory that contains package.json
      OR false if none found
     */

    PackageRoot._findRootR = function(directory) {
      var knownSourceRoot;
      if (knownSourceRoot = this._knownPackageRoots[directory]) {
        return knownSourceRoot;
      } else {
        if (fs.existsSync(path.join(directory, "package.json"))) {
          return directory;
        } else if (directory !== "/" && directory.length > 0) {
          return this._knownPackageRoots[directory] = this._findRootR(path.dirname(directory));
        } else {
          return false;
        }
      }
    };

    return PackageRoot;

  })();

}).call(this);