"use strict"

const React = require('react')
const { renderToString  } = require('react-dom/server')

const htmlTemplate = require('../../../render/html')
const Catalog = require('../../../render/Catalog')

function getCatalog(db) {
  return function(req, res, next) {
    const catalogId = req.params && req.params.catalog;
    db.catalog.getCatalog({catalogId}, (err, data) => {
      if (err) {
        res.status(400).send();
      } else {
        req.data = data;
        next()
      }
    })
  }
}

const title = process.env.PAGE_TITLE || 'Page Title';
const script = process.env.PAGE_SCRIPT || 'script/index.js'
const style = process.env.PAGE_STYLE || 'style/style.css'

function render() {
  return function(req, res) {
    if (req.data) {
      const reactDom = renderToString(<Catalog data = {req.data} />)
      res.writeHead( 200, { "Content-Type": "text/html" } );
      res.end( htmlTemplate( {title, script, style, reactDom} ) );
    } else {
      // render 404 page
    }
  }
}

module.exports = [getCatalog, render]
 