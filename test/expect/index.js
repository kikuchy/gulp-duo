(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
'use strict';

var utils = require('./utils');

console.log("7823 + 740 = " + utils.sum(7823, 740));
console.log("GCD between 236023 and 923671 = " + utils.gcd(236023, 923671));

}, {"./utils":2}],
2: [function(require, module, exports) {
'use strict';

module.exports = {
    sum: function (a, b) {
        return a + b;
    },
    gcd: function gcd(a, b) {
        if (a === b || b === 0) return a;
        if (a === 0) return b;
        if (a < b) {
            var tmp = a;
            a = b;
            b = tmp;
        }
        var r = a % b;
        return gcd(b, r);
    }
};

}, {}]}, {}, {"1":""})
