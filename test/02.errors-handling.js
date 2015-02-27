var ASSERT = require('assert');
var EXPRESS = require('express');
var EXPRESSBEM = require('express-bem');
var EXPRESSBH = require('../lib');

var bemOpts = {
    root: './test/data/views',
    path: 'pages'
};
var bemjson = {
    block: 'page',
    title: 'Example',
    content: 'Hey ho let\'s go!'
};

describe('errors-handling', function () {

    it('should return an error if bemjson wasn\'t passed', function (done) {
        var app = EXPRESS();
        var bem = EXPRESSBEM(bemOpts).bindTo(app);
        bem.usePlugin(EXPRESSBH);

        app.render('custom', {}, function (err) {
            ASSERT.notEqual(err, null);
            done();
        });
    });

    it('should return an error if it happens on the bh.apply() step', function (done) {
        var app = EXPRESS();
        var bem = EXPRESSBEM(bemOpts).bindTo(app);
        bem.usePlugin(EXPRESSBH);

        app.render('error-template', {bemjson: bemjson}, function (err) {
            ASSERT.notEqual(err, null);
            done();
        });
    });

});
