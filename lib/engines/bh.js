var U = require('express-bem/lib/util');
var dropRequireCache = require('enb/lib/fs/drop-require-cache'); // can it be moved out?

module.exports = bhEngine;

/**
 * bh.js express view engine adapter
 * @api
 * @returns {function(string, Object, Function)}
 */
function bhEngine(name, options, cb) {
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

    var bh;
    try {
        bh = require(name);
    } catch (e) {
        cb(e);
        return;
    }

    if (!bh || !bh.apply) {
        cb(new Error('Unknown file format'));
        return;
    }

    // Renders bemjson to html via bh
    cb(null, bh.apply(options.bemjson));
}

bhEngine.extension = '.bh.js';
