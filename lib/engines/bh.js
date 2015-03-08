var U = require('express-bem/lib/util');
var dropRequireCache = require('enb/lib/fs/drop-require-cache');

module.exports = function (opts) {
    bh.extension = '.bh.js';

    return bh;

    /**
     * bh.js express view engine adapter
     * Produces html from bh-templates and data and invokes passed callback with result
     *
     * @param {String} name Bundle name
     * @param {Object} [options] Data to use in templates
     * @param {Function} cb Callback to invoke with result or error
     * @returns {Undefined}
     */
    function bh(name, options, cb) {
        var filePath;
        var html;
        var bhModule;

        // reject rendering for empty options.bemjson
        if (!options.bemjson) {
            cb(Error('No bemjson was passed'));
            return;
        }

        filePath = U.fulfillName(name, opts.ext || this.ext, opts.source);

        // drop cache
        if (opts.force) {
            dropRequireCache(require, filePath);
        }

        try {
            bhModule = require(filePath);
        } catch (e) {
            cb(e);
            return;
        }

        // add data to use in templates
        if (opts.dataKey) {
            options.bemjson[opts.dataKey] = bhModule.utils.extend({}, options);
            delete options.bemjson[opts.dataKey].bemjson;
        }

        try {
            html = bhModule.apply(options.bemjson);
        } catch (e) {
            cb(e);
            return;
        }

        cb(null, html);
    }
};
