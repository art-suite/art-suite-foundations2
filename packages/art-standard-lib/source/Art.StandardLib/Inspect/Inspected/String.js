// Generated by CoffeeScript 1.12.7
(function() {
  var MinimalBaseObject, String, escapeJavascriptString,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  MinimalBaseObject = require("../../MinimalBaseObject");

  escapeJavascriptString = require('../../StringExtensions').escapeJavascriptString;

  module.exports = String = (function(superClass) {
    extend(String, superClass);

    function String(clonedString) {
      String.__super__.constructor.apply(this, arguments);
      this.string = clonedString;
    }

    String.prototype.toString = function() {
      return escapeJavascriptString(this.string);
    };

    return String;

  })(MinimalBaseObject);

}).call(this);

//# sourceMappingURL=String.js.map
