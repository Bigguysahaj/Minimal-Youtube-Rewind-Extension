const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    content: './src/content.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/popup.html',
      inject: false
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve('manifest.json'),
        to: path.resolve('dist')
      },
      {
        from: path.resolve('images'),
        to: path.resolve('dist/images')
      },
      {
        from: path.resolve('src/background.js'),
        to: path.resolve('dist')
      }
    ]
    })
  ],
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map',
};