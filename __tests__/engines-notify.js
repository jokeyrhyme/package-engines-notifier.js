/* @flow */
'use strict'

var enginesNotify = require('../index.js').enginesNotify

var oldProcessVersion = process.version
afterEach(function () {
  process.version = oldProcessVersion
})

// mock console.error
var oldConsoleError = console.error
afterEach(function () {
  console.error = oldConsoleError
})

var pkg = {
  name: 'my-package',
  engines: {
    node: '>=4'
  }
}

test('{ node: ">=4" vs "v0.12.0" }', function () {
  process.version = 'v0.12.0'
  console.error = jest.fn()
  var enginesError = enginesNotify({ pkg: pkg })
  expect(console.error).toHaveBeenCalledTimes(1)
  expect(enginesError).toBeInstanceOf(Error)
})

test('{ node: ">=4" vs "v6.9.0" }', function () {
  process.version = 'v6.9.0'
  console.error = jest.fn()
  var enginesError = enginesNotify({ pkg: pkg })
  expect(console.error).not.toBeCalled()
  expect(enginesError).toBe(null)
})
