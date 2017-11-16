const path = require('path');
const webpack = require('webpack');

const config = {
  entry: ['./index.js'],
  output: {
    path: path.join(__dirname, 'build/'),
    filename: 'index.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015','react']
        }
      },
      {
          test: /\.json$/,
          loader: 'json-loader'
      }
    ]
  }
};

module.exports = config;
