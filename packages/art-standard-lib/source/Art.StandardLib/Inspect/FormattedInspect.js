"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "alignTabs",
      "formattedInspectString",
      "isObject",
      "isInspectableArray",
      "formattedInspectArray",
      "isString",
      "isFunction",
      "formattedInspectObject",
      "Object",
      "isNumber",
      "isPlainObject",
      "console",
      "Error",
      "postWhitespaceFormatting",
      "toInspectedObjects",
    ],
    [
      global,
      require("../TypesExtended"),
      require("./InspectedObjects"),
      require("./FormattedInspectObject"),
      require("./FormattedInspectString"),
      require("./FormattedInspectArray"),
      require("./AlignTabs"),
    ],
    (
      alignTabs,
      formattedInspectString,
      isObject,
      isInspectableArray,
      formattedInspectArray,
      isString,
      isFunction,
      formattedInspectObject,
      Object,
      isNumber,
      isPlainObject,
      console,
      Error,
      postWhitespaceFormatting,
      toInspectedObjects
    ) => {
      let typeOf,
        inspectCount,
        inspecting,
        formattedInspectRecursive,
        formattedInspectRecursiveWrapper,
        colorNames,
        colorizeFunctions,
        identity,
        passThroughColorizeFunctions,
        failsafeInspect;
      typeOf = eval("(x) => typeof x");
      inspectCount = 0;
      inspecting = [];
      formattedInspectRecursive = function (m, maxLineLength, options) {
        let out, error;
        inspectCount++;
        return isObject(m) && Caf.in(m, inspecting)
          ? "<<< back reference"
          : inspecting.length > options.maxDepth
          ? `<<< max depth reached (maxDepth: ${Caf.toString(
              options.maxDepth
            )})`
          : inspectCount >= options.maxCount
          ? `<<< max count reached (maxCount: ${Caf.toString(
              options.maxCount
            )})`
          : (inspecting.push(m),
            (out = (() => {
              try {
                return (() => {
                  switch (false) {
                    case !isInspectableArray(m):
                      return formattedInspectArray(
                        m,
                        maxLineLength,
                        options,
                        formattedInspectRecursive
                      );
                    case !isString(m):
                      return formattedInspectString(m, options);
                    case !isFunction(Caf.exists(m) && m.inspect):
                      return options.colorize.yellow(m.inspect());
                    case !isObject(m):
                      return formattedInspectObject(
                        m,
                        maxLineLength,
                        options,
                        formattedInspectRecursive
                      );
                    default:
                      return options.colorize.yellow("" + m);
                  }
                })();
              } catch (error1) {
                error = error1;
                return options.colorize.red(
                  `error inspecting value (typeof: ${Caf.toString(
                    typeOf(m)
                  )}): ${Caf.toString(error.message)}`
                );
              }
            })()),
            inspecting.pop(),
            out);
      };
      formattedInspectRecursiveWrapper = function (m, maxArrayLength, options) {
        let out, error;
        inspecting = [];
        inspectCount = 0;
        return (() => {
          try {
            out = formattedInspectRecursive(m, maxArrayLength, options);
            inspecting = null;
            return out;
          } catch (error1) {
            error = error1;
            inspecting = null;
            return (() => {
              throw error;
            })();
          }
        })();
      };
      colorNames = ["red", "yellow", "green", "blue", "grey"];
      colorizeFunctions = Caf.object(
        colorNames,
        (c) =>
          function (str) {
            let temp;
            return (temp = str[c]) != null ? temp : str;
          }
      );
      identity = function (s) {
        return s;
      };
      passThroughColorizeFunctions = Caf.object(colorNames, () => identity);
      return (module.exports = {
        alignTabs,
        formattedInspectString,
        failsafeInspect: (failsafeInspect = function (toInspect) {
          let base;
          return (
            `typeof: ${Caf.toString(typeOf(toInspect))}\n` +
            `constructor: ${Caf.toString(
              Caf.exists(toInspect) &&
                toInspect.constructor &&
                Caf.exists(toInspect) &&
                Caf.exists((base = toInspect.constructor)) &&
                base.name
            )}\n` +
            (() => {
              switch (false) {
                case !isInspectableArray(toInspect):
                  return `length: ${Caf.toString(
                    toInspect.length
                  )}\njoined: [${Caf.toString(toInspect.join(", "))}]`;
                case !(toInspect != null && typeOf(toInspect === "object")):
                  return `keys: ${Caf.toString(
                    Object.keys(toInspect).join(", ")
                  )}`;
                default:
                  return `toString: ${Caf.toString(toInspect)}`;
              }
            })()
          );
        }),
        formattedInspect: function (toInspect, options = {}) {
          let maxLineLength,
            indent,
            unquoted,
            colorizeEnabled,
            maxArrayLength,
            maxDepth,
            maxCount,
            error,
            out,
            base,
            base1;
          return (() => {
            try {
              if (isNumber(options)) {
                maxLineLength = options;
              } else {
                if (isPlainObject(options)) {
                  indent = options.indent;
                  unquoted = options.unquoted;
                  colorizeEnabled = options.color;
                  maxLineLength = options.maxLineLength;
                  maxArrayLength = options.maxArrayLength;
                  maxDepth = options.maxDepth;
                  maxCount = options.maxCount;
                } else {
                  console.error({ invalid: { options } });
                  throw new Error(
                    `invalid options object type: ${Caf.toString(
                      typeOf(options)
                    )}`
                  );
                }
              }
              maxLineLength != null
                ? maxLineLength
                : (maxLineLength =
                    (Caf.exists((base = global.process)) &&
                      Caf.exists((base1 = base.stdout)) &&
                      base1.columns) ||
                    80);
              maxArrayLength != null ? maxArrayLength : (maxArrayLength = 100);
              maxDepth != null ? maxDepth : (maxDepth = 50);
              maxCount != null ? maxCount : (maxCount = 5000);
              indent != null ? indent : (indent = "  ");
              return postWhitespaceFormatting(
                maxLineLength,
                formattedInspectRecursiveWrapper(
                  toInspectedObjects(toInspect),
                  maxLineLength,
                  {
                    unquoted,
                    indent,
                    maxLineLength,
                    maxArrayLength,
                    maxDepth,
                    maxCount,
                    newLineWithIndent: `\n${Caf.toString(indent)}`,
                    colorize: colorizeEnabled
                      ? colorizeFunctions
                      : passThroughColorizeFunctions,
                  }
                )
              ).replace(/\n\n$/, "\n");
            } catch (error1) {
              error = error1;
              out = `Error in formattedInspect: ${Caf.toString(
                error
              )}\n${Caf.toString(failsafeInspect(toInspect))}`;
              console.error(out, { error, toInspect, options });
              return out;
            }
          })();
        },
      });
    }
  );
});
