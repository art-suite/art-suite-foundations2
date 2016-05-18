colors = require "colors"
glob = require "glob"
fsp = require "fs-promise"
{upperCamelCase, peek, pushIfUnique, indent, pad, log, withoutTrailingSlash, promiseSequence, merge} = require "./tools"
{max} = Math
Path = require "path"

getRelativePath = (absFrom, absTo) ->
  if absFrom
    Path.relative absFrom, absTo
  else
    absTo

getAbsPath = (absPath, relativePath) ->
  if absPath
    Path.join absPath, relativePath
  else
    relativePath

module.exports = class Generator
  @generate: (globRoot, options = {}) ->
    new Promise (resolve) ->
      glob globRoot, {}, (er, files) ->
        filePromiseGenerators = for file in files when fsp.statSync(file).isDirectory()
          do (file) -> ->
            generator = new Generator file, options

            generator.generate()
            .then ->
              Generator.watch file, merge options, lastGenerator: generator if options.watch

        promiseSequence filePromiseGenerators
        .then -> resolve()

  @watch: (root, options = {}) ->
    @log root, "watching...".green
    generator = null
    fsp.watch root, {persistent: options.persistent, recursive: true}, (event, filename) =>
      if event != "change" && !filename.match /(^|\/)(namespace|index)\.coffee$/
        @log root, "watch event: ".bold.yellow + "#{event} #{filename.yellow}"

        options.lastGenerator = generator if generator
        generator = new Generator root, options
        generator.generate()

  @generatedByString: "# generated by Neptune Namespaces v#{require './version'}"
  @neptuneGlobalName: "Neptune"
  @neptuneGlobalInitializer: "require 'neptune-namespaces'"
  """
    self.#{@neptuneGlobalName} ||= class #{@neptuneGlobalName}
      @namespacePath: "#{@neptuneGlobalName}"
      @Base: class Base
        @namespacePath: "#{@neptuneGlobalName}.Base"
        @namespace: "#{@neptuneGlobalName}"
        @classes: []
        @namespaces: []
        @finishLoad: (classes, namespaces)->
          @classes = @classes.concat classes
          @namespaces = @namespaces.concat namespaces
          for name in classes when klass = @[name]
            klass.namespace = @
            klass.namespacePath = @namespacePath + "." + klass

    """
  @neptuneBaseClass: "#{@neptuneGlobalName}.Base"

  @log: (root, args...) ->
    root = Path.basename root
    args = args.join()
    args = args.split "\n"
    for arg in args
      console.log if arg == ""
        ""
      else
        "Neptune.#{upperCamelCase root}: ".grey + arg

  log: (args...) -> Generator.log @getRelativePath(), args.join() unless @silent

  constructor: (@root, options = {}) ->
    {@pretend, @verbose, @lastGenerator, @force, @silent} = options
    @rootPrefix = Path.dirname(@root) + "/"

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

  getRelativePath: (path = @root) ->
    getRelativePath @rootPrefix, path

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
      @log "path not found: #{path}".red
      return

    dirName = peek path.split '/'
    @log (indent + upperCamelCase dirName).yellow
    indent += "  "
    for subdir in pathInfo.subdirs
      @prettyPrint path + "/" + subdir, indent
    for file in pathInfo.files
      @log indent + upperCamelCase file.split(/\.coffee$/)[0]

  getNameSpaceNamesFromPath: (path) ->
    [..., parentNameSpaceName, fileName] = path.split('/')
    nameSpaceName = upperCamelCase fileName
    parentNameSpaceName = null if path == @root
    if parentNameSpaceName
      parentNameSpaceName = upperCamelCase parentNameSpaceName
      requireParentNameSpace = "#{parentNameSpaceName} = require '../namespace'"
      parentNameSpaceName += "."

    parentNameSpaceName: (parentNameSpaceName && upperCamelCase parentNameSpaceName) || Generator.neptuneGlobalName
    nameSpaceName: nameSpaceName && upperCamelCase nameSpaceName
    requireParentNameSpace: requireParentNameSpace || Generator.neptuneGlobalInitializer
    requireNameSpace: "#{nameSpaceName} = require './namespace'"
    fileName: fileName


  generateIndex: (path, {files, subdirs}) ->
    {parentNameSpaceName, nameSpaceName, requireNameSpace} = @getNameSpaceNamesFromPath path

    fileNamesToUpperCamelCaseNames = {}
    upperCamelCaseNames = {}
    maxUpperCamelCaseFileNameLength = 0
    for name in files
      fileNamesToUpperCamelCaseNames[name] = ucName = upperCamelCase name
      upperCamelCaseNames[ucName] = name
      maxUpperCamelCaseFileNameLength = max maxUpperCamelCaseFileNameLength, ucName.length

    preInclude = []
    includeFiles = []
    includeInNamespace = null

    for name in files.sort()
      if name.match /^[_a-z0-9]/i
        if fileNamesToUpperCamelCaseNames[name] == nameSpaceName
          includeInNamespace = ".includeInNamespace(require './#{name}')"
        else
          paddedLabel = pad fileNamesToUpperCamelCaseNames[name] + ":", maxUpperCamelCaseFileNameLength + 1
          includeFiles.push "#{paddedLabel} require './#{name}'"
      else
        preInclude.push "require './#{name}'" unless name.match /^--/

    includeNamespaces = []

    for name in subdirs.sort()
      unless upperCamelCaseNames[upperCamelCase name]
        if name.match /^[_a-z0-9]/i
          includeNamespaces.push "require './#{name}'"
        else
          preInclude.push "require './#{name}'" unless name.match /^--/

    contents = [
      """
      #{Generator.generatedByString}
      # file: #{@getRelativePath path}/index.coffee

      """
      preInclude.join "\n" if preInclude.length > 0
      "(module.exports = require './namespace')"
      includeInNamespace
      ".addModules\n  #{includeFiles.join "\n  "}" if includeFiles.length > 0
      includeNamespaces.join "\n" if includeNamespaces.length > 0
    ]

    (entry for entry in contents when entry).join "\n"


  getNamespacePath: (path) ->
    path.split(@root)[1]

  generateNamespace: (path, {files, subdirs, namespacePath}) ->
    {parentNameSpaceName, nameSpaceName, requireParentNameSpace, fileName} = @getNameSpaceNamesFromPath path

    children = (upperCamelCase file for file in files)
    for dir in subdirs
      children.push upperCamelCase dir

    dontAdd = fileName.match /^-/

    contents = [
      """
      #{Generator.generatedByString}
      # file: #{@getRelativePath path}/namespace.coffee

      """
      requireParentNameSpace unless dontAdd
      "module.exports = " + (if dontAdd
        ""
      else "#{parentNameSpaceName}.#{nameSpaceName} ||\n#{parentNameSpaceName}.addNamespace "
      )+ "class #{nameSpaceName} extends #{Generator.neptuneBaseClass}\n  ;"
    ]
    (entry for entry in contents when entry).join "\n"


  generateHelper: ({name, code}) ->
    if @pretend
      @log "\ngenerated: #{@getRelativePath(name).yellow}"
      @log indent code.green
    @generatedFiles[name] = code

  writeFiles: ->
    filesWritten = 0
    filesTotal = 0
    promises = for name, code of @generatedFiles
      do (name, code) =>
        filesTotal++
        if @lastGenerator?.generatedFiles[name] == code
          @log "no change: #{@getRelativePath(name)}".grey if @verbose
        else
          p = if fsp.existsSync name
            fsp.readFile name, 'utf8'
          else Promise.resolve null

          p.then (currentContents) =>
            if @force || currentContents != code
              filesWritten++
              @log "writing: #{@getRelativePath(name).yellow}"
              fsp.writeFile name, code
            else
              @log "already current: #{@getRelativePath(name)}".grey if @verbose
          , (error) =>
            @log "error reading #{@getRelativePath(name)}".red, error

    Promise.all promises
    .then =>
      @log "#{filesTotal - filesWritten}/#{filesTotal} files current" if filesWritten < filesTotal
      @log "#{filesWritten}/#{filesTotal} files #{if @lastGenerator then 'changed' else 'written'}" if filesWritten > 0

  generateFiles: ->
    @generatedFiles = {}
    for path, pathInfo of @directoriesWithCoffee
      @generateHelper
        name: "#{path}/namespace.coffee"
        code: @generateNamespace path, pathInfo

      @generateHelper
        name: "#{path}/index.coffee"
        code: @generateIndex path, pathInfo

  generateFromFiles: (files) =>
    for file in files when !file.match /(namespace|index)\.coffee$/
      @addCoffeeFile file
    if @verbose
      @log "generating namespace structure:"
      @log "  Neptune".yellow
      @prettyPrint @root, "    "
    @generateFiles()
    if @pretend
      Promise.resolve()
    else
      @writeFiles()

  generate: ->
    new Promise (resolve, reject) =>
      @log "\nscanning root: #{@getRelativePath().yellow}" if @verbose
      glob "#{@root}/**/*.coffee", {}, (er, files) =>
        if er
          reject()
        else
          resolve if files.length == 0
            @log "no .coffee files found".yellow.bold
          else
            @generateFromFiles files
