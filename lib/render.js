"use strict"

const React = require('react')
const { renderToString  } = require('react-dom/server')

const htmlTemplate = require('./html')

module.exports = function render({Component, script}) {
  return function() {
    const title = process.env.PAGE_TITLE || 'Page Title';
    const style = process.env.PAGE_STYLE || 'style/style.css'
    return function(req, res) {
      if (req.data) {
        const reactDom = renderToString(<Component data = {req.data} />)
        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( htmlTemplate( {title, script, style, reactDom, data: req.data} ) );
      } else {
        // render 404 page
        res.status(404).send();
      }
    }
  }  
}