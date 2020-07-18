"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "createObjectTreeFactory", "assert", "createObjectTreeFactories"],
    [global, require("./StandardImport")],
    (test, createObjectTreeFactory, assert, createObjectTreeFactories) => {
      test("createObjectTreeFactory example", function() {
        let TreeNode, Node, commonProps;
        TreeNode = Caf.defClass(
          class TreeNode extends Object {
            constructor(props, children) {
              super(...arguments);
              this.props = props;
              this.children = children;
            }
          },
          function(TreeNode, classSuper, instanceSuper) {
            this.prototype.toObjects = function() {
              return {
                TreeNode: {
                  props: this.props,
                  children:
                    this.children &&
                    Caf.array(
                      this.children,
                      child =>
                        (Caf.isF(child.toObjects) && child.toObjects()) || child
                    )
                }
              };
            };
          }
        );
        Node = createObjectTreeFactory(
          (props, children) => new TreeNode(props, children)
        );
        commonProps = { color: "black" };
        return assert.eq(
          Node(
            commonProps,
            { height: "100", width: "200" },
            "Does this work for you?",
            Node(commonProps, { source: "images/piglet.png" }),
            "This works for me!",
            Node("Ka-blam!")
          ).toObjects(),
          {
            TreeNode: {
              props: { color: "black", height: "100", width: "200" },
              children: [
                "Does this work for you?",
                {
                  TreeNode: {
                    props: { color: "black", source: "images/piglet.png" },
                    children: undefined
                  }
                },
                "This works for me!",
                { TreeNode: { props: undefined, children: ["Ka-blam!"] } }
              ]
            }
          }
        );
      });
      return test("createObjectTreeFactories example", function() {
        let TagNode, Html, Head, Body, Div, P, B;
        TagNode = Caf.defClass(
          class TagNode extends Object {
            constructor(tag, props, children) {
              super(...arguments);
              this.tag = tag;
              this.props = props;
              this.children = children;
            }
          },
          function(TagNode, classSuper, instanceSuper) {
            this.prototype.toString = function(indent = "") {
              let indent2;
              return (
                `<${Caf.toString(this.tag)}` +
                (this.props
                  ? " " +
                    Caf.array(
                      this.props,
                      (v, k) => `${Caf.toString(k)}='${Caf.toString(v)}'`
                    ).join(" ")
                  : "") +
                ">" +
                (this.children
                  ? ((indent2 = indent + "  "),
                    "\n" +
                      indent2 +
                      Caf.array(this.children, child =>
                        child.toString(indent2)
                      ).join(`\n${Caf.toString(indent2)}`) +
                      "\n")
                  : "") +
                `${Caf.toString(indent)}</${Caf.toString(this.tag)}>`
              );
            };
          }
        );
        ({ Html, Head, Body, Div, P, B } = createObjectTreeFactories(
          ["html", "head", "body", "div", "p", "b"],
          TagNode
        ));
        return assert.eq(
          Html(
            Head(
              Body(
                Div(
                  { class: "row" },
                  Div(
                    { class: "col" },
                    P("This is truely ", B("fantastic"), "!")
                  ),
                  Div({ class: "col" }, P("What do you think?"))
                )
              )
            )
          ).toString(),
          "<html>\n  <head>\n    <body>\n      <div class='row'>\n        <div class='col'>\n          <p>\n            This is truely \n            <b>\n              fantastic\n            </b>\n            !\n          </p>\n        </div>\n        <div class='col'>\n          <p>\n            What do you think?\n          </p>\n        </div>\n      </div>\n    </body>\n  </head>\n</html>"
        );
      });
    }
  );
});
