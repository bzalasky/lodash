/**
 * Lo-Dash 3.0.0-pre (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIndexOf = require('lodash._baseindexof');

/** Native method references. */
var floor = Math.floor;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

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
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using `SameValueZero` for equality comparisons. If `fromIndex` is negative,
 * it is used as the offset from the end of `array`. If `array` is sorted
 * providing `true` for `fromIndex` performs a faster binary search.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES6 spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {boolean|number} [fromIndex=0] The index to search from or `true`
 *  to perform a binary search on a sorted array.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.indexOf([1, 2, 3, 1, 2, 3], 2);
 * // => 1
 *
 * // using `fromIndex`
 * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
 * // => 4
 *
 * // performing a binary search
 * _.indexOf([4, 4, 5, 5, 6, 6], 5, true);
 * // => 2
 */
function indexOf(array, value, fromIndex) {
  var length = array ? array.length : 0;
  if (!length) {
    return -1;
  }
  if (typeof fromIndex == 'number') {
    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
  } else if (fromIndex) {
    var index = binaryIndex(array, value),
        other = array[index];

    return (value === value ? value === other : other !== other) ? index : -1;
  }
  return baseIndexOf(array, value, fromIndex);
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

module.exports = indexOf;
