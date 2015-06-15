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
     *
     * @param {Object} options Data to use in templates
     * @param {String} options.lang Lang ID to render a localized template
     * @param {Object} options.bemjson
     * @param {Boolean} options.forceExec
     * @param {Boolean} options.forceLoad
     *
     * @param {Function} cb Callback to invoke with result or error
     *
     * @returns {Undefined}
     */
    function bh(name, options, cb) {
        var filePath;
        var bhModule;
        var html;
        var lang;

        if (typeof options.lang === 'string') {
            lang = options.lang;
        }

        // reject rendering for empty options.bemjson
        if (!options.bemjson) {
            cb(Error('No bemjson was passed'));
            return;
        }

        filePath = U.fulfillName({
            name: name,
            ext: opts.ext || this.ext,
            mask: opts.source,
            lang: lang
        });

        // drop cache
        if (opts.force || options.forceExec || options.forceLoad) {
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
