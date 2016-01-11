colors = require "colors"
glob = require "glob"
fsp = require "fs-promise"
{upperCamelCase, peek, pushIfUnique, indent, pad, log, withoutTrailingSlash} = require "./tools"
{max} = Math

module.exports = class Generator
  @generatedByString: "# generated by Neptune Namespaces"
  @neptuneGlobalName: "Neptune"
  @neptuneGlobalInitializer: """
    self.#{@neptuneGlobalName} ||= class #{@neptuneGlobalName}
      @namespacePath: "#{@neptuneGlobalName}"
      @Base: class Base
        @finishLoad: (classes)->
          for childName in classes when child = @[child]
            child.namespace = @
            child.namespacePath = @namespacePath + "." + child

    """
  @neptuneBaseClass: "#{@neptuneGlobalName}.Base"

  constructor: (@root) ->
    # map from directory paths to list of coffee files in that directory
    @rootArray = @root.split "/"
    @directoriesWithCoffee = {}
    @generatedFileNames = ["index.coffee", "namespace.coffee"]

  addCoffeeFile: (fileWithPath) ->
    fileWithPathArray = fileWithPath.split "/"
    @addCoffeePathArrayAndFile(
      fileWithPathArray.slice 0, fileWithPathArray.length - 1
      peek(fileWithPathArray).split(/\.coffee$/)[0]
    )

  addCoffeePathArrayAndFile: (pathArray, file, subdir) ->

    path = pathArray.join '/'

    if pathArray.length > 1 && @root != path
      parentPathArray = pathArray.slice 0, pathArray.length - 1
      @addCoffeePathArrayAndFile parentPathArray, null, peek pathArray

    @directoriesWithCoffee[path] ||= files:[], subdirs:[]
    @directoriesWithCoffee[path].namespacePath = (upperCamelCase namespace for namespace in pathArray.slice (@rootArray.length - 1)).join '.'
    # pushIfUnique @directoriesWithCoffee[path].files, "index.coffee"
    pushIfUnique @directoriesWithCoffee[path].files, file if file
    pushIfUnique @directoriesWithCoffee[path].subdirs, subdir if subdir

  prettyPrint: (path = @root, indent = "") ->
    unless pathInfo = @directoriesWithCoffee[path]
      console.log "path not found: #{path}".red
      return

    dirName = peek path.split '/'
    log (indent + upperCamelCase dirName).yellow
    indent += "  "
    for subdir in pathInfo.subdirs
      @prettyPrint path + "/" + subdir, indent
    for file in pathInfo.files
      log indent + upperCamelCase file.split(/\.coffee$/)[0]

  getNameSpaceNamesFromPath: (path) ->
    [..., parentNameSpaceName, nameSpaceName] = path.split('/')
    nameSpaceName = upperCamelCase nameSpaceName
    parentNameSpaceName = null if path == @root
    if parentNameSpaceName
      parentNameSpaceName = upperCamelCase parentNameSpaceName
      requireParentNameSpace = "#{parentNameSpaceName} = require '../namespace'"
      parentNameSpaceName += "."

    parentNameSpaceName: (parentNameSpaceName && upperCamelCase parentNameSpaceName) || Generator.neptuneGlobalName
    nameSpaceName: nameSpaceName && upperCamelCase nameSpaceName
    requireParentNameSpace: requireParentNameSpace || Generator.neptuneGlobalInitializer
    requireNameSpace: "#{nameSpaceName} = require './namespace'"


  generateIndex: (path, {files, subdirs}) ->
    upperCamelCaseNames = []
    {parentNameSpaceName, nameSpaceName, requireNameSpace} = @getNameSpaceNamesFromPath path

    requireFiles = {}
    requireFilesOrder = [nameSpaceName]
    requireFiles[nameSpaceName] = 'namespace'

    for file in files
      requireFiles[name = nameSpaceName + "." + upperCamelCase file] =  file
      requireFilesOrder.push name
    for subdir in subdirs
      requireFiles[name = nameSpaceName + "." + upperCamelCase subdir] = subdir
      requireFilesOrder.push name

    maxLength = 0
    maxLength = max maxLength, ucName.length for ucName in requireFilesOrder


    requires = for upperCamelCaseName in requireFilesOrder
      file = requireFiles[upperCamelCaseName]
      "#{pad upperCamelCaseName, maxLength} = require './#{file}'"

    result = """
    #{Generator.generatedByString}
    # this file: #{path}/index.coffee

    module.exports =
    #{requires.join "\n"}
    """

    if files.length > 0
      result +=
        "\n#{nameSpaceName}.finishLoad(#{JSON.stringify (upperCamelCase file.split(/\.coffee$/)[0] for file in files)})"
    result

  getNamespacePath: (path) ->
    path.split(@root)[1]

  generateNamespace: (path, {files, subdirs, namespacePath}) ->
    {parentNameSpaceName, nameSpaceName, requireParentNameSpace} = @getNameSpaceNamesFromPath path

    children = (upperCamelCase file for file in files)
    for dir in subdirs
      children.push upperCamelCase dir

    result = """
      #{Generator.generatedByString}
      # file: #{path}/namespace.coffee

      #{requireParentNameSpace}
      module.exports = #{parentNameSpaceName}.#{nameSpaceName} ||
      class #{parentNameSpaceName}.#{nameSpaceName} extends #{Generator.neptuneBaseClass}
        @namespace: #{parentNameSpaceName}
        @namespacePath: "#{Generator.neptuneGlobalName}.#{namespacePath}"
      """
    result

  generateFiles: ->
    for path, pathInfo of @directoriesWithCoffee
      log "\ngenerate: #{path.yellow}/namespace.coffee"
      log indent @generateNamespace(path, pathInfo).green
      log "\ngenerate: #{path.yellow}/index.coffee"
      log indent @generateIndex(path, pathInfo).green

  generateFromFiles: (files) =>
    for file in files when !file.match /(namespace|index)\.coffee$/
      @addCoffeeFile file
    log directoriesWithCoffee:@directoriesWithCoffee
    @prettyPrint()
    @generateFiles()

  generate: ->
    glob "#{@root}/**/*.coffee", {}, (er, files) =>
      @generateFromFiles files
