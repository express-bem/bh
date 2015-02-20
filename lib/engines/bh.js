var U = require('express-bem/lib/util');
var dropRequireCache = require('enb/lib/fs/drop-require-cache'); // can it be moved out?

module.exports = function (opts) {
    bh.extension = '.bh.js';
    return bh;

    /**
     * bh.js express view engine adapter
     * @api
     * @returns {function(string, Object, Function)}
     */
    function bh(name, options, cb) {
        // reject rendering for empty options.bemjson
        if (!options.bemjson) {
            cb(Error('Empty request'));
            return;
        }

        name = U.fulfillName(name, opts.ext || this.ext, opts.source);

        // pass to render
        if (opts.force || options.forceExec || options.forceLoad) {
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
};
