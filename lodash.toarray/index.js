/**
 * Lo-Dash 3.0.0-pre (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseSlice = require('lodash._baseslice'),
    baseValues = require('lodash._basevalues'),
    keys = require('lodash.keys');

/**
 * Used as the maximum length of an array-like value.
 * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value <= MAX_SAFE_INTEGER;
}

/**
 * Converts `collection` to an array.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to convert.
 * @returns {Array} Returns the new converted array.
 * @example
 *
 * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
 * // => [2, 3, 4]
 */
function toArray(collection) {
  var length = collection ? collection.length : 0;
  if (!isLength(length)) {
    return values(collection);
  }
  if (!length) {
    return [];
  }
  return baseSlice(collection);
}

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Shape(x, y) {
 *   this.x = x;
 *   this.y = y;
 * }
 *
 * Shape.prototype.z = 0;
 *
 * _.values(new Shape(2, 1));
 * // => [2, 1] (iteration order is not guaranteed)
 */
function values(object) {
  return baseValues(object, keys(object));
}

module.exports = toArray;
