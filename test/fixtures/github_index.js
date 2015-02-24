var uid = require('matthewmueller/uid@0.0.2');
var fmt = require('yields/fmt@0.1.0');

var msg = fmt('Your unique ID is %s!', uid());
window.alert(msg);
