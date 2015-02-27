var BH = require('../../../../../node_modules/bh/lib/bh.js');
var bh = new BH();

bh.match('page', function (ctx) {
    ctx.content(ctx.json().data.foo, true);
});

module.exports = bh;
