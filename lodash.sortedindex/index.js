/**
 * Lo-Dash 3.0.0-pre (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback');

/** Native method references. */
var floor = Math.floor;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1,
    MAX_ARRAY_INDEX =  MAX_ARRAY_LENGTH - 1,
    HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

/**
 * The base implementation of `binaryIndex` which supports large arrays and
 * determining the insert index for `NaN` and `undefined`.
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {boolean} [retHighest] Specify returning the highest, instead
 *  of the lowest, index at which a value should be inserted into `array`.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseBinaryIndex(array, value, iteratee, retHighest) {
  iteratee = iteratee == null ? identity : iteratee;
  value = iteratee(value);

  var low = 0,
      high = array.length,
      valIsNaN = value !== value,
      valIsUndef = typeof value == 'undefined';

  while (low < high) {
    var mid = floor((low + high) / 2),
        computed = iteratee(array[mid]),
        isReflexive = computed === computed;

    if (valIsNaN) {
      var setLow = isReflexive || retHighest;
    } else if (valIsUndef) {
      setLow = isReflexive && (retHighest || typeof computed != 'undefined');
    } else {
      setLow = retHighest ? (computed <= value) : (computed < value);
    }
    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return nativeMin(high, MAX_ARRAY_INDEX);
}

/**
 * Performs a binary search of `array` to determine the index at which `value`
 * should be inserted into `array` in order to maintain its sort order. If
 * `iteratee` is provided it is invoked for `value` and each element of
 * `array` to compute their sort ranking. The iteratee is invoked with one
 * argument; (value).
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @param {boolean} [retHighest] Specify returning the highest, instead
 *  of the lowest, index at which a value should be inserted into `array`.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function binaryIndex(array, value, iteratee, retHighest) {
  var low = 0,
      high = array ? array.length : low;

  if (high && (iteratee || value !== value || typeof value == 'undefined' || high > HALF_MAX_ARRAY_LENGTH)) {
    return baseBinaryIndex(array, value, iteratee, retHighest);
  }
  while (low < high) {
    var mid = (low + high) >>> 1,
        computed = array[mid];

    if (retHighest ? (computed <= value) : (computed < value)) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return high;
}

/**
 * Uses a binary search to determine the lowest index at which `value` should
 * be inserted into `array` in order to maintain its sort order. If an iteratee
 * function is provided it is invoked for `value` and each element of `array`
 * to compute their sort ranking. The iteratee is bound to `thisArg` and
 * invoked with one argument; (value).
 *
 * If a property name is provided for `iteratee` the created "_.pluck" style
 * callback returns the property value of the given element.
 *
 * If an object is provided for `iteratee` the created "_.where" style callback
 * returns `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.pluck" or "_.where" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * _.sortedIndex([30, 50], 40);
 * // => 1
 *
 * _.sortedIndex([4, 4, 5, 5, 6, 6], 5);
 * // => 2
 *
 * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
 *
 * // using an iteratee function
 * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
 *   return this.data[word];
 * }, dict);
 * // => 1
 *
 * // using "_.pluck" callback shorthand
 * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
 * // => 1
 */
function sortedIndex(array, value, iteratee, thisArg) {
  iteratee = iteratee == null ? iteratee : baseCallback(iteratee, thisArg, 1);
  return binaryIndex(array, value, iteratee);
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = sortedIndex;
