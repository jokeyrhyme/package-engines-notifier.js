/* @flow */
'use strict'

const semver = require('semver')

/* ::
type EnginesErrorData = {
  current: string,
  engine: string,
  required: string
}

type EnginesNotifierOptions = {
  pkg: {
    [id:string]: any,
    engines: { [id:string]: string }
  }
}
*/

class EnginesError extends Error {
  /* :: data : EnginesErrorData */
  constructor (data /* : EnginesErrorData */) {
    super('package.json engines mismatch')
    this.data = data
  }
}

function enginesError (
  options /* : EnginesNotifierOptions */
) /* : EnginesError | null */ {
  if (!options || !options.pkg || !options.pkg.engines) {
    return null
  }
  if (options.pkg.engines.node) {
    if (!semver.satisfies(process.version, options.pkg.engines.node)) {
      const err = new EnginesError({
        current: process.version,
        engine: 'node',
        required: options.pkg.engines.node
      })
      return err
    }
  }
  return null
}

function enginesNotify (
  options /* : EnginesNotifierOptions */
) /* : boolean */ {
  return false
}

module.exports = {
  enginesError,
  enginesNotify
}
