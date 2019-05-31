const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')

exports.autoprefix = () => {
  return {
    loader: 'postcss-loader',
    options: {
      plugins: () => [require('autoprefixer')()]
    }
  }
}

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
