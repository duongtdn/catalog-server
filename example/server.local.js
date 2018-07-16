"use strict"

require('dotenv').config()

/* start db and server */
const db = require('database-test-helper')
const catalogdb = require('catalogdb-test-helper')


// require('babel-register')({
//   presets: ["env", "react"],
//   ignore: function(filename) {
//     const apiLoc = new RegExp(`${process.cwd()}/api/`)
//     const renderLoc = new RegExp(`${process.cwd()}/render/`)
//     if (apiLoc.test(filename) || renderLoc.test(filename)) {
//       return false
//     } else {
//       return true
//     }
//   }
// })

db.start().add({catalogdb}).init(() => {
  const PORT = process.env.PORT_LOCAL_TEST || 3100;   
  const app = require('./app.local');
  const httpServer = require('http').createServer(app);
  httpServer.listen(PORT, function() {
    console.log(`\n# CATALOG-SERVICES is running at http://localhost:${PORT}\n`);
  })  
});