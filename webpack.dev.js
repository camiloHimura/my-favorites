/* eslint-disable */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
let webpack = require('webpack');

require('dotenv').config({ path: '.env.dev' });

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss|css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: true,
    port: process.env.PORT || 8080,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
});
