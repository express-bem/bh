# express-bem-bh

[![Build Status](https://travis-ci.org/express-bem/bh.svg)](https://travis-ci.org/express-bem/bh) [![Dependency Status](https://david-dm.org/express-bem/bh.png)](https://david-dm.org/express-bem/bh)

[bh.js][] engine (plugin) for [express-bem][]

[bh.js]: https://github.com/bem/bh
[express-bem]: https://github.com/zxqfox/express-bem

## Why

To use `.bh.js` techs to render pages.

## Installation

```sh
$ npm i express-bem-bh --save
```

## Usage

```js
var express = require('express');
var expressBem = require('express-bem')(/*params*/); // see the `express-bem` documentation to learn more about params

var app = express();

expressBem.bindTo(app);
expressBem.usePlugin('express-bem-bh', {
    force: true, // drops the template requiring cache for every request, it makes reason to use in development environment
    source: '_?.bh.js', // the enb-style wildcard to specify a template name (for example, it will render _index.bh.js for the index page)
    dataKey: 'data' // name of the field that will contain data into templates, see how to use below
});

app.get('/', function (req, res) {
    res.locals.bemjson = {block: 'test'};

    // any data to use into templates
    // it will be available in templates as `ctx.json().data.message`
    res.locals.message = 'Use bh with your Express application';

    res.render('pageName');
});

app.listen(3000);
```

## License

MIT [License][]

[License]: https://github.com/express-bem/bh/blob/master/LICENSE
