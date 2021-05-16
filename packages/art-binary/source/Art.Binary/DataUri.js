// Generated by CoffeeScript 1.12.7
(function() {
  var DataUri, Promise, StandardLib, binary, isString, readAsDataURL;

  StandardLib = require('art-standard-lib');

  binary = require("./BinaryString").binary;

  readAsDataURL = require('./File').readAsDataURL;

  Promise = StandardLib.Promise, isString = StandardLib.isString;

  module.exports = DataUri = (function() {
    var isDataUri;

    function DataUri() {}

    DataUri.isDataUri = isDataUri = function(dataString) {
      return isString(dataString) && dataString.slice(0, 5) === "data:";
    };


    /*
    IN: data can be any of
      File: HTML File object is read as ArrayBuffer
      DataURI string: if it is already a data-uri string it is just returned as a successful promise
      any type 'binary' accepts
    
    OUT:
      promise.then (dataUri) ->
      , (errorEventOrErrorObject) ->
     */

    DataUri.toDataUri = function(data, mimeType) {
      if (mimeType == null) {
        mimeType = 'image/png';
      }
      if (!data) {
        throw new Error("data not set");
      }
      if (global.File && data instanceof global.File) {
        return readAsDataURL(data);
      }
      if (isDataUri(data)) {
        return Promise.resolve(data);
      }
      return binary(data).toBase64().then(function(base64) {
        return "data:" + mimeType + ";base64," + base64;
      });
    };

    return DataUri;

  })();

}).call(this);

//# sourceMappingURL=DataUri.js.map
