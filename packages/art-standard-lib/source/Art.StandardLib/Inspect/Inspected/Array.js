// Generated by CoffeeScript 1.12.7
(function() {
  var Array, MinimalBaseObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  MinimalBaseObject = require('../../MinimalBaseObject');

  module.exports = Array = (function(superClass) {
    extend(Array, superClass);

    function Array(inspectedArray) {
      Array.__super__.constructor.apply(this, arguments);
      this.array = inspectedArray;
    }

    Array.getter({
      arrayOfStrings: function() {
        var i, len, ref, results, v;
        ref = this.array;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          v = ref[i];
          results.push(v.toString());
        }
        return results;
      },
      children: function() {
        return this.array.slice();
      }
    });

    Array.prototype.delimitedString = function(delimiter) {
      if (delimiter == null) {
        delimiter = ", ";
      }
      return this.arrayOfStrings.join(", ");
    };

    Array.prototype.toString = function() {
      return "[" + (this.delimitedString()) + "]";
    };

    return Array;

  })(MinimalBaseObject);

}).call(this);
