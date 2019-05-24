const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')

const parts = require('./webpack.parts')

const PATHS = {
  app: path.join(__dirname, 'src')
}

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo'
      })
    ]
  }
])

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.loadCss()
])

const productionConfig = merge([
  parts.extractCss({ use: ['css-loader', parts.autoprefix()] }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  })
])

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }
  return merge(commonConfig, developmentConfig, { mode })
}
