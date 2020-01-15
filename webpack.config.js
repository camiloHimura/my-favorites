var path = require('path');
var webpack =  require('webpack');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

const ENV = process.env.NODE_ENV || 'develop';
if(ENV === 'develop'){
  require('dotenv').config({ path: '.env.dev' })
}

module.exports = env => {
  const isPRoduction = env.mode === 'production';
  return {
    entry: ['babel-polyfill', './app/index.js'],
    output: {
      publicPath: '/',
      filename: 'index_bundle.js',
      path: path.resolve(__dirname , 'public'),
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
    devtool: isPRoduction ? 'source-map': 'cheap-module-eval-source-map',
    plugins: [
      new HtmlWebpackPlugin ({
        template: 'app/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
      })
    ]
  }

}
