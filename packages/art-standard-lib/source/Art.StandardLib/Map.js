// Generated by CoffeeScript 1.12.7

/*
TODO: This is almost identical to ES6's Map: Switch to using a Polyfill like:
  https://github.com/paulmillr/es6-shim

Map is a Key-Value map which preserves order.

Unlike Javascript objects, you can use any object or value as keys. This includes:

  Strings
  Numbers
  null
  undefined
  Arrays
  Objects

Arrays and Objects are assigned a unique id using the StandardLib.Unique library.
"0", "", null, undefined and 0 are all different unique keys and can each have unique values.
 */

(function() {
  var KeysIterator, Map, MinimalBaseObject, Node, Unique, ValuesIterator, isFunction, m,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Unique = require('./Unique');

  MinimalBaseObject = require('./MinimalBaseObject');

  isFunction = require('./Core').isFunction;

  Node = (function() {
    function Node(key, value, prev, next) {
      this.key = key;
      this.value = value;
      this.prev = prev || null;
      this.next = next || null;
      if (prev) {
        prev.next = this;
      }
      if (next) {
        next.prev = this;
      }
    }

    Node.prototype.remove = function() {
      var n, p;
      n = this.next;
      p = this.prev;
      if (p) {
        p.next = n;
        this.prev = null;
      }
      if (n) {
        n.prev = p;
        return this.next = null;
      }
    };

    return Node;

  })();

  KeysIterator = (function() {
    function KeysIterator(node1) {
      this.node = node1;
      this.started = false;
    }

    KeysIterator.prototype.next = function() {
      var ref, ref1;
      this.node = this.started ? (ref = this.node) != null ? ref.next : void 0 : (this.started = true, this.node);
      return {
        done: !this.node,
        value: (ref1 = this.node) != null ? ref1.key : void 0
      };
    };

    return KeysIterator;

  })();

  ValuesIterator = (function() {
    function ValuesIterator(node1) {
      this.node = node1;
      this.started = false;
    }

    ValuesIterator.prototype.next = function() {
      var ref, ref1;
      this.node = this.started ? (ref = this.node) != null ? ref.next : void 0 : (this.started = true, this.node);
      return {
        done: !this.node,
        value: (ref1 = this.node) != null ? ref1.value : void 0
      };
    };

    return ValuesIterator;

  })();

  module.exports = isFunction(global.Map) && (m = new global.Map).set(1, 2) === m ? global.Map : Map = (function(superClass) {
    extend(Map, superClass);

    function Map() {
      this._length = 0;
      this._map = {};
      this._first = this._last = null;
    }

    Map.getter({
      size: function() {
        return this._length;
      }
    });

    Map.prototype._getNodes = function() {
      var n, result;
      result = [];
      n = this._first;
      while (n) {
        result.push(n);
        n = n.next;
      }
      return result;
    };

    Map.prototype.keys = function() {
      return new KeysIterator(this._first);
    };

    Map.prototype.values = function() {
      return new ValuesIterator(this._first);
    };

    Map.prototype.get = function(key) {
      var node;
      node = this._map[Unique.id(key)];
      return node && node.value;
    };

    Map.prototype.set = function(key, value) {
      var id;
      id = Unique.id(key);
      if (this._map[id]) {
        this._map[id].value = value;
      } else {
        this._length++;
        this._last = this._map[id] = new Node(key, value, this._last);
        if (!this._first) {
          this._first = this._last;
        }
      }
      return this;
    };

    Map.prototype._remove = function(key) {
      var id, n;
      id = Unique.id(key);
      if (n = this._map[id]) {
        this._length--;
        delete this._map[id];
        if (this._first === n) {
          this._first = n.next;
        }
        if (this._last === n) {
          this._last = n.prev;
        }
        n.remove();
        return n;
      } else {
        return void 0;
      }
    };

    Map.prototype["delete"] = function(key) {
      return !!this._remove(key);
    };

    Map.prototype.forEach = function(f) {
      var i, len, node, ref;
      ref = this._getNodes();
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        f(node.value, node.key, this);
      }
      return void 0;
    };

    Map.prototype.has = function(key) {
      return !!this._map[Unique.id(key)];
    };

    return Map;

  })(MinimalBaseObject);

}).call(this);
