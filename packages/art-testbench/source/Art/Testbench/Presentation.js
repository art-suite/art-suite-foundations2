"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["formattedInspect", "compactFlattenAll", "isFunction", "isString"],
    [global, require("art-standard-lib")],
    (formattedInspect, compactFlattenAll, isFunction, isString) => {
      let maxLength,
        indent,
        format,
        failWithExpectedMessage,
        generateFailedMessage,
        failWithExpectedMessageBase;
      return {
        maxLength: (maxLength = 80),
        indent: (indent = function(str) {
          return "  " + str.replace(/\n/g, "\n  ");
        }),
        format: (format = function(val) {
          return formattedInspect(val, maxLength);
        }),
        failWithExpectedMessage: (failWithExpectedMessage = function(
          context,
          a,
          verb,
          b,
          verb2,
          c
        ) {
          return failWithExpectedMessageBase(context, a, b, [
            indent(format(a)),
            verb,
            indent(format(b)),
            verb2 ? [verb2, indent(format(c))] : undefined
          ]);
        }),
        generateFailedMessage: (generateFailedMessage = function(
          context,
          a,
          b,
          lines
        ) {
          let error;
          return (
            "\n" +
            compactFlattenAll(
              context
                ? (isFunction(context)
                    ? (context = (() => {
                        try {
                          return context(a, b, lines);
                        } catch (error1) {
                          error = error1;
                          return {
                            getContextFunctionError: { context, error }
                          };
                        }
                      })())
                    : undefined,
                  isString(context) ? context : formattedInspect(context))
                : undefined,
              "expected",
              lines,
              "\n"
            ).join("\n\n")
          );
        }),
        failWithExpectedMessageBase: (failWithExpectedMessageBase = function(
          context,
          a,
          b,
          lines
        ) {
          return require("chai").assert.fail(
            a,
            b,
            generateFailedMessage(context, a, b, lines)
          );
        })
      };
    }
  );
});
