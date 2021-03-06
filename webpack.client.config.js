"use strict"

const path = require("path");

module.exports = {
  entry: {
    catalog: ['./client/catalog.js'],
    course: ['./client/course.js'],
    enrolled: ['./client/enrolled.js'],
    profile: ['./client/profile.js']
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
    path: path.resolve(__dirname, "dist/client"),
    filename: "[name].js",
  }
}