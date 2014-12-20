/**
 * Lo-Dash 3.0.0-pre (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var charsLeftIndex = require('lodash._charsleftindex'),
    isIterateeCall = require('lodash._isiterateecall'),
    trimmedLeftIndex = require('lodash._trimmedleftindex');

/**
 * Removes leading whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trimLeft('  fred  ');
 * // => 'fred  '
 *
 * _.trimLeft('-_-fred-_-', '_-');
 * // => 'fred-_-'
 */
function trimLeft(string, chars, guard) {
  var value = string;
  string = string == null ? '' : String(string);
  if (!string) {
    return string;
  }
  if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
    return string.slice(trimmedLeftIndex(string))
  }
  chars = String(chars);
  return string.slice(charsLeftIndex(string, chars));
}

module.exports = trimLeft;
