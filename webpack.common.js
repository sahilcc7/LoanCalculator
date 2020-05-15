const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});
module.exports = {
    entry: {
      app: ['./src/App.jsx'],
      vendor: ['react', 'react-dom']
  },
   plugins: [
     new CleanWebpackPlugin(),
     HtmlWebpackPluginConfig,
   ],
   module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: ['babel-loader'], // we use this to transpile es6 code on the web
          },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
      ]
    },

   resolve: {
       extensions: ['.js', '.jsx']
    },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };