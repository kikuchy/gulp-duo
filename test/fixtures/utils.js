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
