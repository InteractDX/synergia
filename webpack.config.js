var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BUILD_DIR = path.resolve(__dirname, 'src/public');
var APP_DIR = path.resolve(__dirname, 'src');
// var fileContent = require("raw-loader");

var config = {
  entry: './src/app.js',
  output: {
    //publicPath:'/src/public/bundle.js'
   filename: '/src/public/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      // { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      { test: /\.css$/, loader: "raw-loader" }
      // { test: /\.css$/, loader: "style-loader!css-loader" }
    ]    
  },
  resolve: {
    extensions: [ '.js', '.json', '.jsx', '.css', '.scss']
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};

module.exports = config;