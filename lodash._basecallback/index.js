/**
 * Lo-Dash 3.0.0-pre (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var matches = require('lodash.matches');

/**
 * The base implementation of `_.callback`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param {number} [argCount] The number of arguments the callback accepts.
 * @returns {Function} Returns the new function.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;

  if (type == 'function') {
    if (typeof thisArg == 'undefined') {
      return func;
    }
    switch (argCount) {
      case 1: return function(value) {
        return func.call(thisArg, value);
      };
      case 3: return function(value, index, collection) {
        return func.call(thisArg, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(thisArg, accumulator, value, index, collection);
      };
      case 5: return function(value, other, key, object, source) {
        return func.call(thisArg, value, other, key, object, source);
      };
    }
    return function() {
      return func.apply(thisArg, arguments);
    };
  }
  if (func == null) {
    return identity;
  }
  // Handle "_.pluck" and "_.where" style callback shorthands.
  return type == 'object' ? matches(func) : property(func);
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

/**
 * Creates a "_.pluck" style function which returns the property value
 * of `key` on a given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {string} key The name of the property to retrieve.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var users = [
 *   { 'user': 'fred' },
 *   { 'user': 'barney' }
 * ];
 *
 * var getName = _.property('user');
 *
 * _.map(users, getName);
 * // => ['fred', barney']
 *
 * _.pluck(_.sortBy(users, getName), 'user');
 * // => ['barney', 'fred']
 */
function property(key) {
  key = String(key);
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseCallback;
