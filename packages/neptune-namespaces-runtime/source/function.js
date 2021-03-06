// Generated by CoffeeScript 1.12.7
(function() {
  if ((function() {}).name == null) {
    Object.defineProperty(global.Function.prototype, 'name', {
      get: function() {
        var matches, name;
        name = (matches = this.toString().match(/^\s*function\s*([^\s(]+)/)) ? matches[1] : "";
        Object.defineProperty(this, 'name', {
          value: name
        });
        return name;
      }
    });
  }

  global.Function.prototype.getName = function() {
    if (this._name && this.hasOwnProperty("_name")) {
      return this._name;
    } else {
      return this.name || "anonymousFunction";
    }
  };

  global.Function.prototype.hasName = function() {
    return !!((this._name && this.hasOwnProperty("_name")) || this.name);
  };

}).call(this);
