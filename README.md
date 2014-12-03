# express-bem-bh

[![Build Status](https://travis-ci.org/zxqfox/express-bem-bh.svg)](https://travis-ci.org/zxqfox/express-bem-bh) [![Dependency Status](https://david-dm.org/zxqfox/express-bem-bh.png)](https://david-dm.org/zxqfox/express-bem-bh)

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
var Express = require('express');
var ExpressBem = require('express-bem');

var app = Express();
var bem = ExpressBem({root: './path-to/bem-project'}).bindTo(app);

// simple
bem.usePlugin('express-bem-bh');
```

## License

MIT [License][]

[License]: https://github.com/zxqfox/express-bem/blob/master/LICENSE
