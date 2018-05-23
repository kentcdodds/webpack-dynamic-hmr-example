const path = require('path')
const webpack = require('webpack')

const here = p => path.join(__dirname, p)

module.exports = (env = process.env.NODE_ENV || 'development') => {
  const prod = env === 'production'
  const serve = JSON.parse(process.env.WEBPACK_SERVE || 'false')
  return removeEmpty({
    context: here('src'),
    entry: './index.js',
    output: {
      path: here('dist'),
      pathinfo: true,
      filename: 'bundle.js',
      publicPath: '/'
    },
    mode: prod ? 'production' : 'development',
    devtool: prod ? 'source-map' : 'cheap-module-source-map',
    plugins: removeEmpty([
      prod ? null : new webpack.HotModuleReplacementPlugin()
    ]),
    serve: serve
      ? {
          content: here('./public'),
          clipboard: false,
          // logLevel: 'warn', // defaults to 'info' and it's noisy
          hot: {
            hot: true
            // logLevel: 'warn', // defaults to 'info' and it's noisy
            // reload: true,
          }
        }
      : null
  })
}

function removeEmpty(input) {
  if (Array.isArray(input)) {
    return input.filter(item => item != null)
  } else {
    return Object.entries(input).reduce((a, [k, v]) => {
      if (v != null) {
        a[k] = v
      }
      return a
    }, {})
  }
}
