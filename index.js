/* @flow */
'use strict'

var util = require('util')

/* ::
type EnginesErrorData = {
  current: string,
  engine: string,
  name: string,
  required: string
}

type EnginesNotifierOptions = {
  pkg: {
    [id:string]: any,
    engines: { [id:string]: string }
  }
}

declare class EnginesError extends Error {
  data: EnginesErrorData
}
*/

function EnginesError (data /* : EnginesErrorData */) {
  // $FlowFixMe: ES5-style super() for compatibility with 0.12
  Error.call(this, 'package.json engines mismatch')
  this.data = data
}

util.inherits(EnginesError, Error)

EnginesError.prototype.toString = function () {
  var chalk = require('chalk')

  return [
    chalk.blue(this.data.name),
    chalk.reset('requires'),
    chalk.blue(this.data.engine),
    chalk.green(this.data.required),
    chalk.reset('\ncurrent'),
    chalk.blue(this.data.engine),
    chalk.reset('version is'),
    chalk.red(this.data.current)
  ].join(' ')
}

function enginesError (
  options /* : EnginesNotifierOptions */
) /* : EnginesError | null */ {
  if (!options || !options.pkg || !options.pkg.engines) {
    return null
  }
  if (options.pkg.engines.node) {
    var semver = require('semver')

    if (!semver.satisfies(process.version, options.pkg.engines.node)) {
      var err = new EnginesError({
        current: process.version,
        engine: 'node',
        name: options.pkg.name,
        required: options.pkg.engines.node
      })
      return err
    }
  }
  return null
}

function enginesNotify (
  options /* : EnginesNotifierOptions */
) /* : EnginesError | null */ {
  var err = enginesError(options)

  if (err) {
    var message = err.toString()

    if (!process.stderr.isTTY || require('is-npm')) {
      // boxen-notify won't output, so do so explicitly here
      /* eslint-disable no-console */ // just this once
      console.error('\n' + message + '\n')
      /* eslint-enable no-console */
    } else {
      var notify = require('boxen-notify').notify
      notify({ message: message })
    }
  }

  return err
}

module.exports = {
  enginesError: enginesError,
  enginesNotify: enginesNotify
}
