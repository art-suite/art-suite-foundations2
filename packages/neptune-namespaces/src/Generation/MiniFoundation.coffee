colors = require "colors"
Path = require 'path'
module.exports = class Lib
  @[k] = v for k, v of require '../NeptuneLib/ArrayCompactFlatten'
  @[k] = v for k, v of require '../NeptuneLib/StringCase'
  {compactFlatten} = @

  @promiseSequence: (promiseGeneratingFunctions) ->
    promiseGeneratingFunctions = promiseGeneratingFunctions.reverse()
    resolveNextPromise = ->
      if promiseGeneratingFunctions.length > 0
        promiseGeneratingFunctions.pop()()
        .then -> resolveNextPromise()

    if promiseGeneratingFunctions.length == 0
      Promise.resolve()
    else
      resolveNextPromise()

  @isFunction:    isFunction = (obj) => typeof obj == "function"
  @isString:      isString = (obj) => typeof obj == "string"
  @isPlainArray:  isPlainArray  = (v) -> if v then v.constructor == Array  else false
  @isPlainObject: isPlainObject = (v) -> if v then v.constructor == Object else false
  @escapeJavascriptString: escapeJavascriptString = (str) =>
    JSON.stringify str

  @arrayWithoutLast = (array) ->
    array.slice 0, array.length - 1

  @fileWithoutExtension = (file) ->
    file.split(/\.[a-zA-Z]+$/)[0]

  @peek: (array, offset = -1) -> array?.length > 0 && array[array.length + offset]
  @pushIfUnique: (array, value) ->
    array.push value unless value in array
    array

  @indent: (str, indentStr = "  ")->
    joiner = "\n#{indentStr}"
    indentStr + str.split("\n").join joiner

  @pad: (str, length, character = " ") ->
    if 0 < diff = length - str.length
      str += character.repeat diff
    str

  @withoutTrailingSlash: (str) ->
    str.match(/^(.*[^\/])\/?$/)[1]

  @merge: (a, b) =>
    result = {}
    result[k] = v for k, v of a
    result[k] = v for k, v of b
    result

  @formattedInspect: formattedInspect = (a, indent = '') ->
    a = a.getInspectedObjects() if isFunction a?.getInspectedObjects

    if isPlainArray a
      inspected = for el in a
        formattedInspect el, indent + '  '
      "[]\n#{indent}#{inspected.join "\n#{indent}"}"
    else if isPlainObject a
      inspected = for k in Object.keys(a).sort()
        "#{k}: " + formattedInspect a[k], indent + '  '
      "\n#{indent}#{inspected.join "\n#{indent}"}"
    else if isString a
      str = if a.match /\n/
        compactFlatten([
          '"""'
          a.split /\n/
          '"""'
        ]).join "\n#{indent}"
      else
        escapeJavascriptString a
      str.green
    else
      "#{a}"

  @log: log = ->
    if arguments.length == 1
      console.log formattedInspect arguments[0]
    else
      list = for el in arguments
        el
      console.log formattedInspect list

  @getParentPath: (path) ->
    Path.parse(path).dir

  @getRelativePath: (absFrom, absTo) ->
    if absFrom
      Path.relative absFrom, absTo
    else
      absTo

  @getAbsPath: (absPath, relativePath) ->
    if absPath
      Path.join absPath, relativePath
    else
      relativePath

