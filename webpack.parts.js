const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const cssnano = require('cssnano')
const GitRevisionWebpackPlugin = require('git-revision-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionWebpackPlugin().version()
    })
  ]
})

exports.autoprefix = () => {
  return {
    loader: 'postcss-loader',
    options: {
      plugins: () => [require('autoprefixer')()]
    }
  }
}

exports.clean = path => ({
  plugins: [new CleanWebpackPlugin()]
})

exports.devServer = ({ host, port }) => {
  return {
    devServer: {
      host,
      open: true,
      overlay: true,
      port,
      stats: 'errors-only'
    }
  }
}

exports.extractCss = ({ exclude, include, use = [] }) => {
  const plugin = new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css'
  })

  return {
    module: {
      rules: [
        {
          exclude,
          include,
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader].concat(use)
        }
      ]
    },
    plugins: [plugin]
  }
}

exports.generateSourceMaps = ({ type }) => {
  return {
    devtool: type
  }
}

exports.loadCss = ({ exclude, include } = {}) => {
  return {
    module: {
      rules: [
        {
          exclude,
          include,
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
}

exports.loadImages = ({ exclude, include, options }) => {
  return {
    module: {
      rules: [
        {
          exclude,
          include,
          test: /\.(jpg|png)$/,
          use: [
            {
              loader: 'url-loader',
              options
            }
          ]
        }
      ]
    }
  }
}

exports.loadJavaScript = ({ exclude, include }) => {
  return {
    module: {
      rules: [
        {
          exclude,
          include,
          test: /\.js$/,
          use: ['babel-loader']
        }
      ]
    }
  }
}

exports.minifyCSS = ({ options }) => {
  return {
    plugins: [
      new OptimizeCSSAssetsWebpackPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: options,
        canPrint: false
      })
    ]
  }
}

exports.minifyJavaScript = () => {
  return {
    optimization: {
      minimizer: [new TerserWebpackPlugin({ sourceMap: true })]
    }
  }
}

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })]
})

exports.setFreeVariable = (key, value) => {
  const env = {}
  env[key] = JSON.stringify(value)
  return {
    plugins: [new webpack.DefinePlugin(env)]
  }
}
