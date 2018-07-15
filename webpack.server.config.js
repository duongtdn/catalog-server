"use strict"

const path = require("path");
const fs = require("fs");

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    api: ['./api/main.js']
  },
  target: 'node',
  resolve: {
    symlinks: false
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /(\.js?$)|(\.jsx?$)/,
        use: 'babel-loader',
        // exclude: /node_modules/
      }
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "api.js",
    library: '',
    libraryTarget: "commonjs2"
  }
}