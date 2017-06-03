module.exports =
  package:
    description: "Generate index.coffee and namespace.coffee files from directory structures",
    bin:
      "neptune-namespaces": "./nn"
      nn:                   "./nn"

    scripts:
      test: "nn -s;mocha -u tdd --compilers coffee:coffee-script/register"

  webpack:
    common: target: "node"
    targets:
      index: {}
      generator: {}
