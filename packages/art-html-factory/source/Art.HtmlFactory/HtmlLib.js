"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let htmlEscapes, getHtmlEscape, escapeHtmlString;
  return {
    supportedTagsList: require("art-standard-lib").w(
      "A Abbr Acronym Address Applet Area Article Aside Audio B Base BaseFont Bdi Bdo Big BlockQuote Body Br Button Canvas Caption Center Cite Code Col ColGroup DataList Dd Del Details Dfn Dialog Dir Div Dl Dt Em Embed FieldSet FigCaption Figure Font Footer Form Frame FrameSet H1 H2 H3 H4 H5 H6 Head Header Hr Html I IFrame Img Input Ins Kbd KeyGen Label Legend Li Link Main Map Mark Menu MenuItem Meta Meter Nav NoFrames NoScript Ol OptGroup Option Output P Param Pre Progress Q Rp Rt Ruby S Samp Script Section Select Small Source Span Strike Strong Style Sub Summary Sup Table TBody Td TextArea TFoot Th THead Time Title Tr Track Tt U Ul Var Video Wbr RawHtml"
    ),
    noCloseTags: { link: true, meta: true, img: true, br: true, wbr: true },
    rawHtmlTags: Caf.object(["rawhtml", "pre", "script", "style"], () => true),
    spanningTags: Caf.object(
      ["span", "a", "b", "u", "i", "q", "s", "abbr", "em", "strike", "strong"],
      () => true
    ),
    htmlEscapes: (htmlEscapes = {
      '"': "&quot;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    }),
    getHtmlEscape: (getHtmlEscape = function(e) {
      return htmlEscapes[e];
    }),
    escapeHtmlString: (escapeHtmlString = function(string) {
      string = `${Caf.toString(string)}`;
      return /["<>&]/.test(string)
        ? string.replace(/["<>&]/g, getHtmlEscape)
        : string;
    })
  };
});
