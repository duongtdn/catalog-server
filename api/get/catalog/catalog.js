"use strict"

const render = require('../../../lib/render')
const Catalog = require('../../../components/Catalog')

function getCatalog(db) {
  return function(req, res, next) {
    const catalogId = req.params && req.params.catalog;
    const promises = [];
    req.data = {};
    
    promises.push(new Promise((resolve, reject) => {
      db.catalog.getCatalog({catalogId}, (err, data) => {
        if (err) {
          reject(err)
        } else {
          req.data.catalog = data;
          resolve()
        }
      })      
    })) 
    
    promises.push(new Promise((resolve, reject) => {
      db.catalog.list((err, data) => {
        if (err) {
          reject(err)
        } else {
          req.data.list = data;
          resolve()
        }
      })      
    })) 

    Promise.all(promises)
      .then(() => {
        next()
      })
      .catch(() => {
        res.status(400).send();
      })

  }
}

module.exports = [getCatalog, render({Component: Catalog, script: process.env.CATALOG_PAGE_SCRIPT})]
 