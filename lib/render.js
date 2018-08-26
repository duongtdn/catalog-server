"use strict"

const React = require('react')
const { renderToString  } = require('react-dom/server')
const jwt = require('jsonwebtoken');
const http = require('http')

const htmlTemplate = require('./html')

const secret = process.env.AUTH_KEY_SGLEARN;

function _getUserIdFromToken(token) {
  return new Promise((resolve) => {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    });
  })
  
}

const serverSecret = process.env.DELIGATE_KEY_ADMIN_SERVER;
const token = jwt.sign(
  {uid: 'sglearn-web-server'},
  serverSecret
);
function _authGetUser(userToken) {
  return new Promise((resolve, reject) => {
    _getUserIdFromToken(userToken)
    .then(user => {
      const options = {
        host: 'localhost',
        port: 3100,
        method: 'GET',
        path:`/users/uid/${user.uid}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const req = http.request(options, (res) => {
        let data = null;
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data = chunk;
        });
        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      req.on('error', (err) => {
        reject(err);
      });
      req.end();
    })
    .catch(err =>reject(err));
  })

}

module.exports = function render({Component, script}) {
  return function() {
    const title = process.env.PAGE_TITLE || 'Page Title';
    const style = process.env.PAGE_STYLE || 'style/style.css'
    return function(req, res) {
      if ( req.cookies && (Object.keys(req.cookies).length > 0) ) {
        const userToken = req.cookies['sglearn']
        _authGetUser(userToken)
          .then(data => {
            if (data && data.user && data.user.uid) {
              // delete data.user.uid
              delete data.user.policies
            } else {
              res.status(404).send();
            }
            const user = data.user;
            if (req.data) {
              const reactDom = renderToString(<Component data = {req.data} user = {user} />)
              res.writeHead( 200, { "Content-Type": "text/html" } );
              res.end( htmlTemplate( {title, script, style, reactDom, data: req.data} ) );
            } else {
              // render 404 page
              res.status(404).send();
            }
          })
          .catch(err => res.status(403).send())
      }
    }
  }  
}