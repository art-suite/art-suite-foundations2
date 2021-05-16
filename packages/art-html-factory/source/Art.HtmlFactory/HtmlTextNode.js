"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "mergeProps",
      "concatChildren",
      "String",
      "merge",
      "rawHtmlTags",
      "Object",
      "escapeHtmlString",
      "compactFlatten",
      "compactFlattenJoin",
      "wrapAnsi",
      "spanningTags",
      "noCloseTags",
      "isString",
    ],
    [
      global,
      require("art-standard-lib"),
      require("./HtmlLib"),
      require("./HtmlFactoryLib"),
      { wrapAnsi: require("wrap-ansi") },
    ],
    (
      mergeProps,
      concatChildren,
      String,
      merge,
      rawHtmlTags,
      Object,
      escapeHtmlString,
      compactFlatten,
      compactFlattenJoin,
      wrapAnsi,
      spanningTags,
      noCloseTags,
      isString
    ) => {
      let HtmlTextNode;
      return (HtmlTextNode = Caf.defClass(
        class HtmlTextNode extends require("art-class-system").BaseClass {
          constructor(_name, _props, _children) {
            super(...arguments);
            this._name = _name;
            this._props = _props;
            this._children = _children;
            this._name = this._name.toLocaleLowerCase();
            this._normalizeChildren();
          }
        },
        function (HtmlTextNode, classSuper, instanceSuper) {
          let reformatTextForNiceHtmlSource,
            emptyString,
            emptyOptions,
            htmlFriendlyTextWrap,
            applyIndent;
          this.prototype.clone = function (options) {
            let props, children;
            if (Caf.exists(options)) {
              props = options.props;
              children = options.children;
            }
            return new this.class(
              this._name,
              props !== undefined ? mergeProps(props) : this._props,
              children !== undefined ? concatChildren(children) : this._children
            );
          };
          this.prototype.with = function (fields) {
            return this.clone(fields);
          };
          this.prototype.withProps = function (...props) {
            return this.clone({ props });
          };
          this.prototype.withMergedProps = function (...props) {
            return this.clone({ props: [this.props, props] });
          };
          this.prototype.withChildren = function (...children) {
            return this.clone({ children });
          };
          this.prototype.withAppendedChildren = function (...children) {
            return this.clone({ children: [this.children, children] });
          };
          this.prototype._normalizeChildren = function () {
            let temp;
            this._haveStringChildrenWithNewLines = false;
            return this._children != null
              ? (this._children =
                  (temp = Caf.find(
                    this._children,
                    (child) =>
                      Caf.array(this._children, (child) => {
                        if (Caf.is(child, String)) {
                          child = this._getNormalizedText(child);
                          if (/\n/.test(child)) {
                            this._haveStringChildrenWithNewLines = true;
                          }
                        }
                        return child;
                      }),
                    (child) => Caf.is(child, String)
                  )) != null
                    ? temp
                    : this._children)
              : undefined;
          };
          reformatTextForNiceHtmlSource = function (text) {
            return /\n *\n/.test(text)
              ? Caf.array(
                  text.replace(/\ *\n( *\n)+/g, "\n\n").split("\n\n"),
                  (p) => p.replace(/\ *\n\ */g, " ")
                ).join("\n\n")
              : text.replace(/\n/, " ");
          };
          this.prototype._getNormalizedText = function (text) {
            return this.preserveRawText
              ? text
              : reformatTextForNiceHtmlSource(text);
          };
          emptyString = "";
          this.getter("props", "name", "children", {
            inspectedObjects: function () {
              return {
                [this.name]: merge({
                  props: this.props,
                  children: this.children
                    ? Caf.array(this.children, (child) => {
                        let temp;
                        return (temp = child.inspectedObjects) != null
                          ? temp
                          : child;
                      })
                    : undefined,
                }),
              };
            },
            style: function () {
              let base;
              return Caf.exists((base = this._props)) && base.style;
            },
            preserveRawText: function () {
              return rawHtmlTags[this._name];
            },
            isRawHtml: function () {
              return this._name === "rawhtml";
            },
            childRequireMultipleLines: function () {
              return (
                !!this._children &&
                (this._children.length > 1 ||
                  this._children[0].onelinerOk === false)
              );
            },
            onelinerOk: function () {
              return (
                !this._haveStringChildrenWithNewLines &&
                !this.childRequireMultipleLines
              );
            },
            length: function () {
              let temp;
              return (temp = this._length) != null
                ? temp
                : (this._length =
                    5 +
                    this._name.length * 2 +
                    this.propsString.length +
                    Caf.reduce(
                      this._children,
                      (total, v) => total + v.length,
                      null,
                      0
                    ));
            },
            styleString: function () {
              let style, temp, from, into, to, i, temp1;
              return (temp = this._styleString) != null
                ? temp
                : (this._styleString = (style = this.style)
                    ? ((from = Object.keys(style).sort()),
                      (into = []),
                      from != null
                        ? ((to = from.length),
                          (i = 0),
                          (() => {
                            while (i < to) {
                              let name;
                              name = from[i];
                              into.push(
                                `${Caf.toString(name)}: ${Caf.toString(
                                  style[name]
                                )}`
                              );
                              temp1 = i++;
                            }
                            return temp1;
                          })())
                        : undefined,
                      into).join("; ")
                    : undefined);
            },
            propsString: function () {
              let temp, temp1;
              return (temp = this._propsString) != null
                ? temp
                : (this._propsString =
                    (temp1 = this._props
                      ? " " +
                        Caf.array(this._props, (propValue, propName) => {
                          if (propName === "style") {
                            propValue = this.styleString;
                          }
                          return propValue === true
                            ? propName
                            : `${Caf.toString(propName)}="${Caf.toString(
                                escapeHtmlString(propValue)
                              )}"`;
                        }).join(" ")
                      : undefined) != null
                      ? temp1
                      : emptyString);
            },
          });
          this.defaultCompileOptions = { tagWrap: 80, textWordWrap: 80 };
          this.prototype.compile = function (indentOrOptions) {
            let indent, options;
            if (Caf.is(indentOrOptions, String)) {
              indent = indentOrOptions;
              options = HtmlTextNode.defaultCompileOptions;
            } else {
              if (Caf.is(indentOrOptions, Object)) {
                indent = indentOrOptions.indent;
                ({ indent } = options = merge(
                  HtmlTextNode.defaultCompileOptions,
                  indentOrOptions
                ));
              }
            }
            if (indent === true) {
              indent = "";
            }
            return compactFlatten(this._compile(indent, options));
          };
          this.prototype.toString = function (options = "") {
            return this.compile(options).join("\n");
          };
          emptyOptions = {};
          this.prototype.toCompactString = function () {
            return compactFlattenJoin("", this._compile(null, emptyOptions));
          };
          htmlFriendlyTextWrap = function (line, columns) {
            return wrapAnsi(line.replace(/\ *\n( *\n)/g, "\n\n"), columns);
          };
          applyIndent = function (indent, line, columns) {
            if (columns > 0) {
              line = htmlFriendlyTextWrap(line, columns);
            }
            return indent != null
              ? indent + line.replace(/\n(?!\n)/g, `\n${Caf.toString(indent)}`)
              : line;
          };
          this.prototype._compile = function (indent, options) {
            let indentedStartTag, endTag;
            return this.isRawHtml && this._children
              ? this._getCompiledChildren(indent, emptyOptions)
              : indent != null &&
                indent.length + this.length <= options.tagWrap &&
                this.onelinerOk
              ? indent + this.toCompactString()
              : ((indentedStartTag = applyIndent(
                  indent,
                  `<${Caf.toString(this._name)}${Caf.toString(
                    this.propsString
                  )}>`
                )),
                (endTag = `</${Caf.toString(this._name)}>`),
                this._children
                  ? spanningTags[this.name]
                    ? indentedStartTag +
                      this._getCompiledChildrenSpan(indent, options) +
                      endTag
                    : [
                        indentedStartTag,
                        this._getCompiledChildren(indent, options),
                        applyIndent(indent, endTag),
                      ]
                  : noCloseTags[this._name]
                  ? indentedStartTag
                  : indentedStartTag + endTag);
          };
          this.prototype._getCompiledChildren = function (indent, options) {
            return this._children
              ? (indent != null && !this.isRawHtml
                  ? (indent = indent + "  ")
                  : undefined,
                Caf.array(this._children, (child) =>
                  isString(child)
                    ? this._name !== "pre"
                      ? applyIndent(
                          indent,
                          child,
                          !this.preserveRawText
                            ? options.textWordWrap
                            : undefined
                        )
                      : child
                    : child._compile(indent, options)
                ))
              : undefined;
          };
          this.prototype._getCompiledChildrenSpan = function (indent, options) {
            let compiledChildren;
            return this._children
              ? ((compiledChildren = compactFlatten(
                  Caf.array(this._children, (child) =>
                    isString(child)
                      ? this._name !== "pre"
                        ? applyIndent(
                            "",
                            child,
                            !this.preserveRawText
                              ? options.textWordWrap
                              : undefined
                          )
                        : child
                      : child._compile("", options)
                  )
                ).join("\n")),
                !this.isRawHtml
                  ? compiledChildren.replace(/\n/g, `\n${Caf.toString(indent)}`)
                  : compiledChildren)
              : undefined;
          };
        }
      ));
    }
  );
});
