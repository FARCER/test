const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development', entry: './src/index.js', output: {
    path: path.resolve(__dirname, 'dist'), filename: 'bundle.js',
  }, devServer: {
    static: path.join(__dirname, 'src'), hot: true, open: true

  }, target: 'web', devtool: 'eval-source-map', module: {
    rules: [{
      test: /\.m?js$/, exclude: /(node_modules|bower_components)/, use: {
        loader: 'babel-loader', options: {
          presets: ['@babel/preset-env']
        }
      }
    },  {test: /\.(html)$/, use: ['html-loader']}, {
      test: /\.css$/i, use: ['style-loader', 'css-loader'],
    },]
  }, plugins: [new HtmlWebpackPlugin({
    title: '123', template: './src/index.html'
  })],
};
