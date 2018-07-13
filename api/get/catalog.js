"use strict"

const React = require('react')
const { renderToString  } = require('react-dom/server')

const htmlTemplate = require('../../render/html')
const Catalog = require('../../render/Catalog')

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

function render() {
  return function(req, res) {
    if (req.data) {
      const reactDom = renderToString(<Catalog />)
      res.writeHead( 200, { "Content-Type": "text/html" } );
      res.end( htmlTemplate( {reactDom} ) );
    } else {
      // render 404 page
    }
  }
}

module.exports = [getCatalog, render]
 