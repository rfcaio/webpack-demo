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
  parts.loadJavaScript({ include: PATHS.app }),
  parts.setFreeVariable('MESSAGE', 'Don\'t make me laugh.')
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
  {
    output: {
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].[chunkhash].js'
    }
  },
  parts.attachRevision(),
  parts.clean(),
  parts.extractCss({ use: ['css-loader', parts.autoprefix()] }),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[hash].[ext]'
    }
  }),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      safe: true
    }
  }),
  parts.minifyJavaScript(),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  }),
  {
    optimization: {
      runtimeChunk: {
        name: 'manifest'
      },
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/
          }
        }
      }
    },
    performance: {
      hints: 'warning',
      maxAssetSize: 460800,
      maxEntrypointSize: 51200
    }
  }
])

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }
  return merge(commonConfig, developmentConfig, { mode })
}
