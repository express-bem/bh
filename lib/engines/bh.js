var U = require('express-bem/lib/util');
var dropRequireCache = require('enb/lib/fs/drop-require-cache'); // can it be moved out?

module.exports = function (opts) {
    bh.extension = '.bh.js';
    return bh;

    /**
     * bh.js express view engine adapter
     * Produces html from bh-templates and data and invokes passed callback with result
     *
     * @param   {String}     name       bundle name
     * @param   {Object}     [options]  data to use in templates
     * @param   {Function}   cb         callback to invoke with result or error
     * @returns {Undefined}             undefined value
     */
    function bh(name, options, cb) {
        var filePath;
        var bhModule;
        var html;

        // reject rendering for empty options.bemjson
        if (!options.bemjson) {
            cb(Error('No bemjson was passed'));
            return;
        }

        filePath = U.fulfillName(name, opts.ext || this.ext, opts.source);

        // check cache options
        if (opts.force || options.forceExec || options.forceLoad) {
            dropRequireCache(require, name);
        }

        try {
            bhModule = require(filePath);
        } catch (e) {
            cb(e);
            return;
        }

        // add data to use in templates
        options.bemjson.data = bhModule.utils.extend({}, options);
        delete options.bemjson.data.bemjson;

        try {
            html = bhModule.apply(options.bemjson);
        } catch (e) {
            cb(e);
            return;
        }

        cb(null, html);
    }
};
