"use strict"

require('dotenv').config()

const express = require('express')
const api = require('../dist/api')
const cors = require('cors')

/* create api */
const DatabaseAbstractor = require("database-abstractor")
const catalog = new DatabaseAbstractor();
const course = new DatabaseAbstractor();

const DB = {
  HOST: process.env.DB_HOST || 'http://localhost',
  PORT: process.env.DB_PORT || 3001
}

catalog.use(require('catalogdb-dynamodb-driver')({
  region : 'us-west-2', 
  endpoint : `${DB.HOST}:${DB.PORT}`
}))

course.use(require('coursedb-dynamodb-driver')({
  region : 'us-west-2', 
  endpoint : `${DB.HOST}:${DB.PORT}`
}))

api.useDatabase({ catalog, course })

/* create express app from api */
const app = express();

app.use(cors());

app.use('/', api);

module.exports = app;