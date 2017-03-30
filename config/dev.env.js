var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MOCK_SERVER_PORT:'3009',
  PROXY_HOST:'http://smsp.geotmt.com',
  PROXY_PORT:'80'
})
