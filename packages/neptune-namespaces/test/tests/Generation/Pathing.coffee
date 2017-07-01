{Generator, MiniFoundation} = Generation

{log} = MiniFoundation

suite "NeptuneNamespaces.Generation.Pathing", ->
  test "pathed explicitly", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/Alpha.Beta/file.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/Alpha.Beta/index.coffee"
        "source/Foo/Alpha.Beta/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]
      assert.match generatedFiles["source/Foo/Alpha.Beta/namespace.coffee"], /// addNamespace .* Alpha\.Beta .* class\ Beta ///
      assert.match generatedFiles["source/Foo/index.coffee"], /// require.*\./Alpha\.Beta ///
      assert.match generatedFiles["source/Foo/namespace.coffee"], /// require.*\./Alpha\.Beta ///

  test "pathed implicitly", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/Alpha/Beta/file.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/Alpha/Beta/index.coffee"
        "source/Foo/Alpha/Beta/namespace.coffee"
        "source/Foo/Alpha/index.coffee"
        "source/Foo/Alpha/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]
      assert.match generatedFiles["source/Foo/Alpha/namespace.coffee"], /// vivifySubnamespace.*Alpha ///

  test "pathed both ways", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/Alpha.Beta/Gamma/file.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/Alpha.Beta/Gamma/index.coffee"
        "source/Foo/Alpha.Beta/Gamma/namespace.coffee"
        "source/Foo/Alpha.Beta/index.coffee"
        "source/Foo/Alpha.Beta/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]
      assert.match generatedFiles["source/Foo/Alpha.Beta/Gamma/namespace.coffee"],  /// require .* '\.\./namespace'     .* addNamespace        .* Gamma       ///
      assert.match generatedFiles["source/Foo/Alpha.Beta/namespace.coffee"],        /// require .* 'neptune-namespaces' .* vivifySubnamespace .* Alpha\.Beta ///

  test "pathed explicitly with includeInNamespace", ->
    generator = new Generator "source/Foo", pretend: true, quiet: true
    generator.generateFromFiles [
        "source/Foo/Alpha.Beta/file.coffee"
        "source/Foo/Alpha.Beta/Beta.coffee"
      ]
    .then ({generatedFiles, namespaces}) ->
      assert.eq Object.keys(generatedFiles).sort(), [
        "source/Foo/Alpha.Beta/index.coffee"
        "source/Foo/Alpha.Beta/namespace.coffee"
        "source/Foo/index.coffee"
        "source/Foo/namespace.coffee"
      ]
      assert.match generatedFiles["source/Foo/Alpha.Beta/index.coffee"], /// includeInNamespace .* \.\/Beta ///
