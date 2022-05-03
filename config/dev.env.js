'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: '"http://8.135.100.109:8401/"',
  // API_KEY: '"http://127.0.0.1:8401/"',
})
