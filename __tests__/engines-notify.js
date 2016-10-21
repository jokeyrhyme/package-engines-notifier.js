/* @flow */
'use strict'

const enginesNotify = require('../index.js').enginesNotify

const oldProcessVersion = process.version
afterEach(() => {
  process.version = oldProcessVersion
})

// mock console.error
let oldConsoleError = console.error
afterEach(() => {
  console.error = oldConsoleError
})

const pkg = {
  name: 'my-package',
  engines: {
    node: '>=4'
  }
}

test('{ node: ">=4" vs "v0.12.0" }', () => {
  process.version = 'v0.12.0'
  console.error = jest.fn()
  const enginesError = enginesNotify({ pkg })
  expect(console.error).toHaveBeenCalledTimes(1)
  expect(enginesError).toBeInstanceOf(Error)
})

test('{ node: ">=4" vs "v6.9.0" }', () => {
  process.version = 'v6.9.0'
  console.error = jest.fn()
  const enginesError = enginesNotify({ pkg })
  expect(console.error).not.toBeCalled()
  expect(enginesError).toBe(null)
})
