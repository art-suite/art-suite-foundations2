# generated by Neptune Namespaces v1.x.x
# file: Art/StandardLib/index.coffee

module.exports = require './namespace'
.includeInNamespace require './StandardLib'
.addModules
  ArrayExtensions:    require './ArrayExtensions'   
  AsyncExtensions:    require './AsyncExtensions'   
  CallStack:          require './CallStack'         
  Clone:              require './Clone'             
  CommonJs:           require './CommonJs'          
  Eq:                 require './Eq'                
  ErrorWithInfo:      require './ErrorWithInfo'     
  Function:           require './Function'          
  Iteration:          require './Iteration'         
  Log:                require './Log'               
  Map:                require './Map'               
  MathExtensions:     require './MathExtensions'    
  MinimalBaseObject:  require './MinimalBaseObject' 
  ObjectDiff:         require './ObjectDiff'        
  ObjectExtensions:   require './ObjectExtensions'  
  ParseUrl:           require './ParseUrl'          
  Promise:            require './Promise'           
  PromisedFileReader: require './PromisedFileReader'
  Regexp:             require './Regexp'            
  Ruby:               require './Ruby'              
  ShallowClone:       require './ShallowClone'      
  StringExtensions:   require './StringExtensions'  
  Time:               require './Time'              
  TypesExtended:      require './TypesExtended'     
  Unique:             require './Unique'            
require './Core'
require './Inspect'