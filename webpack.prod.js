/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
let webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss|css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'app/manifest/icons', to: 'icons/' }, 'app/manifest/manifest.json'],
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, './serviceWorker/serviceWorkerWorkbox.js'),
      swDest: 'service-worker.js',
    }),
  ],
});
