"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "isObject",
      "inspectedObjectLiteral",
      "isPromise",
      "isPlainArray",
      "isPlainObject",
      "isTypedArray",
      "Error",
      "isRegExp",
      "isDate",
      "isClass",
      "isFunction",
      "isString",
      "isNonNegativeInt",
    ],
    [global, require("../TypesExtended"), require("./InspectedObjectLiteral")],
    (
      isObject,
      inspectedObjectLiteral,
      isPromise,
      isPlainArray,
      isPlainObject,
      isTypedArray,
      Error,
      isRegExp,
      isDate,
      isClass,
      isFunction,
      isString,
      isNonNegativeInt
    ) => {
      let dateFormat, inspecting, _backReferenceString, toInspectedObjectsR;
      dateFormat = require("dateformat");
      inspecting = [];
      return {
        _backReferenceString: (_backReferenceString = function (
          anscestors,
          obj
        ) {
          let generation;
          return (
            "<<< " +
            (() => {
              switch (
                (generation = anscestors.length - anscestors.indexOf(obj))
              ) {
                case 1:
                  return "self reference";
                case 2:
                  return "parent reference";
                case 3:
                  return "grandparent reference";
                case 4:
                  return "great grandparent reference";
                default:
                  return `${Caf.toString(
                    generation - 1
                  )} generations back reference`;
              }
            })()
          );
        }),
        toInspectedObjectsR: (toInspectedObjectsR = function (m) {
          let out,
            customInspectedObjects,
            literal,
            reducedFunctionString,
            functionString;
          return isObject(m) && Caf.in(m, inspecting)
            ? inspectedObjectLiteral(_backReferenceString(inspecting, m))
            : (inspecting.push(m),
              (out = (() => {
                switch (false) {
                  case !!(m != null):
                    return m;
                  case !(m === global):
                    return inspectedObjectLiteral("global");
                  case !(customInspectedObjects =
                    Caf.isF(m.getInspectedObjects) && m.getInspectedObjects()):
                    return customInspectedObjects;
                  case !isPromise(m):
                    return inspectedObjectLiteral("Promise");
                  case !isPlainArray(m):
                    return Caf.array(m, (v) => toInspectedObjectsR(v));
                  case !isPlainObject(m):
                    return Caf.object(m, (v) => toInspectedObjectsR(v));
                  case !isTypedArray(m):
                    return m;
                  case !(m instanceof Error):
                    literal = inspectedObjectLiteral(
                      m.stack || m.toString(),
                      true
                    );
                    return m.info
                      ? toInspectedObjectsR({
                          Error: { info: m.info, stack: literal },
                        })
                      : {
                          Error: {
                            class: toInspectedObjectsR(m.constructor),
                            stack: literal,
                          },
                        };
                  case !isRegExp(m):
                    return inspectedObjectLiteral(`${Caf.toString(m)}`);
                  case !isDate(m):
                    return inspectedObjectLiteral(
                      dateFormat(m, "UTC:yyyy-mm-dd HH:MM:ss Z")
                    );
                  case !isClass(m):
                    return inspectedObjectLiteral(
                      `class ${Caf.toString(
                        (Caf.isF(m.getName) && m.getName()) || m.name
                      )}`
                    );
                  case !isFunction(m):
                    reducedFunctionString = (functionString = `${Caf.toString(
                      m
                    )}`)
                      .replace(/\s+/g, " ")
                      .replace(/^function (\([^)]*\))/, "$1 ->")
                      .replace(/^\(\)\s*/, "");
                    return inspectedObjectLiteral(
                      reducedFunctionString.length < 80
                        ? reducedFunctionString
                        : functionString.slice(0, 5 * 80)
                    );
                  case !!isString(m):
                    return (() => {
                      switch (false) {
                        case !isNonNegativeInt(m.length):
                          return inspectedObjectLiteral(
                            `{${Caf.toString(
                              m.constructor.name
                            )} length: ${Caf.toString(m.length)}}`
                          );
                        case !isNonNegativeInt(m.byteLength):
                          return inspectedObjectLiteral(
                            `{${Caf.toString(
                              m.constructor.name
                            )} byteLength: ${Caf.toString(m.byteLength)}}`
                          );
                        default:
                          return m;
                      }
                    })();
                  default:
                    return m;
                }
              })()),
              inspecting.pop(),
              out);
        }),
        toInspectedObjects: function (m) {
          let out, error;
          inspecting = [];
          return (() => {
            try {
              out = toInspectedObjectsR(m);
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
        },
      };
    }
  );
});
