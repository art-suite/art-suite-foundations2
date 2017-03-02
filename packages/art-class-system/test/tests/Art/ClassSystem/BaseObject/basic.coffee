
{Foundation} = Neptune.Art
{log, BaseObject, clone, eq, inspect, nextTick} = Foundation

module.exports = suite:
  tap: ->
    test "tap", ->
      class Foo extends BaseObject
        constructor: (a) -> @a = a

      foo = new Foo 123
      bar = foo.tap ->
        foo.a += 2

      assert.eq bar, foo
      assert.eq foo.a, 125

  properties: ->
    test "@getter 'bar' defines propGetter", ->
      class Foo extends BaseObject
        constructor: (@_bar) ->
        @getter "bar"

      f = new Foo 123
      assert.equal f.bar, 123

    test "@getter bar: -> defines custom getter", ->
      class Foo extends BaseObject
        @getter bar: -> @y * 2
        constructor: (@y) ->

      f = new Foo 10
      assert.equal f.bar, 20

    test "@getter 'bar fab' defines two property getters", ->
      class Foo extends BaseObject
        constructor: (@_bar, @_fab) ->
        @getter "bar fab"

      assert.eq ["constructor", "getBar", "getFab"], Object.keys Foo.prototype
      f = new Foo 123, 456
      assert.equal f.bar, 123
      assert.equal f.fab, 456

    test "@getter multi-line string defines all property getters", ->
      class Foo extends BaseObject
        @getter """
          foo
          bar
          fab
          """

      assert.eq ["constructor", "getBar", "getFab", "getFoo"], Object.keys(Foo.prototype).sort()

    test "@getter '  bar ' extra spaces ignored", ->
      class Foo extends BaseObject
        constructor: (@_bar) ->
        @getter "  bar  "

      assert.eq ["constructor", "getBar"], Object.keys Foo.prototype
      f = new Foo 123
      assert.equal f.bar, 123

    test "@getter ',baz,' extra commas ignored", ->
      class Foo extends BaseObject
        constructor: (@_bar) ->
        @getter ",bar,"

      f = new Foo 123
      assert.eq ["constructor", "getBar"], Object.keys Foo.prototype
      assert.equal f.bar, 123

    test "@setter 'x' defines property setter", ->
      class Foo extends BaseObject
        @setter "x"

      assert.eq ["constructor", "setX"], Object.keys Foo.prototype
      f = new Foo
      f.x = 10
      assert.equal f._x, 10

    test "@setter x: -> defines custom setter", ->
      class Foo extends BaseObject
        @setter x: (v) ->
          @y = v / 2

      f = new Foo
      f.x = 10
      assert.equal f.y, 5

    test "@getter with [] access", ->
      class Foo extends BaseObject
        @getter x: -> @y * 2

      f = new Foo
      f.y = 10
      assert.equal f["x"], 20

    test "@getter inheritance", ->
      class Foo extends BaseObject
        @getter x: -> @y * 2

      class Bar extends Foo

      f = new Bar
      f.y = 10
      assert.equal f.x, 20

    test "@property 'x'", ->
      class Foo extends BaseObject
        @property 'x'

      f = new Foo
      f.x = 123
      assert.equal f.x, 123
      assert.equal f._x, 123

    test "@property x:456", ->
      class Foo extends BaseObject
        @property x:456

      f = new Foo
      assert.equal f._x, undefined
      assert.equal f.x, 456
      assert.equal f._x, 456
      f.x = 123
      assert.equal f.x, 123
      assert.equal f._x, 123

