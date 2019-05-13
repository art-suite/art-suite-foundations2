"use strict"
{isArray, compactFlatten, log, upperCamelCase, isFunction, isPlainObject, isClass} = require 'art-standard-lib'

mergeIntoBasic = (into, source) ->
  into[k] = v for k, v of source
  into

{isFunction, fastBind} = require 'art-standard-lib'

module.exports = class ObjectTreeFactory
  # deepArgsProcessing = (array, children) ->
  #   for el in array when el
  #     if el.constructor == Array
  #       deepArgsProcessing el, children
  #     else children.push el
  #   null

  ###
  IN: any order of args which are:
    plainObject-options: (optional)
      mergePropsInto: (intoProps, fromProps) ->
        function to merge arguments 1 on into props
        default: mergeIntoBasic

      inspectedName: string
        for introspection:
          Factory.getName() == inspectedName

      class: a class
        if specified, additioanl properties will be set on the Factory function:
          Factory.class = class
          Factory._name = class.getName() + "Factory"

          all concrete class-methods are made available in the Factory
          (see BaseObject.abstractClass)

      bind: string or array of strings
        NODE: class must be set
        list of method-names to bind from class onto the factory

      preprocessElement: (element, Factory) -> element
        can do custom preprocssing of each argument to the factory.

        defualt: preprocessElementBasic (no-op)

    function-nodeFactory: (optional) ->
      IN:
        props:    plain object mapping props to prop-values
        children: flat, compacted array of children nodes
      OUT:
        node

    class-nodeClass: class Foo extends BaseObject

  OUT: objectTreeFactory = ->
    IN:
      Arguments are compacted and flattened
      The resulting list of arguments can be any combination of:
        plainObjects for props (merged in the order they appear)
        other objects which become the 'children'

    OUT:
      object-tree-node generated by the nodeFactory
  ###
  preprocessElementBasic = (a) -> a
  @createObjectTreeFactory = =>
    for a in arguments
      if a?
        switch
          when isClass a        then klass = a
          when isFunction a     then nodeFactory = a
          when isPlainObject a  then options = a

    options ||= {}
    klass ||= options.class
    nodeFactory ||= if true
      klass ||= class TreeFactoryNode extends BaseObject
        constructor: (@props, @children) ->

      (props, children) -> new klass props, children

    {mergePropsInto, inspectedName, preprocessElement} = options
    mergePropsInto ||= mergeIntoBasic
    preprocessElement ||= preprocessElementBasic

    _children = _props = _oneProps = null

    applyArg = (el) ->
      if el = preprocessElement el, Factory
        if isPlainObject el
          unless _oneProps
            _oneProps = el
          else
            unless _props
              mergePropsInto _props = {}, _oneProps

            mergePropsInto _props, el

        else if isArray el
          applyArg el2 for el2 in el

        else
          _children ?= []
          _children.push el

      null

    ###
    PERFORMANCE TODO:
      ES6 (...args) -> is MUCH faster than 'arguments', even with 'use strict' on.

      AndroidChrome8: 214/130 => 1.6x faster
      Chrome68:       459/321 => 1.4x faster
      Safari11:        108/30 => 3.6x faster
    ###
    Factory = ->
      _children = _props = _oneProps = null

      applyArg el for el in arguments

      nodeFactory _props || _oneProps, _children

    if klass
      Factory.class = klass
      klass.Factory = Factory

      abstractClass = klass.getAbstractClass?() || Object
      bindList = compactFlatten [(k for k, v of klass when !abstractClass[k] && isFunction v), options.bind]
      inspectedName ||= klass.getName() + "Factory"

      Factory[k] = fastBind klass[k], klass for k in bindList

    Factory._name = inspectedName if inspectedName

    # show nice output when inspected
    Factory.inspect = -> "<#{inspectedName || 'ObjectTreeFactory'}>"
    Factory

  ###
  IN:
    list: a string or abitrary structure of arrays, nulls and strings
      each string is split into tokens and each token is used as the nodeTypeName to create a Tree-factory
    nodeFactory: (nodeTypeName, props, children) -> node
      IN:
        nodeTypeName: node-type name
        props:    plain object mapping props to prop-values
        children: flat, compacted array of children nodes
      OUT:
        node
  OUT:
    map from nodeNames (upperCamelCased) to the factories returned from createObjectTreeFactory

  TODO:
    PERFORMANCE TEST:
      createObjectTreeFactoriesFromFactories
      vs
      createObjectTreeFactoriesFromFactoryFactories

      The latter is probably faster. It is also more powerful and generally cleaner.
  ###
  @createObjectTreeFactories: (options, list, nodeFactory) =>
    unless nodeFactory
      [list, nodeFactory] = [options, list]
      options = {}

    if nodeFactory.length == 1
      @_createObjectTreeFactoriesFromFactoryFactories options, list, nodeFactory
    else
      @_createObjectTreeFactoriesFromFactories options, list, nodeFactory

  @_createObjectTreeFactoriesFromFactories: (options, list, nodeFactory) =>
    suffix = options.suffix || ''

    out = {}
    for nodeTypeName in compactFlattenObjectTreeNodeNames list
      do (nodeTypeName) =>
        options.inspectedName = nodeTypeName
        out[upperCamelCase(nodeTypeName) + suffix] = @createObjectTreeFactory options,
          (props, children) -> nodeFactory nodeTypeName, props, children
    out

  nodeNameRegexp = /[a-z0-9_]+/ig
  @_compactFlattenObjectTreeNodeNames: compactFlattenObjectTreeNodeNames = (list) ->
    return list.match nodeNameRegexp if typeof list == "string"

    out = []
    for str in compactFlatten list
      out = out.concat str.match nodeNameRegexp
    out

  @_createObjectTreeFactoriesFromFactoryFactories: (options, list, nodeFactoryFactory) =>
    suffix = options.suffix || ''

    out = {}
    for nodeTypeName in compactFlattenObjectTreeNodeNames list
      nodeFactory = nodeFactoryFactory nodeTypeName
      name = upperCamelCase(nodeTypeName) + suffix
      options.inspectedName = name
      out[name] = @createObjectTreeFactory options, nodeFactory
    out
