"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "isPlainArray",
      "isTypedArray",
      "objectName",
      "isPlainObject",
      "objectKeyCount",
      "ansiSafeStringLength",
    ],
    [
      global,
      require("../Ansi"),
      require("../TypesExtended"),
      require("../ObjectExtensions"),
    ],
    (
      isPlainArray,
      isTypedArray,
      objectName,
      isPlainObject,
      objectKeyCount,
      ansiSafeStringLength
    ) => {
      let isInspectableArray, formattedInspectArray;
      return {
        isInspectableArray: (isInspectableArray = function (v) {
          return isPlainArray(v) || isTypedArray(v);
        }),
        formattedInspectArray: (formattedInspectArray = function (
          m,
          maxLineLength,
          options,
          formattedInspectRecursive
        ) {
          let maxArrayLength,
            colorize,
            indent,
            newLineWithIndent,
            lengthOfInspectedValues,
            lastWasObject,
            lastWasArray,
            objectsMustBeExplicit,
            oneLinerOk,
            inspectedValuesContainNewlines,
            inspectedValues,
            lengthOfCommas,
            lengthOfStartBrackets,
            arrayStart,
            suffix;
          maxArrayLength = options.maxArrayLength;
          colorize = options.colorize;
          indent = options.indent;
          newLineWithIndent = options.newLineWithIndent;
          lengthOfInspectedValues = 0;
          lastWasObject = false;
          lastWasArray = false;
          objectsMustBeExplicit = false;
          oneLinerOk = true;
          inspectedValuesContainNewlines = false;
          Caf.each2(m, (value, i) =>
            isPlainObject(value)
              ? (i < m.length - 1 ? (oneLinerOk = false) : undefined,
                lastWasObject ? (objectsMustBeExplicit = true) : undefined,
                (lastWasObject = true))
              : (lastWasObject = false)
          );
          inspectedValues = Caf.array(m.slice(0, maxArrayLength), (value) => {
            let inspected, inspectedHasNewlines, objectStart;
            if (lastWasArray) {
              oneLinerOk = false;
            }
            if (isInspectableArray(value)) {
              lastWasArray = true;
            }
            inspected = formattedInspectRecursive(
              value,
              maxLineLength - indent.length,
              options
            );
            inspectedHasNewlines = /\n/.test(inspected);
            if (
              objectsMustBeExplicit &&
              isPlainObject(value) &&
              objectKeyCount(value) > 0
            ) {
              objectStart = "{}";
              objectStart = colorize.grey(objectStart);
              inspected = inspectedHasNewlines
                ? `${Caf.toString(objectStart)}${Caf.toString(
                    newLineWithIndent
                  )}${Caf.toString(
                    inspected.replace(/\n/g, newLineWithIndent)
                  )}`
                : `${Caf.toString(objectStart)} ${Caf.toString(inspected)}`;
            }
            if (inspectedHasNewlines) {
              oneLinerOk = false;
              inspected = inspected.replace(/\n/g, newLineWithIndent);
              if (!/\n\s*$/.test(inspected)) {
                inspected += "\n";
              }
            }
            lengthOfInspectedValues += ansiSafeStringLength(inspected);
            return inspected;
          });
          lengthOfCommas = (inspectedValues.length - 1) * 2;
          lengthOfStartBrackets = 3;
          arrayStart = isTypedArray(m)
            ? `{${Caf.toString(objectName(m))}}`
            : "[]";
          if (m.length > maxArrayLength) {
            arrayStart += ` <length: ${Caf.toString(m.length)}>`;
            suffix = "...";
          }
          arrayStart = colorize.grey(arrayStart);
          return oneLinerOk &&
            maxLineLength >=
              lengthOfStartBrackets + lengthOfCommas + lengthOfInspectedValues
            ? inspectedValues.length === 0
              ? arrayStart
              : `${Caf.toString(arrayStart)} ${Caf.toString(
                  inspectedValues.join(",\t")
                )}${Caf.toString(suffix != null ? suffix : "")}`
            : `${Caf.toString(arrayStart)}\n  ${Caf.toString(
                inspectedValues.join("\n  ")
              )}${Caf.toString(suffix ? `\n  ${Caf.toString(suffix)}` : "")}`;
        }),
      };
    }
  );
});
