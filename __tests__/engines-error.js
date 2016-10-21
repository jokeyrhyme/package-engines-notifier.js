/* @flow */
'use strict'

var chalk = require('chalk')

var enginesError = require('../index.js').enginesError

var oldProcessVersion = process.version
afterEach(function () {
  process.version = oldProcessVersion
})

var pkg = {
  name: 'my-package',
  engines: {
    node: '>=4'
  }
}

test('{ node: ">=4" vs "v0.12.0" }', function () {
  process.version = 'v0.12.0'
  var err = enginesError({ pkg: pkg })
  expect(err).toBeInstanceOf(Error)
  expect(err && err.data.engine).toBe('node')
  expect(err && err.data.current).toBe('v0.12.0')
  expect(err && err.data.required).toBe('>=4')
  expect(err && chalk.stripColor(err.toString())).toMatchSnapshot()
})

test('{ node: ">=4" vs "v6.9.0" }', function () {
  process.version = 'v6.9.0'
  var err = enginesError({ pkg: pkg })
  expect(err).toBeNull()
})
