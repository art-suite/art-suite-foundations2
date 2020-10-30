// Generated by CoffeeScript 1.12.7
(function() {
  var FoundationMath, StringExtensions, Types, compactFlatten, escapedDoubleQuoteRegex, floor, intRand, isArray, isBrowser, isNumber, isPlainObject, isString, stringIsPresent, wordsRegex;

  FoundationMath = require('./MathExtensions');

  Types = require('./TypesExtended');

  wordsRegex = require('./RegExpExtensions').wordsRegex;

  intRand = FoundationMath.intRand;

  isString = Types.isString, isNumber = Types.isNumber, isPlainObject = Types.isPlainObject, isArray = Types.isArray, stringIsPresent = Types.stringIsPresent;

  compactFlatten = require('./Core').compactFlatten;

  isBrowser = require('./Environment').isBrowser;

  escapedDoubleQuoteRegex = /[\\]["]/g;

  floor = Math.floor;

  module.exports = StringExtensions = (function() {
    var base62Characters, consistentJsonStringify, crypto, escapeDoubleQuoteJavascriptString, escapeJavascriptString, getPadding, jsStringifyR, npmPluralize, patchedNpmPluralize, pluralize, randomString, realRequire, ref, repeat, standardIndent;

    function StringExtensions() {}


    /*
    IN: an array and optionally a string, in any order
      joiner: the string
      array-to-flatten-and-join: the array
    
    OUT:
      compactFlatten(array).join joiner || ""
    
    NOTE: this uses Ruby's default value for joining - the empty array, not ',' which is JavaScripts
     */

    StringExtensions.compactFlattenJoin = function(a, b) {
      var array, joiner;
      array = null;
      joiner = isString(a) ? (array = b, a) : (array = a, b || "");
      return compactFlatten(array).join(joiner);
    };

    StringExtensions.base62Characters = base62Characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    StringExtensions.fastHash = function(string) {
      var hash, i, j, ref;
      hash = 2147483647;
      if (string.length > 0) {
        for (i = j = 0, ref = string.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          hash = ((hash << 5) - hash) + string.charCodeAt(i) & ((1 << 31) - 1);
        }
      }
      return hash;
    };


    /*
     * CaffeineScript once we have reduce + til support:
    
    @fastHash: (string) ->
       * 22 tokens
      reduce hash, i til string.length inject 0
        hash << 5
        - hash
        + string.charCodeAt i
        | 0
     */

    StringExtensions.randomString = randomString = function(length, chars, randomNumbers) {
      var charsLength, i, result;
      if (length == null) {
        length = 32;
      }
      if (chars == null) {
        chars = base62Characters;
      }
      result = '';
      charsLength = chars.length;
      if (randomNumbers) {
        return ((function() {
          var j, ref, results;
          results = [];
          for (i = j = 0, ref = length; j < ref; i = j += 1) {
            results.push(chars[randomNumbers[i] % charsLength]);
          }
          return results;
        })()).join('');
      } else {
        return ((function() {
          var j, ref, results;
          results = [];
          for (i = j = 0, ref = length; j < ref; i = j += 1) {
            results.push(chars[intRand(charsLength)]);
          }
          return results;
        })()).join('');
      }
    };

    StringExtensions.cryptoRandomString = isBrowser ? ((crypto = global.crypto, global), !crypto ? (realRequire = eval('require'), crypto = realRequire("crypto")) : void 0, crypto ? function(l, c) {
      if (l == null) {
        l = 16;
      }
      return randomString(l, c, crypto.getRandomValues(new Uint8Array(l)));
    } : (console.warn("window.crypto not available, using standard random for cryptoRandomString"), function(l, c) {
      if (l == null) {
        l = 16;
      }
      return randomString(l, c);
    })) : (realRequire = eval('require'), crypto = realRequire("crypto"), function(l, c) {
      return randomString(l, c, crypto.randomBytes(l));
    });

    StringExtensions.randomBase62Character = function() {
      return base62Characters[intRand(62)];
    };


    /* pluralize
      Examples:
         * just, always, pluralize:
        pluralize "food" >> "foods"
    
         * pluralize and output number
        pluralize -1, "food" -> "-1 foods"
        pluralize 0, "food" -> "0 foods"
        pluralize 1, "food" -> "1 food"
        pluralize 2, "food" -> "2 foods"
    
         * order of the first 2 params doesn't matter
        pluralize 1, "food" -> "1 food"
        pluralize "food", 1 -> "1 food"
    
         * custom pluralForms
        pluralize 1, "dragon", "frogs" -> "1 dragon"
        pluralize 3, "dragon", "frogs" -> "2 frogs"
    
      IN:
        various signatures:
          pluralize singleForm
          pluralize singleForm, number
          pluralize number, singleForm
          pluralize singleForm, number, pluralForm
          pluralize number, singleForm, pluralForm
    
        number:     <Number>
        singleForm: <String> singular noun
          NOTE: if pluralForm is not provided, it's ok
            if this is a plural nown, it'll still
            'do the right thing'
    
        pluralForm: <String> plural noun
    
      OUT:
    
        unless number == 0
          pluralForm ?=
    
        if a number was provided
          "#{number} #{correct singleForm or pluralForm}"
        else
          pluralForm
    
      NOTE:
        Now using: https://www.npmjs.com/package/pluralize
        It provides nice functionality and knows about all the odd
        english words.
    
        Compatibility:
          ArtStandardLib's pluralize always outputs the number
          if the number is given, unlike npm-pluralize, which
          requires a 'true' in the 3rd argument to enable outputting
          the number.
    
          ArtStandardLib let's you provide your own, custom pluralForm.
          npm-pluralize requires you to 'register' it first via addIrregularRule.
          You can still do that, if you wish, but it's renamed 'addPluralizeRule'
          in ArtStandardLib since it's expected you'll import it 'bare' and
          'addIrregularRule' could mean anything out-of-context.
    
        It's an extra 2.1k payload minimized and brotli-zipped for client-side.
    
        It also allows us to provide:
          {@plural, @singular, @isSingular, @isPlural, @addPluralizeRule}
     */

    ref = npmPluralize = require('pluralize'), StringExtensions.plural = ref.plural, StringExtensions.singular = ref.singular, StringExtensions.isSingular = ref.isSingular, StringExtensions.isPlural = ref.isPlural, StringExtensions.addPluralizeRule = ref.addIrregularRule;

    patchedNpmPluralize = function(noun, a, b) {
      var __, append, match, out;
      if (match = /^(.*)(_|[^\w])+$/.exec(noun)) {
        __ = match[0], noun = match[1], append = match[2];
      }
      out = npmPluralize(noun, a, b);
      if (append) {
        return out + append;
      } else {
        return out;
      }
    };

    StringExtensions.pluralize = pluralize = function(a, b, pluralForm) {
      var newPluralize, number, singleForm;
      number = (b != null) && isNumber(b) ? (singleForm = a, b) : isNumber(a) ? (singleForm = b, a) : (singleForm = stringIsPresent(a) ? a : stringIsPresent(b) ? b : void 0, null);
      if (!isString(singleForm) || (pluralForm && !isString(pluralForm))) {
        throw new Error("singleForm and pluralForm(optional) should be non-empty strings (inputs: " + (Neptune.Art.StandardLib.formattedInspect({
          a: a,
          b: b,
          pluralForm: pluralForm
        })) + ")");
      }
      return newPluralize = (function() {
        switch (false) {
          case pluralForm == null:
            return number + " " + (number === 1 ? singleForm : pluralForm);
          case number == null:
            return patchedNpmPluralize(singleForm, number, true);
          default:
            return patchedNpmPluralize(singleForm);
        }
      })();
    };

    StringExtensions.replaceLast = function(str, find, replaceWith) {
      var index;
      index = str.lastIndexOf(find);
      if (index >= 0) {
        return str.substring(0, index) + replaceWith + str.substring(index + find.length);
      } else {
        return str.toString();
      }
    };

    StringExtensions.getPadding = getPadding = function(length, padding) {
      var i, j, out, ref1;
      if (padding == null) {
        padding = " ";
      }
      out = "";
      for (i = j = 0, ref1 = length; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
        out += padding;
      }
      return out;
    };

    StringExtensions.pad = function(str, length, padding, alignRight) {
      var exactPadding;
      str = String(str);
      if (str.length >= length) {
        return str;
      }
      exactPadding = getPadding(Math.max(length - str.length, 0), padding);
      if (alignRight) {
        return exactPadding + str;
      } else {
        return str + exactPadding;
      }
    };

    StringExtensions.escapeDoubleQuoteJavascriptString = escapeDoubleQuoteJavascriptString = function(str) {
      var s;
      console.warn("DEPRICATED: escapeDoubleQuoteJavascriptString. USE: escapeJavascriptString");
      s = String(str).replace(/[\\"]/g, "\\$&").replace(/[\0\b\f\n\r\t\v\u2028\u2029]/g, function(x) {
        switch (x) {
          case '\0':
            return "\\0";
          case '\b':
            return "\\b";
          case '\f':
            return "\\f";
          case '\n':
            return "\\n";
          case '\r':
            return "\\r";
          case '\t':
            return "\\t";
          case '\v':
            return "\\v";
          case '\u2028':
            return "\\u2028";
          case '\u2029':
            return "\\u2029";
        }
      });
      return s = '"' + s + '"';
    };


    /*
    SBD for a while I only had JSON.stringify here, but I hate seeing: "I said, \"hello.\""
    when I could be seeing: 'I said, "hello."'
    
    Is this going to break anything? I figure if you really need "" only, just use stringify.
     */

    StringExtensions.escapeJavascriptString = escapeJavascriptString = function(str, withoutQuotes) {
      var s;
      s = JSON.stringify(str);
      if (withoutQuotes) {
        return s.slice(1, -1);
      } else if (s.match(escapedDoubleQuoteRegex)) {
        return "'" + (s.replace(escapedDoubleQuoteRegex, '"').replace(/'/g, "\\'").slice(1, -1)) + "'";
      } else {
        return s;
      }
    };

    StringExtensions.allIndexes = function(str, regex) {
      var indexes, lastIndex, result;
      indexes = [];
      if (!((regex instanceof RegExp) && regex.global)) {
        throw new Error("regex must be a global RegExp");
      }
      regex.lastIndex = 0;
      while (result = regex.exec(str)) {
        indexes.push(result.index);
        lastIndex = result;
      }
      return indexes;
    };

    StringExtensions.repeat = repeat = " ".repeat ? function(str, times) {
      return str.repeat(times);
    } : function(str, count) {
      var result;
      count === floor(count);
      result = '';
      if (count > 0 && str.length > 0) {
        while (true) {
          if ((count & 1) === 1) {
            result += str;
          }
          count >>>= 1;
          if (count === 0) {
            break;
          }
          str += str;
        }
      }
      return result;
    };

    StringExtensions.rightAlign = function(str, width) {
      if (str.length >= width) {
        return str;
      } else {
        return repeat(" ", width - str.length) + str;
      }
    };

    StringExtensions.eachMatch = function(str, regex, f) {
      var result;
      regex.lastIndex = 0;
      while (result = regex.exec(str)) {
        f(result);
      }
      return null;
    };

    standardIndent = {
      joiner: ', ',
      openObject: '{',
      openArray: '[',
      closeObject: "}",
      closeArray: "]"
    };

    StringExtensions.jsStringify = function(obj) {
      return jsStringifyR(obj, "");
    };

    jsStringifyR = function(o, s) {
      var el, first, j, k, len, v;
      if (isPlainObject(o)) {
        s += "{";
        first = true;
        for (k in o) {
          v = o[k];
          if (first) {
            first = false;
          } else {
            s += ",";
          }
          if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k)) {
            s += k;
          } else {
            s += JSON.stringify(k);
          }
          s += ":";
          s = jsStringifyR(v, s);
        }
        return s + "}";
      } else if (isArray(o)) {
        s += "[";
        first = true;
        for (j = 0, len = o.length; j < len; j++) {
          el = o[j];
          if (first) {
            first = false;
          } else {
            s += ",";
          }
          s = jsStringifyR(el, s);
        }
        return s + "]";
      } else {
        return s + JSON.stringify(o);
      }
    };

    StringExtensions.consistentJsonStringify = consistentJsonStringify = function(object, indent) {
      var closeArray, closeObject, error, indentObject, joiner, k, lastTotalIndent, openArray, openObject, out, totalIndent, v;
      return out = (function() {
        var ref1;
        if (object === false || object === true || object === null || isNumber(object)) {
          return "" + object;
        } else if (isString(object)) {
          return JSON.stringify(object);
        } else {
          indentObject = indent ? typeof indent === "string" ? {
            joiner: ",\n" + indent,
            openObject: "{\n" + indent,
            openArray: "[\n" + indent,
            closeObject: "\n}",
            closeArray: "\n]",
            totalIndent: indent,
            indent: indent
          } : {
            totalIndent: totalIndent = indent.indent + (lastTotalIndent = indent.totalIndent),
            joiner: ",\n" + totalIndent,
            openObject: "{\n" + totalIndent,
            openArray: "[\n" + totalIndent,
            closeObject: "\n" + lastTotalIndent + "}",
            closeArray: "\n" + lastTotalIndent + "]",
            indent: indent.indent
          } : void 0;
          ref1 = indentObject || standardIndent, joiner = ref1.joiner, openObject = ref1.openObject, openArray = ref1.openArray, closeObject = ref1.closeObject, closeArray = ref1.closeArray;
          if (isPlainObject(object)) {
            return openObject + ((function() {
              var j, len, ref2, results;
              ref2 = (Object.keys(object)).sort();
              results = [];
              for (j = 0, len = ref2.length; j < len; j++) {
                k = ref2[j];
                if (object[k] !== void 0) {
                  results.push(JSON.stringify(k) + ": " + consistentJsonStringify(object[k], indentObject));
                }
              }
              return results;
            })()).join(joiner) + closeObject;
          } else if (isArray(object)) {
            return openArray + ((function() {
              var j, len, results;
              results = [];
              for (j = 0, len = object.length; j < len; j++) {
                v = object[j];
                results.push(consistentJsonStringify(v, indentObject));
              }
              return results;
            })()).join(joiner) + closeArray;
          } else {
            Neptune.Art.StandardLib.log.error(error = "invalid object type for Json. Expecting: null, false, true, number, string, plain-object or array", object);
            throw new Error(error);
          }
        }
      })();
    };

    StringExtensions.splitRuns = function(str) {
      var ch, chCount, i, j, lastCh, ref1, result;
      if (str.length === 0) {
        return [];
      }
      lastCh = str[0];
      chCount = 1;
      result = [];
      for (i = j = 1, ref1 = str.length; j < ref1; i = j += 1) {
        ch = str[i];
        if (ch === lastCh) {
          chCount++;
        } else {
          result.push([lastCh, chCount]);
          chCount = 1;
        }
        lastCh = ch;
      }
      result.push([lastCh, chCount]);
      return result;
    };

    StringExtensions.eachRunAsCharCodes = function(str, f) {
      var ch, chCount, i, j, lastCh, ref1;
      lastCh = str.charCodeAt(0);
      chCount = 1;
      for (i = j = 1, ref1 = str.length; j < ref1; i = j += 1) {
        ch = str.charCodeAt(i);
        if (ch === lastCh) {
          chCount++;
        } else {
          f(lastCh, chCount);
          chCount = 1;
        }
        lastCh = ch;
      }
      f(lastCh, chCount);
      return null;
    };


    /*
    TODO: I think this can be generalized to cover most all ellipsies and word-wrap scenarios:
      a) have an options object with options:
        maxLength: number         # similar to current maxLength
        minLength: number         # currently implied to be maxLength / 2, in additional customizable, it would also be optional
        brokenWordEllipsis: "…"   # used when only part of a word is included
        moreWordsEllipsis: "…"    # used when there are more words, but the last word is whole
        wordLengthFunction: (string) -> string.length
           * can be replaced with, say, the font pixel-width for a string
           * in this way, this function can be used by text-layout
           * minLength and maxLength would then be in pixels
        breakWords: false         # currently, this is effectively true - will break the last word on line in most situations
        breakOnlyWord: true       # even if breakWords is false, if this is the only word on the line and it doesn't fit, should we break it?
                                   * should this even be an option?
         * future:
        wordBreakFunction: (word, maxLength) -> shorterWord
           * given a word and the maximum length of that word, returns
           * a word <= maxLength according to wordLengthFunction
    
      b) Use cases
        - TextLayout - uses pixels for length rather than characters
        - Art.Engine.Element 'flow' layout
          - if the input was an array of "words" and
          - wordLengthFunction returns the Element's width...
          I think this works. We'd need a way to handle margins though. I think this works:
            spaceLength: (leftWord, rightWord) -> 1
        - Shortend user display names:
          Options:
            wordBreakFunction: (word, maxLength) -> word[0]
            brokenWordEllipsis: "." or ""
          Example Output:
            "Shane Delamore", 10 > "Shane D." or
            "Shane Delamore", 10 > "Shane D"
          Or, just leave breakwords: false and get:
            "Shane Delamore", 10 > "Shane"
    
      c) returns both the output string and the "string remaining" - everything not included
      d) alternate input: an array of strings already broken up by words - the "remainging" return value would then also be an array of "words"
        (this would be for efficiency when doing multi-line layout)
    
    Right now, it works as follows:
    The output string is guaranteed to be:
      <= maxLength
      >= maxLength / 2 in almost all secenarios as long as inputString is >= maxLength / 2
     */

    StringExtensions.humanFriendlyShorten = function(inputString, maxLength) {
      var j, len, minLength, part, string, stringParts;
      if (!(maxLength > 0)) {
        throw new error("maxLength must be > 0");
      }
      inputString = inputString.trim();
      if (!(inputString.length > maxLength)) {
        return inputString;
      }
      minLength = maxLength / 2;
      stringParts = inputString.split(/\s+/);
      string = "";
      for (j = 0, len = stringParts.length; j < len; j++) {
        part = stringParts[j];
        if (string.length === 0) {
          string = part;
        } else if ((string.length < minLength) || string.length + part.length + 2 <= maxLength) {
          string += " " + part;
        } else {
          break;
        }
      }
      if (string.length > maxLength) {
        string = string.slice(0, maxLength - 1).trim();
      }
      return string + "…";
    };

    StringExtensions.stripTrailingWhitespace = function(a) {
      return a.split(/[ ]*\n/).join("\n").split(/[ ]*$/)[0].replace(/\n+$/, '');
    };

    return StringExtensions;

  })();

}).call(this);
