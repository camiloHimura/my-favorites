/* eslint-disable @typescript-eslint/no-var-requires */
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: ['./app/index.tsx'],
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
        test: /\.[jt]sx?$/,
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      manifestUrl: './manifest.json',
      template: 'app/index.html',
    }),
  ],
};
