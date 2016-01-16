Xbd = require 'art.xbd'
{Binary, log} = require 'art.foundation'
{RestClient, stream} = Binary

suite "Xbd", ->

  test "indent", ->
    str = "<foo>\n  <boo>\n    <baz/>\n  </boo>\n</foo>"
    indentedStr = "  <foo>\n    <boo>\n      <baz/>\n    </boo>\n  </foo>"
    result = Xbd.indent str, "  "
    assert.equal result, indentedStr

  test "load trival.xbd", (done) ->
    RestClient.get "#{testAssetRoot}/xbd_test/trivial.xbd", (test_data) ->
      log test_data
      tag = Xbd.parse test_data
      assert.equal tag.name, "RootTag"
      assert.equal tag.tags[0].name, "single_tag"
      done()

  test "load simple.xbd - hierarchy and attributes", (done) ->
    RestClient.get "#{testAssetRoot}/xbd_test/simple.xbd", (test_data) ->
      tag = Xbd.parse test_data
      assert.equal tag.name, "RootTag"

      tag.decode_attribute_values (str) ->
        str.toString()

      top_tag = tag.tags[0]
      assert.equal top_tag.name, "top_tag"
      assert.deepEqual top_tag.attributes, {"animal":"(ᵔᴥᵔ)","fruit":"orange"}

      child_tag1 = top_tag.tags[0]
      assert.equal child_tag1.name, "child_tag1"
      assert.deepEqual child_tag1.attributes, {"fruit":"apple"}

      child_tag2 = top_tag.tags[1]
      assert.equal child_tag2.name, "child_tag2"
      assert.deepEqual child_tag2.attributes, {"planet":"mars"}

      grand_child_tag = child_tag2.tags[0]
      assert.equal grand_child_tag.name, "grand_child_tag"
      assert.deepEqual grand_child_tag.attributes, {"animal":"horse","color":"red"}
      done()

  test "load 4-1gb.kimi", (done) ->
    RestClient.get "#{testAssetRoot}/xbd_test/4-1gb.kimi", (test_data) ->
      tag = Xbd.parse test_data
      assert.equal tag.name, "RootTag"
      done()

  test "building xbd one nested tag", ->
    t = new Xbd.Tag "foo", {}, (tag)->
      tag.add "boo"

    assert.equal t.toString(), '<foo>\n  <boo/>\n</foo>'

  test "building xbd with attrs", ->
    t = new Xbd.Tag "foo",
      bar: 1
      baz: 2
    assert.equal t.toString(), "<foo bar='1' baz='2'/>"

  test "building xbd double nested tag", ->
    t = new Xbd.Tag "foo", {}, (tag)->
      tag.add "boo", {}, (tag)->
        tag.add "baz", {}, ->

    shouldBe = """<foo>
        <boo>
          <baz/>
        </boo>
      </foo>"""

    assert.equal t.toString(), shouldBe

  test "get tag", ->
    t = new Xbd.Tag "foo", {}, (tag)->
      tag.add "boo", {a:1}
      tag.add "baz", {a:2}

    assert.equal t.tag("boo").attributes["a"], 1
    assert.equal t.tag("baz").attributes["a"], 2
