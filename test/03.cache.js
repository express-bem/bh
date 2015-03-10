var assert = require('assert');
var path = require('path');
var fs = require('fs');

var expressBhEngine = require('../lib/engines/bh');

var getBemjson = function () {
    return {
        block: 'page',
        title: 'Example'
    };
};
var BH = [
    '(function(){',
        'var bhModule = {exports:{}};',
        '(function(module, exports, require){',
            fs.readFileSync('./node_modules/bh/lib/bh.js'),
        '}(bhModule, bhModule.exports));',
        'return bhModule.exports;',
    '}())'
].join('');
var bundlePath = path.join(__dirname, 'data/views/pages/cache');
var filePath = path.join(bundlePath, 'cache.bh.js');
var emptyTemplate = [
    'var BH = ' + BH + ';',
    'var bh = module.exports = new BH();'
].join('\n');
var templateContent = [
    emptyTemplate,
    'bh.match(\'page\', function (ctx) {',
    '    ctx.content(ctx.json().title);',
    '});'
].join('\n');

describe('cache', function () {

    beforeEach(function () {
        fs.truncateSync(filePath, 0);
        fs.appendFileSync(filePath, templateContent);
    });

    after(function () {
        fs.truncateSync(filePath, 0);
    });

    it('should use a template from cache', function (done) {
        var engine = expressBhEngine({
            source: '?.bh.js',
            ext: 'bh.js'
        });

        engine(bundlePath, {bemjson: getBemjson()}, function (err, html) {
            var cachedHtml = html;

            assert.ifError(err);

            fs.truncateSync(filePath, 0);

            engine(bundlePath, {bemjson: getBemjson()}, function (err, html) {
                assert.ifError(err);

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

        engine(bundlePath, {bemjson: getBemjson()}, function (err, cachedHtml) {
            assert.ifError(err);

            fs.truncateSync(filePath, 0);
            fs.appendFileSync(filePath, emptyTemplate);

            engine(bundlePath, {bemjson: getBemjson()}, function (err, html) {
                assert.ifError(err);

                assert.notEqual(html, cachedHtml);

                done();
            });

        });
    });

});
