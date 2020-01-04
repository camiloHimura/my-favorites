var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = env => {
  return {
    entry: ['babel-polyfill', './app/index.js'],
    output: {
      publicPath: '/',
      filename: 'index_bundle.js',
      path: path.resolve(__dirname , 'build'),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, 
          use:'babel-loader'
        },
        
        {
          test: /\.css$/, 
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              /* options: {
                modules: true
              } */
            },
          ]
        },
        
        {test: /\.(png|jpg|jpeg|gif|svg)$/,
          loader: "url-loader",
          options: {
            limit: 10000
          }
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
    },
    mode: env.mode,
    plugins: [
      new HtmlWebpackPlugin ({
        template: 'app/index.html'
      })
    ]
  }

}
