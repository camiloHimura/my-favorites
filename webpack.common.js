/* eslint-disable @typescript-eslint/no-var-requires */
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './app/index.tsx'],
  output: {
    publicPath: '/',
    filename: 'index_bundle.js',
    path: path.resolve(__dirname, 'public'),
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  resolve: {
    // We need to add .tsx and .ts as file extensions to be resolved
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      manifestUrl: './manifest.json',
      template: 'app/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
};
