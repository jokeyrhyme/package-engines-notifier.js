'use strict'

const clearRequire = require('clear-require')

const enginesNotify = require('../index.js').enginesNotify

// mock console.error
let oldConsoleError = console.error
afterEach(() => {
  console.error = oldConsoleError
})

// mock interactive terminal and non-`npm run`-environment
let processEnvBefore = JSON.stringify(process.env)
let isTTYBefore = process.stdout.isTTY
beforeEach(function () {
  ['is-npm'].forEach(clearRequire)
  ;['npm_config_username', 'npm_package_name', 'npm_config_heading'].forEach(function (name) {
    delete process.env[name]
  })
  process.stdout.isTTY = true
})
afterEach(function () {
  ['is-npm'].forEach(clearRequire)
  process.env = JSON.parse(processEnvBefore)
  process.stdout.isTTY = isTTYBefore
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
