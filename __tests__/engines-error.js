/* @flow */
'use strict'

const chalk = require('chalk')

const enginesError = require('../index.js').enginesError

const oldProcessVersion = process.version
afterEach(() => {
  process.version = oldProcessVersion
})

const pkg = {
  name: 'my-package',
  engines: {
    node: '>=4'
  }
}

test('{ node: ">=4" vs "v0.12.0" }', () => {
  process.version = 'v0.12.0'
  const err = enginesError({ pkg })
  expect(err).toBeInstanceOf(Error)
  expect(err && err.data.engine).toBe('node')
  expect(err && err.data.current).toBe('v0.12.0')
  expect(err && err.data.required).toBe('>=4')
  expect(err && chalk.stripColor(err.toString())).toMatchSnapshot()
})

test('{ node: ">=4" vs "v6.9.0" }', () => {
  process.version = 'v6.9.0'
  const err = enginesError({ pkg })
  expect(err).toBeNull()
})
