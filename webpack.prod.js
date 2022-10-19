const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');
const { merge } = require('webpack-merge');

module.exports = merge(config,{
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'main-[contenthash].js',
    assetModuleFilename: 'img/[name].[hash][ext]',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main-[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index-[contenthash].html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(.png|jpe?g|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
});