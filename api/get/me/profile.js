"use strict"

const { verifyToken } = require('@stormgle/jtoken-util')

const htmlTemplate = require('../../../lib/html')

const secret = process.env.AUTH_KEY_SGLEARN;

// function authen() {
//   return verifyToken(secret);
// }

function final() {
  return function(req, res) {
    const title = process.env.PAGE_TITLE || 'Page Title';
    const style = process.env.PAGE_STYLE || 'style/style.css'
    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( htmlTemplate( {title, script: process.env.PROFILE_PAGE_SCRIPT, style, reactDom: ''} ) )
  }
}

module.exports = [final]