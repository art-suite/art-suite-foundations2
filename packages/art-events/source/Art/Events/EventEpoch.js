// Generated by CoffeeScript 1.12.7
(function() {
  var EpochClass, EventEpoch, defineModule, log, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = require('art-standard-lib'), defineModule = ref.defineModule, log = ref.log;

  EpochClass = require('art-epoched-state').EpochClass;

  defineModule(module, EventEpoch = (function(superClass) {
    extend(EventEpoch, superClass);

    function EventEpoch() {
      return EventEpoch.__super__.constructor.apply(this, arguments);
    }

    EventEpoch.singletonClass();

    EventEpoch.prototype.queue = function(event) {
      return this.queueItem(event);
    };

    EventEpoch.prototype.logEvent = function(name, id) {};

    return EventEpoch;

  })(EpochClass));

}).call(this);
