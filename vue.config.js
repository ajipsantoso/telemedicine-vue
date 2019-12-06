module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  // configureWebpack: {
  //   publicPath: process.env.NODE_ENV === 'production'
  //   ? '/'
  //   : '/',
  //   module: {
  //     rules: [
  //       // process.env.NODE_ENV === 'production' ? { test: /\.js$/, use: 'babel-loader' } : {},
  //       {
  //         test: /\.js$/,
  //         // loader: 'ify-loader',
  //         use: [
  //           // 'babel-loader',
  //           'ify-loader',
  //           // 'transform-loader?plotly.js/tasks/compress_attributes.js',
  //         ],
  //       },
  //     ]
  //   }
  // }
}