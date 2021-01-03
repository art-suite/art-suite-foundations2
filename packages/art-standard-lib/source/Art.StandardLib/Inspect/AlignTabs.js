"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["max", "ansiSafeStringLength", "pad"],
    [global, require("../Ansi"), require("../StringExtensions"), global.Math],
    (max, ansiSafeStringLength, pad) => {
      let alignTabs, postWhitespaceFormatting;
      return {
        alignTabs: (alignTabs = function (linesString, maxLineLength = 10000) {
          let lines, maxColumnSizes, maxColumnWidth;
          lines = linesString.split("\n");
          maxColumnSizes = [];
          maxColumnWidth = maxLineLength / 2;
          Caf.each2(lines, (line) => {
            let elements;
            return (elements = line.split("\t")).length > 1
              ? Caf.each2(
                  elements,
                  (el, i) => {
                    if (maxColumnSizes.length === i) {
                      maxColumnSizes.push(0);
                    }
                    return (maxColumnSizes[i] = max(
                      maxColumnSizes[i],
                      ansiSafeStringLength(el) + 1
                    ));
                  },
                  (el, i) =>
                    i < elements.length - 1 &&
                    (i === 0 || ansiSafeStringLength(el) < maxColumnWidth)
                )
              : undefined;
          });
          return Caf.array(lines, (line) => {
            let spaceAvailable, elements;
            spaceAvailable = maxLineLength - ansiSafeStringLength(line);
            elements = line.split("\t");
            return (elements.length > 1
              ? Caf.array(elements, (el, i) => {
                  let elLength, expandAmount;
                  elLength = ansiSafeStringLength(el);
                  return i === elements.length - 1
                    ? el
                    : maxColumnSizes[i] != null &&
                      (expandAmount = maxColumnSizes[i] - elLength - 1) <=
                        spaceAvailable
                    ? ((spaceAvailable -= expandAmount),
                      el + pad("", maxColumnSizes[i] - elLength))
                    : ((spaceAvailable = 0), `${Caf.toString(el)} `);
                })
              : elements
            ).join("");
          }).join("\n");
        }),
        postWhitespaceFormatting: (postWhitespaceFormatting = function (
          maxLineLength,
          string
        ) {
          let lastIndent, sameIndentGroup, outLines, alignTabsInSameIndentGroup;
          lastIndent = 0;
          sameIndentGroup = [];
          outLines = [];
          alignTabsInSameIndentGroup = () => {
            let str;
            return 0 < sameIndentGroup.length
              ? ((str = sameIndentGroup.join("\n")),
                (sameIndentGroup = []),
                outLines.push(alignTabs(str, maxLineLength)))
              : undefined;
          };
          Caf.each2(string.split("\n"), (line) => {
            let indent;
            line = line.replace(/\s+$/g, "");
            if (
              lastIndent !==
              (indent = ansiSafeStringLength(line.match(/^ *-?/)[0]))
            ) {
              alignTabsInSameIndentGroup();
            }
            sameIndentGroup.push(line);
            return (lastIndent = indent);
          });
          alignTabsInSameIndentGroup();
          return outLines.join("\n");
        }),
      };
    }
  );
});
