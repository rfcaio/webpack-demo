const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

let devServer = {
  host: process.env.HOST,
  open: true,
  overlay: true,
  port: process.env.PORT,
  stats: 'errors-only'
}

let plugins = [
  new HtmlWebpackPlugin({
    title: 'Webpack demo'
  })
]

// https://survivejs.com/webpack/developing/webpack-dev-server/#polling-instead-of-watching-files
if (process.env.MODE === 'poll') {
  const watchIgnorePlugin = new webpack.WatchIgnorePlugin([
    path.join(__dirname, 'node_modules')
  ])

  const watchOptions = {
    aggregateTimeout: 5000,
    poll: 1000
  }

  devServer = Object.assign({}, devServer, { watchOptions })
  plugins = [...plugins, watchIgnorePlugin]
}

module.exports = {
  devServer,
  plugins
}
