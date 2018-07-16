"use strict"

function getCatalog(db) {
  return function(req, res, next) {
    const catalogId = req.params && req.params.catalog;
    db.catalog.getCatalog({catalogId}, (err, data) => {
      if (err) {
        res.status(400).send();
      } else {
        res.status(200).json({data})
        next()
      }
    })
  }
}

module.exports = [getCatalog]