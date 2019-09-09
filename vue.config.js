module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/telemedicine',
  configureWebpack: {
    module: {
      rules: [
        // process.env.NODE_ENV === 'production' ? { test: /\.js$/, use: 'babel-loader' } : {},
        {
          test: /\.js$/,
          // loader: 'ify-loader',
          use: [
            'ify-loader',
            'transform-loader?plotly.js/tasks/compress_attributes.js',
          ],
          // exclude: [resolve('src')],
        },
      ]
    }
  }
}