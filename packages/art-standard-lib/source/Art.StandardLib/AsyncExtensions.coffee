Promise = require './Promise'


module.exports = class AsyncExtensions

  # IN: delay in ms
  # IN: f (optional) - function to invoke after delay
  # OUT: promise.then -> # delay has elapsed
  @timeout: timeout = (ms, f) =>
    p = new Promise (resolve) -> setTimeout resolve, ms
    if f? then p.then f else p

  # promise resolves once after first interval (and first invocation of f, if provided)
  # f will be called after ms and ever ms thereafter
  @interval: interval = (ms, f = ->) =>
    new Promise (resolve) ->
      setInterval(
        ->
          Promise.then f
          .then -> resolve()
        ms
      )

  @requestAnimationFrame:
    self.requestAnimationFrame       ||
    self.webkitRequestAnimationFrame ||
    self.mozRequestAnimationFrame    ||
    self.oRequestAnimationFrame      ||
    self.msRequestAnimationFrame     ||
    (f) -> setTimeout f, 1000 / 60

  #-------------------------------------
  # nextTick
  #-------------------------------------
  # For browsers without native Promise support, nextTick
  # effectively uses setTimeout(0), which isn't very fast.
  # See promise.coffee for info about how we can speed
  # things up by including a setImmediate polyfill.
  @nextTick: (f) => Promise.resolve().then -> f?()

  #-------------------------------------
  # throwErrorOutOfStack
  #-------------------------------------
  @throwErrorOutOfStack: (e) =>
    console.log e
    timeout 0, -> throw e
  @evalAndThrowErrorsOutOfStack: (f) =>
    try
      f()
    catch e
      Neptune.Art.StandardLib.log.error "evalAndThrowErrorsOutOfStack", e
      @throwErrorOutOfStack e
