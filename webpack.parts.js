const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const GitRevisionWebpackPlugin = require('git-revision-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
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
    filename: '[name].css'
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

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })]
})
