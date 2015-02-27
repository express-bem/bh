var BH = require('../../../../../node_modules/bh/lib/bh.js');
var bh = new BH();

bh.match('page', function (ctx) {
    ctx
        .tag('example')
        .attr('name', 'value')
        .error()
        .content(ctx.json().data.name);
});

module.exports = bh;
