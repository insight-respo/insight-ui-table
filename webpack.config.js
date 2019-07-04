const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

if (
  process.env.NODE_ENV !== 'development' &&
  process.env.NODE_ENV !== 'production'
) {
  throw new Error('未知的 process.env.NODE_ENV ->', process.env.NODE_ENV);
}

const plugins = [
  new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  );
}

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: path.resolve(__dirname, './src/index.jsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    host: '0.0.0.0',
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          }
        ],
      },
    ],
  },
  plugins,
}