const path = require('path');

module.exports = {
  entry: [
    './src/view/index.tsx',
  ],
  devtool: 'inline-source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.tsx$/,
        exclude: /(node_modules|bower_components)/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },
};
