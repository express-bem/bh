var assert = require('assert');
var path = require('path');
var fs = require('fs');

var expressBhEngine = require('../lib/engines/bh');
var bundlePath = path.join(__dirname, 'data/views/pages/lang-option');

describe('lang-option', function () {

    it('should render localized template file', function (done) {
        var engine = expressBhEngine({
            source: '?.{lang}.bh.js',
            ext: 'bh.js'
        });

        engine(bundlePath, {bemjson: getBemjson(), lang: 'ru'}, function (err, html) {
            assert.equal(html, '<div class="page">Example</div>');

            done();
        });
    });

});

var getBemjson = function () {
    return {
        block: 'page',
        title: 'Example'
    };
};
