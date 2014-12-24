var U = require('express-bem/lib/util');
var dropRequireCache = require('enb/lib/fs/drop-require-cache'); // can it be moved out?

module.exports = bh;
module.exports.extension = '.bh.js';

/**
 * bh.js express view engine adapter
 * @api
 * @returns {function(string, Object, Function)}
 */
function bh(name, options, cb) {
    // reject rendering for empty options.bemjson
    if (!options.bemjson) {
        cb(new Error('Empty request'));
        return;
    }

    name = U.fulfillName(name, this.ext);

    // pass to render
    if (options.forceExec || options.forceLoad) {
        dropRequireCache(require, name);
    }

    var bhModule;
    try {
        bhModule = require(name);
    } catch (e) {
        cb(e);
        return;
    }

    if (!bhModule || !bhModule.apply) {
        cb(new Error('Unknown file format'));
        return;
    }

    // Renders bemjson to html via bh
    cb(null, bhModule.apply(options.bemjson));
}
