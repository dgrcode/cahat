"use strict";

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin(
  { filename: '[name].css' });

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'client', 'index.client.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: path.join(__dirname, 'src'),
      exclude: /\.sass$/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: 'babel_cache',
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    }, {
      test: /\.sass$/,
      use: extractSass.extract({
        use: ['css-loader', 'sass-loader']
      })
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    extractSass,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};
