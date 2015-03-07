var assert = require('assert');
var path = require('path');
var expressBhEngine = require('../lib/engines/bh');
var fs = require('fs');

var bemjson = {
    block: 'page',
    title: 'Example'
};
var bundlePath = path.join(__dirname, 'data/views/pages/cache');
var filePath = path.join(bundlePath, 'cache.bh.js');
var templateContent = [
'var BH = require(\'../../../../../node_modules/bh/lib/bh.js\');',
'var bh = new BH();',
'bh.match(\'page\', function (ctx) {',
'    ctx.content(ctx.json().title);',
'});',
'module.exports = bh;'
].join('\n');

describe('cache', function () {

    beforeEach(function () {
        fs.appendFileSync(filePath, templateContent);
    });

    afterEach(function () {
        fs.truncateSync(filePath, 0);
    });

    it('should use a template from cache', function (done) {
        var engine = expressBhEngine({
            source: '?.bh.js',
            ext: 'bh.js'
        });

        engine(bundlePath, {bemjson: bemjson}, function (err, html) {
            var cachedHtml = html;

            assert.ifError(err);

            fs.truncateSync(filePath, 0);

            engine(bundlePath, {bemjson: bemjson}, function (err, html) {
                assert.equal(cachedHtml, html);

                done();
            });

        });
    });

    it('should not use cache if option `force` was passed', function (done) {
        var engine = expressBhEngine({
            force: true,
            source: '?.bh.js',
            ext: 'bh.js'
        });

        engine(bundlePath, {bemjson: bemjson}, function (err, html) {
            var cachedHtml = html;

            assert.ifError(err);

            fs.truncateSync(filePath, 0);

            engine(bundlePath, {bemjson: bemjson}, function (err, html) {
                assert.notEqual(cachedHtml, html);

                done();
            });

        });
    });

});
