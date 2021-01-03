// Generated by CoffeeScript 1.12.7
(function() {
  var Promise, PromisedFileReader;

  Promise = require('./Promise');

  module.exports = PromisedFileReader = (function() {
    function PromisedFileReader() {}

    PromisedFileReader.readFileAsDataUrl = function(file) {
      return new Promise(function(resolve, reject) {
        var reader;
        reader = new FileReader;
        reader.readAsDataURL(file);
        reader.onload = (function(_this) {
          return function(e) {
            return resolve(e.target.result);
          };
        })(this);
        return reader.onerror = (function(_this) {
          return function(e) {
            return reject(error);
          };
        })(this);
      });
    };

    PromisedFileReader.readFileAsArrayBuffer = function(file) {
      return new Promise(function(resolve, reject) {
        var reader;
        reader = new FileReader;
        reader.readAsArrayBuffer(file);
        reader.onload = (function(_this) {
          return function(e) {
            return resolve(e.target.result);
          };
        })(this);
        return reader.onerror = (function(_this) {
          return function(e) {
            return reject(error);
          };
        })(this);
      });
    };

    return PromisedFileReader;

  })();

}).call(this);
