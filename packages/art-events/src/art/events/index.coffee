# generated by Neptune Namespaces v1.x.x
# file: art/events/index.coffee

module.exports = require './namespace'
.includeInNamespace require './Events'
.addModules
  Event:             require './_Event'           
  EventedObject:     require './EventedObject'    
  EventedObjectBase: require './EventedObjectBase'
  EventEpoch:        require './EventEpoch'       
  EventManager:      require './EventManager'     