// Generated by CoffeeScript 1.12.7
(function() {
  var Helper, Path, arrayWithoutLast, fileWithoutExtension, log, max, pad, peek, ref, upperCamelCase, version;

  version = require('../../package.json').version;

  ref = require('./MiniFoundation'), log = ref.log, upperCamelCase = ref.upperCamelCase, fileWithoutExtension = ref.fileWithoutExtension, peek = ref.peek, arrayWithoutLast = ref.arrayWithoutLast, pad = ref.pad;

  Path = require("path");

  max = Math.max;

  module.exports = Helper = (function() {
    var toModuleName;

    function Helper() {}

    Helper.generatedByStringBare = "generated by Neptune Namespaces v" + version[0] + ".x.x";

    Helper.generatedByString = "# " + Helper.generatedByStringBare;

    Helper.globalNamespaceName = "Neptune";

    Helper.neptuneBaseClass = Helper.globalNamespaceName + ".Namespace";

    Helper.PackageNamespaceClassName = Helper.globalNamespaceName + ".PackageNamespace";

    Helper.shouldNotAutoload = function(itemName) {
      return !!itemName.match(/^([\._].*|(index|namespace)\.(coffee|js))$/);
    };

    Helper.shouldNotNamespace = function(itemName) {
      return !!itemName.match(/^-/);
    };

    Helper.shouldIncludeInNamespace = function(file, namespaceName) {
      return toModuleName(file) === peek(namespaceName.split('.'));
    };

    Helper.toFilename = function(path) {
      return peek(path.split('/'));
    };

    Helper.toModuleName = toModuleName = function(itemName) {
      return upperCamelCase(fileWithoutExtension(itemName));
    };

    Helper.requirePath = function(filenameWithExtension) {
      return "./" + Path.parse(filenameWithExtension).name;
    };

    Helper.alignColumns = function() {
      var cell, el, i, j, k, l, len, len1, len2, len3, line, listOfLists, m, maxLengths, paddedCells, results;
      listOfLists = [];
      for (j = 0, len = arguments.length; j < len; j++) {
        el = arguments[j];
        listOfLists = listOfLists.concat(el);
      }
      maxLengths = [];
      for (k = 0, len1 = listOfLists.length; k < len1; k++) {
        line = listOfLists[k];
        for (i = l = 0, len2 = line.length; l < len2; i = ++l) {
          cell = line[i];
          maxLengths[i] = i === line.length - 1 ? cell : max(maxLengths[i] || 0, cell.length);
        }
      }
      maxLengths[maxLengths - 1] = 0;
      results = [];
      for (m = 0, len3 = listOfLists.length; m < len3; m++) {
        line = listOfLists[m];
        paddedCells = (function() {
          var len4, n, results1;
          results1 = [];
          for (i = n = 0, len4 = line.length; n < len4; i = ++n) {
            cell = line[i];
            results1.push(pad(cell, maxLengths[i]));
          }
          return results1;
        })();
        results.push(paddedCells.join(' '));
      }
      return results;
    };

    return Helper;

  })();

}).call(this);
