const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const optimization = {
  splitChunks: {
    automaticNameDelimiter: '~',
    cacheGroups: {
      node_vendors: {
        test: /[\\/]node_modules[\\/]/,
        filename: './js/vendors.js',
        name: 'vendors',
        chunks: 'all',
        priority: 1,
      },
    }
  },
};

module.exports = {
  entry: {
    app: './src/js/main.js',
  },
  output: {
    path: path.join(__dirname + '/build'),
    filename: './js/script.js',
  },
  optimization: optimization,
  devServer: {
    compress: true,
    port: 8000,
    open: 'Chrome',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/main.html',
      publicPath: './build',
      filename: 'index.html',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
  ],
};