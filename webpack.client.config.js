"use strict"

const path = require("path");

module.exports = {
  entry: {
    client: ['./client/index.js']
  },
  module: {
    rules: [
      {
        test: /(\.js?$)|(\.jsx?$)/,
        use: 'babel-loader',    
      }
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  }
}