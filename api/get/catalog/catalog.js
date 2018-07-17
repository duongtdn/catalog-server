"use strict"

const render = require('../../../lib/render')
const Catalog = require('../../../components/Catalog')

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

module.exports = [getCatalog, render({Component: Catalog, script: 'script/bundle.js'})]
 