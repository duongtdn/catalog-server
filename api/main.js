"use strict"

const api = require('express-api-binder')

const funcs = [
  'get/catalog/:catalog',
  'get/course/:course',
  'get/me/enrolled',
  'get/me/profile'
]

funcs.forEach(func => {
  const { method, uri, includePath } = api.parseApi(func);
  api.createFunction(method, uri, require(`./${includePath}`))
})

api.get('/browse', function(req, res) {
  res.redirect(302,'/catalog/ca-emb')
})

module.exports = api;


