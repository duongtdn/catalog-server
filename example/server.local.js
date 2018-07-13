"use strict"

require('dotenv').config()

/* start db and server */
const db = require('database-test-helper')
const catalogdb = require('catalogdb-test-helper')

db.start().add({catalogdb}).init(() => {
  const PORT = process.env.PORT_LOCAL_TEST || 3100;
  const app = require('./app.local');
  const httpServer = require('http').createServer(app);
  httpServer.listen(PORT)
  console.log(`\n# CATALOG-SERVICES is running at http://localhost:${PORT}\n`);
});