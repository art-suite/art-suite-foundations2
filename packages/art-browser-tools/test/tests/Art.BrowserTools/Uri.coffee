{encodeUriQuery, stripLeadingSlash, stripTrailingSlash, uriPathJoin, encodeUri, encodeMailto} = Neptune.Art.Foundation.Browser
module.exports = suite:
  encodeUriQuery: ->
    test "a: 1", -> assert.eq "a=1", encodeUriQuery a: 1
    test "a: 'hi'", -> assert.eq "a=hi", encodeUriQuery a: 'hi'
    test "a: 'hi', b: 'bye'", -> assert.eq "a=hi&b=bye", encodeUriQuery a: 'hi', b: 'bye'
    test "a: '&?= '", -> assert.eq "a=%26%3F%3D%20", encodeUriQuery a: '&?= '

  uriPathJoin: ->
    test "uriPathJoin 'foo', 'bar'",   -> assert.eq 'foo/bar', uriPathJoin 'foo', 'bar'
    test "uriPathJoin 'foo/', 'bar'",  -> assert.eq 'foo/bar', uriPathJoin 'foo/', 'bar'
    test "uriPathJoin 'foo', '/bar'",  -> assert.eq 'foo/bar', uriPathJoin 'foo', '/bar'
    test "uriPathJoin 'foo/', '/bar'", -> assert.eq 'foo/bar', uriPathJoin 'foo/', '/bar'
    test "uriPathJoin '/foo', 'bar'",  -> assert.eq '/foo/bar', uriPathJoin '/foo', 'bar'
    test "uriPathJoin 'foo', 'bar/'",   -> assert.eq 'foo/bar/', uriPathJoin 'foo', 'bar/'
    test 'uriPathJoin null, null', -> assert.eq '', uriPathJoin null, null
    test 'uriPathJoin "foo", null', -> assert.eq 'foo', uriPathJoin "foo", null
    test 'uriPathJoin null, "bar"', -> assert.eq 'bar', uriPathJoin null, "bar"

  encodeUri_: ->
    test "host",              -> assert.eq '://foo.com', encodeUri host: 'foo.com'
    test "protocol",          -> assert.eq 'http:', encodeUri protocol: 'http'
    test "port",              -> assert.rejects -> encodeUri port: '8080'
    test "host and protocol", -> assert.eq 'http://foo.com', encodeUri host: 'foo.com', protocol: 'http'
    test "host and port number",     -> assert.eq '://foo.com:8080', encodeUri host: 'foo.com', port: 8080
    test "host and port sgtring",     -> assert.eq '://foo.com:8080', encodeUri host: 'foo.com', port: '8080'
    test 'protocol, host and port', -> assert.eq 'http://foo.com:8080', encodeUri host: 'foo.com', protocol: 'http', port: 8080
    test 'uri', -> assert.eq 'http://foo.com', encodeUri uri: 'http://foo.com'
    test 'uri and path', -> assert.eq 'http://foo.com/bar/bam', encodeUri uri: 'http://foo.com', path: 'bar/bam'
    test 'protocol, host, port and path', -> assert.eq 'http://foo.com:8080/bar/bam', encodeUri host: 'foo.com', protocol: 'http', port: 8080, path: 'bar/bam'
    test 'query',             -> assert.eq '?foo=bar', encodeUri query: foo: "bar"
    test 'uri query',         -> assert.eq 'http://foo.com?foo=bar', encodeUri uri: 'http://foo.com', query: foo: "bar"
    test 'host query',        -> assert.eq '://foo.com?foo=bar', encodeUri host: 'foo.com', query: foo: "bar"
    test 'protocol and path', -> assert.eq "mailto:shanebdavis@gmail.com", encodeUri protocol: 'mailto', path: 'shanebdavis@gmail.com'
  regressions: ->
    test 'facebook share', ->
      assert.eq 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fimikimi.com%2Fpost%2F0HWIhYdO9rzg%2F', encodeUri
        uri: "https://www.facebook.com/sharer/sharer.php"
        query:
          u: "https://imikimi.com/post/0HWIhYdO9rzg/"

  encodeMailto: ->
    test 'nothing', -> assert.eq 'mailto:', encodeMailto {}
    test 'to',      -> assert.eq "mailto:shanebdavis@gmail.com", encodeMailto to: 'shanebdavis@gmail.com'
    test 'subject', -> assert.eq "mailto:?subject=hi!", encodeMailto subject: 'hi!'
    test 'body',    -> assert.eq "mailto:?body=hi!", encodeMailto body: 'hi!'
    test 'to and body',    -> assert.eq "mailto:shanebdavis@gmail.com?body=hi!", encodeMailto body: 'hi!', to: 'shanebdavis@gmail.com'
    test 'cc',      -> assert.eq "mailto:?cc=shanebdavis%40gmail.com", encodeMailto cc: 'shanebdavis@gmail.com'
    test 'bcc',     -> assert.eq "mailto:?bcc=shanebdavis%40gmail.com", encodeMailto bcc: 'shanebdavis@gmail.com'
