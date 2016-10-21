# package-engines-notifier [![npm](https://img.shields.io/npm/v/package-engines-notifier.svg?maxAge=2592000)](https://www.npmjs.com/package/package-engines-notifier)

warns users about incompatible Node.js versions per engines in package.json


## Usage


### `enginesNotify(options: EnginesNotifierOptions) => boolean`


```flowtype
type EnginesNotifierOptions = {
  pkg: PackageJson
}
```

-   see upstream documentation for [PackageJson](https://docs.npmjs.com/files/package.json)

-   returns `true` if there is engine trouble


### Example

```js
const { enginesNotify } = require('package-engines-notifier')

const pkg = require('./package.json')

if (enginesNotify({ pkg })) {
  // uh-oh, the user's engines don't match, stop right here
  return
}

// TODO: what your script does when engines match
```


## Contributing


### Development

```sh
npm install --global flow-typed
npm install
flow-typed install
npm test
```


## See Also

-   [boxen-notify](https://github.com/jokeyrhyme/boxen-notify.js)

-   [update-notifier](https://github.com/yeoman/update-notifier)

-   [engine-check](https://www.npmjs.com/package/engine-check)

-   [check-engines](https://github.com/kruppel/check-engines)
