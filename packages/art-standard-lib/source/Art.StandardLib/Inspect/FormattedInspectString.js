"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["String", "escapeJavascriptString"],
    [global, require("../StringExtensions")],
    (String, escapeJavascriptString) => {
      let multilineStringRegExp,
        cafScriptWordStringRegExp,
        escapeForBlockString,
        formattedInspectString;
      multilineStringRegExp = /[^\n\s].*\n(.|\n)*[^\n\s]/;
      cafScriptWordStringRegExp = /^(?=[^'":])([^\#\s\0-\x20\x7f;,()[\]{}\\]|\#([^{]|$))+$/;
      return {
        escapeForBlockString: (escapeForBlockString = (str) =>
          String(str)
            .replace(/[\\\0\b\f\r\t\v\u001b\u2028\u2029]/g, (x) =>
              (() => {
                switch (x) {
                  case "\\":
                    return "\\\\";
                  case "\0":
                    return "\\0";
                  case "\b":
                    return "\\b";
                  case "\f":
                    return "\\f";
                  case "\r":
                    return "\\r";
                  case "\t":
                    return "\\t";
                  case "\v":
                    return "\\v";
                  case "\u2028":
                    return "\\u2028";
                  case "\u2029":
                    return "\\u2029";
                  case "\u001b":
                    return "\\u001b";
                }
              })()
            )
            .replace(/^[\n ]+|[\n ]+$|[ ]+(?=\n)/g, (x) =>
              escapeJavascriptString(x, true).replace(/\ /g, "\\s")
            )),
        formattedInspectString: (formattedInspectString = function (
          m,
          { colorize, unquoted, newLineWithIndent }
        ) {
          return colorize.green(
            (() => {
              switch (false) {
                case !unquoted:
                  return m;
                case !cafScriptWordStringRegExp.test(m):
                  return `:${Caf.toString(m)}`;
                case !multilineStringRegExp.test(m):
                  return (
                    '"""' +
                    newLineWithIndent +
                    escapeForBlockString(m).replace(/\n/g, newLineWithIndent)
                  ).replace(/\ +\n/g, "\n");
                default:
                  return escapeJavascriptString(m);
              }
            })()
          );
        }),
      };
    }
  );
});
