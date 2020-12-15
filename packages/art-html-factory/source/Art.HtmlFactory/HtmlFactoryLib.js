"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "Object",
      "Error",
      "formattedInspect",
      "w",
      "compactFlatten",
      "objectHasKeys",
      "createObjectTreeFactories"
    ],
    [global, require("art-standard-lib"), require("art-object-tree-factory")],
    (
      Object,
      Error,
      formattedInspect,
      w,
      compactFlatten,
      objectHasKeys,
      createObjectTreeFactories
    ) => {
      let mergePropsInto, concatChildren, mergeProps, createHtmlFactories;
      return {
        mergePropsInto: (mergePropsInto = function(dest, source) {
          return Caf.object(
            source,
            (v, k) => {
              let temp;
              return v === null
                ? v
                : (() => {
                    switch (k) {
                      case "style":
                        if (!Caf.is(v, Object)) {
                          throw new Error(
                            `HtmlTextNode 'style' property must be an object: style: ${Caf.toString(
                              formattedInspect(v)
                            )}`
                          );
                        }
                        return Caf.object(
                          v,
                          null,
                          null,
                          (temp = dest.style) != null ? temp : {}
                        );
                      case "class":
                        return w(
                          `${Caf.toString(dest.class)} ${Caf.toString(v)}`
                        ).join(" ");
                      default:
                        return v;
                    }
                  })();
            },
            null,
            dest
          );
        }),
        concatChildren: (concatChildren = function(...children) {
          children = compactFlatten(children);
          return children.length > 0 ? children : undefined;
        }),
        mergeProps: (mergeProps = function(...props) {
          let out;
          props = compactFlatten(props);
          props =
            props.length === 1
              ? props[0]
              : Caf.each2(
                  props,
                  propSet => mergePropsInto(out, propSet),
                  null,
                  (out = {})
                );
          return objectHasKeys(props) ? props : undefined;
        }),
        createHtmlFactories: (createHtmlFactories = function(...elementNames) {
          return createObjectTreeFactories(
            { mergePropsInto },
            compactFlatten(elementNames),
            require("./HtmlTextNode")
          );
        })
      };
    }
  );
});
