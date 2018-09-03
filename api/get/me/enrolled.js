"use strict"

const htmlTemplate = require('../../../lib/html')

function authen(db) {
  return function(req, res, next) {
    
    next()
  }
}

function final() {
  return function(req, res) {
    const title = process.env.PAGE_TITLE || 'Page Title';
    const style = process.env.PAGE_STYLE || 'style/style.css'
    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( htmlTemplate( {title, script: 'script/bundle.js', style} ) )
  }
}

module.exports = [authen, final]