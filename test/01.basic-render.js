var ASSERT = require('assert');
var EXPRESS = require('express');
var EXPRESSBEM = require('express-bem');
var EXPRESSBH = require('..');

describe('basic renders', function () {
    var bemOpts = {
        root: 'test/data/views',
        path: 'pages'
    };
    var content = 'Hey ho let\'s go!';
    var bemjson;

    beforeEach(function () {
        bemjson = {
            block: 'page',
            title: 'Example',
            content: content
        };
    });

    it('should generate html page with bh.js engine', function (done) {
        var app = EXPRESS();
        var bem = EXPRESSBEM(bemOpts).bindTo(app);
        bem.usePlugin(EXPRESSBH);

        app.render('custom', {bemjson: bemjson}, function (err, html) {
            ASSERT.ifError(err);
            ASSERT.notEqual(html.indexOf('<!DOCTYPE'), -1);
            ASSERT.notEqual(html.indexOf(content), -1);
            done();
        });
    });

    it('should generate html page with source _?.bh.js', function (done) {
        var app = EXPRESS();
        var bem = EXPRESSBEM(bemOpts).bindTo(app);
        bem.usePlugin(EXPRESSBH, {source: '_?.bh.js'});

        app.render('custom', {bemjson: bemjson}, function (err, html) {
            ASSERT.ifError(err);
            ASSERT.notEqual(html.indexOf('<!DOCTYPE'), -1);
            ASSERT.notEqual(html.indexOf(content), -1);
            ASSERT.notEqual(html.indexOf('minified!'), -1);
            done();
        });
    });

    it('should pass data to templates', function (done) {
        var app = EXPRESS();
        var bem = EXPRESSBEM(bemOpts).bindTo(app);
        bem.usePlugin(EXPRESSBH, {dataKey: 'data'});

        app.render('use-data', {bemjson: bemjson, foo: 'bar'}, function (err, html) {
            ASSERT.notEqual(html.indexOf('bar'), -1);
            done();
        });
    });

});
