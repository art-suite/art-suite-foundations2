"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "TestConfigurable",
      "describe",
      "test",
      "assert",
      "configure",
      "merge",
      "getArtConfig",
      "Promise",
    ],
    [global, require("./StandardImport")],
    (
      TestConfigurable,
      describe,
      test,
      assert,
      configure,
      merge,
      getArtConfig,
      Promise
    ) => {
      let expectedPath,
        configPath,
        pathedConfig,
        expanededPathedConfig,
        defaultConfig;
      expectedPath = ["Test", "Art", "Config"];
      configPath = expectedPath.join(".");
      pathedConfig = { [configPath]: { foo: 1 } };
      expanededPathedConfig = { Test: { Art: { Config: { foo: 1 } } } };
      ({ defaultConfig } = TestConfigurable);
      return describe({
        ConfigurableApi: function () {
          test("getDefaults", () =>
            assert.eq(TestConfigurable.getDefaults(), defaultConfig));
          return test("getPathedDefaultConfig", () =>
            assert.eq(TestConfigurable.getPathedDefaultConfig(), {
              [`${Caf.toString(configPath)}`]: defaultConfig,
            }));
        },
        Configuring: function () {
          test("TestConfigurable.getConfigurationPath", () =>
            assert.eq(TestConfigurable.getConfigurationPath(), expectedPath));
          test("TestConfigurable.getConfigurationFromPath - not found", () =>
            assert.eq(
              undefined,
              TestConfigurable.getConfigurationFromPath({ Tests: { foo: 1 } })
            ));
          test("TestConfigurable.getConfigurationFromPath - found", () =>
            assert.eq(
              { foo: 1 },
              TestConfigurable.getConfigurationFromPath(expanededPathedConfig)
            ));
          test("TestConfigurable.reset()", () => {
            let configBefore;
            configBefore = TestConfigurable.config;
            TestConfigurable.config.shouldBeDeleted = "bam!";
            TestConfigurable.reset();
            assert.eq(TestConfigurable.config, {
              name: "TestName",
              verbose: false,
            });
            return assert.equal(configBefore, TestConfigurable.config);
          });
          test("configure", () => {
            TestConfigurable.reset();
            configure({
              artConfig: merge({ novelProp: "cool" }, pathedConfig),
            });
            assert.eq(TestConfigurable.config, getArtConfig().Test.Art.Config);
            return assert.eq(TestConfigurable.config, {
              name: "TestName",
              foo: 1,
              verbose: false,
            });
          });
          return test("event", () =>
            new Promise((resolve) => {
              TestConfigurable.on({ configured: () => resolve() });
              TestConfigurable.reset();
              return configure({
                artConfigName: "test",
                artConfig: merge({ novelProp: "cool" }, pathedConfig),
              });
            }));
        },
      });
    }
  );
});
