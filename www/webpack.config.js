const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    './view/js-src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + "/view/js-dist",
  },
  watch: true,
  module: {
    rules: [
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: { 
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        } 
      }
    ]
  }
};