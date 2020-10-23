// Generated by CoffeeScript 1.12.7
(function() {
  var ParseUrl, compactFlatten, escapeRegExp, findUrlOrigin, ref,
    slice = [].slice;

  ref = require('./RegExpExtensions'), escapeRegExp = ref.escapeRegExp, findUrlOrigin = ref.findUrlOrigin;

  compactFlatten = require('./Core').compactFlatten;

  module.exports = ParseUrl = (function() {
    var generateQuery, parsedGlobalQuery;

    function ParseUrl() {}

    parsedGlobalQuery = null;

    ParseUrl.sameOrigin = function(url, origin) {
      var ref1, ref2;
      if (origin == null) {
        origin = (ref1 = global.document) != null ? (ref2 = ref1.location) != null ? ref2.origin : void 0 : void 0;
      }
      origin = origin.match(findUrlOrigin)[0];
      return RegExp("^((" + (escapeRegExp(origin)) + ")|(?![a-z]+\\:))", "i").test(url);
    };

    ParseUrl.parseQuery = function(qs) {
      var i, isCurrentLocation, j, key, len, obj, pair, ref1, ref2, val;
      if ((isCurrentLocation = qs == null) && parsedGlobalQuery) {
        return parsedGlobalQuery;
      }
      qs || (qs = ((ref1 = global.location) != null ? ref1.search : void 0) || "");
      obj = {};
      ref2 = qs.replace(/^\?/, '').split('&');
      for (j = 0, len = ref2.length; j < len; j++) {
        pair = ref2[j];
        if ((i = pair.indexOf('=')) >= 0) {
          key = pair.slice(0, i);
          val = pair.slice(i + 1);
          if (key.length > 0) {
            obj[key] = decodeURIComponent(val);
          }
        } else {
          obj[pair] = true;
        }
      }
      if (isCurrentLocation) {
        parsedGlobalQuery = obj;
      }
      return obj;
    };

    ParseUrl.generateQuery = generateQuery = function(o) {
      var k, parts, v;
      parts = (function() {
        var results;
        results = [];
        for (k in o) {
          v = o[k];
          if (v != null) {
            results.push((encodeURIComponent(k)) + "=" + (encodeURIComponent(v)));
          }
        }
        return results;
      })();
      return parts.join("&");
    };

    ParseUrl.urlJoin = function() {
      var paths, uri;
      uri = arguments[0], paths = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      return uri.replace(/\/+$/, '') + '/' + (paths.join('/').replace(/\/\/+/, '\/')).replace(/^\/+/, '');
    };

    ParseUrl.urlResolve = function() {
      var concatPaths, paths, uri;
      uri = arguments[0], paths = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      concatPaths = paths.join('/').replace(/\/\/+/, '\/');
      if (/^\//.test(paths[0])) {
        return new URL(concatPaths, uri).href;
      } else {
        return (uri.replace(/\/$/, '')) + "/" + concatPaths;
      }
    };

    ParseUrl.appendQuery = function(uri, o) {
      var str;
      if ((o != null) && (str = generateQuery(o)).length > 0) {
        return "" + uri + (uri.match(/\?/) ? "&" : "?") + str;
      } else {
        return uri;
      }
    };

    ParseUrl.parseUrl = function(url) {
      var __, a, anchor, fileName, host, hostWithPort, m, password, path, pathName, port, protocol, query, username;
      m = url.match(/(([A-Za-z]+):(\/\/)?)?(([\-;&=\+\$,\w]+)(:([\-;:&=\+\$,\w]+))?@)?([A-Za-z0-9\.\-]+)(:([0-9]+))?(\/[\+~%\/\.\w\-]*)?(\?([\-\+=&;%@\.\w,]*))?(\#([\.\!\/\\\w]*))?/);
      if (!m) {
        return void 0;
      }
      __ = m[0], __ = m[1], protocol = m[2], __ = m[3], __ = m[4], username = m[5], __ = m[6], password = m[7], host = m[8], __ = m[9], port = m[10], pathName = m[11], __ = m[12], query = m[13], __ = m[14], anchor = m[15];
      if (pathName) {
        a = pathName.split("/");
        fileName = a[a.length - 1];
        path = (a.slice(0, a.length - 1)).join("/");
      }
      host = host.toLowerCase();
      hostWithPort = host;
      if (port) {
        hostWithPort += ":" + port;
      }
      return {
        protocol: protocol,
        username: username,
        password: password,
        hostWithPort: hostWithPort,
        host: host,
        port: port,
        pathName: pathName,
        path: path,
        fileName: fileName,
        query: query && ParseUrl.parseQuery(query),
        anchor: anchor
      };
    };

    return ParseUrl;

  })();

}).call(this);
