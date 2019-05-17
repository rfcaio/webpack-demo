
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
