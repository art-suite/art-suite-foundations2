// Generated by CoffeeScript 1.12.7
(function() {
  var base, isBoolean, isDate, isFunction, isJsonType, isNumber, isPlainArray, isPlainObject, isString, merge, object, ref;

  ref = require('art-standard-lib'), isBoolean = ref.isBoolean, isNumber = ref.isNumber, isString = ref.isString, isPlainObject = ref.isPlainObject, isPlainArray = ref.isPlainArray, isFunction = ref.isFunction, isDate = ref.isDate, isJsonType = ref.isJsonType, merge = ref.merge, object = ref.object;


  /*
  @dataTypes only includes the Standard Json types:
    except 'null':
      no field has the type of 'null'
      instead, it has some other type and can be 'null' unless it is 'required'
   */

  base = {
    boolean: {
      validate: isBoolean
    },
    number: {
      validate: isNumber
    },
    string: {
      validate: isString
    },
    object: {
      validate: isPlainObject
    },
    array: {
      validate: isPlainArray
    },
    "function": {
      validate: isFunction
    },
    date: {
      validate: isDate
    },
    json: {
      validate: isJsonType
    },
    any: {}
  };

  module.exports = merge(base, object(base, {
    key: function(v, k) {
      return k + "DataType";
    },
    "with": function(v, k) {
      return k;
    }
  }));

}).call(this);

//# sourceMappingURL=DataTypes.js.map
