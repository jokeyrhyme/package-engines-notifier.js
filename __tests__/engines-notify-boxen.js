'use strict'

var clearRequire = require('clear-require')

var enginesNotify = require('../index.js').enginesNotify

// mock console.error
var oldConsoleError = console.error
afterEach(function () {
  console.error = oldConsoleError
})

// mock interactive terminal and non-`npm run`-environment
var processEnvBefore = JSON.stringify(process.env)
var isTTYBefore = process.stdout.isTTY
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
