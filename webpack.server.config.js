"use strict"

const path = require("path");

module.exports = {
  entry: {
    api: ['./api/main.js']
  },
  target: 'node',
  resolve: {
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /(\.js?$)|(\.jsx?$)/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "api.js"
  }
}