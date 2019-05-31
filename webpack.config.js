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
  },
  parts.loadJavaScript({ include: PATHS.app })
])

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.generateSourceMaps({ type: 'inline-source-map' }),
  parts.loadCss(),
  parts.loadImages({})
])

const productionConfig = merge([
  parts.extractCss({ use: ['css-loader', parts.autoprefix()] }),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]'
    }
  }),
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
