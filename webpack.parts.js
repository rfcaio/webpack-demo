const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
