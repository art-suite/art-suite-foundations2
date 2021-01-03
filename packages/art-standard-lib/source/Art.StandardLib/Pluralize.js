"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["isNumber", "stringIsPresent", "isString", "Error", "Neptune"],
    [global, require("./TypesExtended")],
    (isNumber, stringIsPresent, isString, Error, Neptune) => {
      let npmPluralize,
        plural,
        singular,
        isSingular,
        isPlural,
        addPluralizeRule,
        patchedNpmPluralize,
        temp;
      temp = npmPluralize = require("pluralize");
      plural = temp.plural;
      singular = temp.singular;
      isSingular = temp.isSingular;
      isPlural = temp.isPlural;
      addPluralizeRule = temp.addIrregularRule;
      patchedNpmPluralize = function (noun, a, b) {
        let match, __, append, out;
        if ((match = /^(.*)(_|[^\w])+$/.exec(noun))) {
          [__, noun, append] = match;
        }
        out = npmPluralize(noun, a, b);
        return append ? out + append : out;
      };
      return {
        plural,
        singular,
        isSingular,
        isPlural,
        addPluralizeRule,
        pluralize: function (a, b, pluralForm) {
          let number, singleForm;
          number =
            b != null && isNumber(b)
              ? ((singleForm = a), b)
              : isNumber(a)
              ? ((singleForm = b), a)
              : ((singleForm = stringIsPresent(a)
                  ? a
                  : stringIsPresent(b)
                  ? b
                  : undefined),
                null);
          if (!isString(singleForm) || (pluralForm && !isString(pluralForm))) {
            throw new Error(
              `singleForm and pluralForm(optional) should be non-empty strings (inputs: ${Caf.toString(
                Neptune.Art.StandardLib.formattedInspect({ a, b, pluralForm })
              )})`
            );
          }
          return (() => {
            switch (false) {
              case !(pluralForm != null):
                return `${Caf.toString(number)} ${Caf.toString(
                  number === 1 ? singleForm : pluralForm
                )}`;
              case !(number != null):
                return patchedNpmPluralize(singleForm, number, true);
              default:
                return patchedNpmPluralize(singleForm);
            }
          })();
        },
      };
    }
  );
});
