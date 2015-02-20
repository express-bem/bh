var bh = module.exports = require('./custom.bh.js');

bh.match('page', function (ctx) {
    ctx.content([
        'minified! ',
        ctx.content()
    ], true);
});
