"use strict"

const React = require('react')
const { renderToString  } = require('react-dom/server')
const jwt = require('jsonwebtoken');
const http = require('http')

const htmlTemplate = require('./html')

const secret = process.env.AUTH_KEY_SGLEARN;

function _getUserIdFromToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        reject(err)
      } else {
        resolve(decoded.uid)
      }
    });
  })
  
}

const serverSecret = process.env.DELIGATE_KEY_ADMIN_SERVER;
const token = jwt.sign(
  {uid: 'sglearn-web-server'},
  serverSecret
);
function _authGetUser(uid) {
  return new Promise((resolve, reject) => {
    const options = {
      host: 'localhost',
      port: 3100,
      method: 'GET',
      path:`/users/uid/${uid}`,
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
        if (res.statusCode !== 200) {
          reject(JSON.parse(data))
        } else {
          resolve(JSON.parse(data));
        }
      });
    })
    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  })
}

function _getUserEnroll(db, uid) {
  return new Promise((resolve, reject) => {
    db.enroll.getEnrollList({uid}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const enroll = {};
        data.forEach(item => {
          enroll[item.courseId] = item.status
        })
        resolve(enroll);
      }
    })
  })
}

module.exports = function render({Component, script}) {
  return function(db) {
    const title = process.env.PAGE_TITLE || 'Page Title';
    const style = process.env.PAGE_STYLE || 'style/style.css'
    return function(req, res) {
      if ( req.cookies && req.cookies['sglearn'] ) {
        const userToken = req.cookies['sglearn']
        _getUserIdFromToken(userToken).then(uid => {
          const _promises = [];
          _promises.push(_authGetUser(uid));
          _promises.push(_getUserEnroll(db,uid));
          Promise.all(_promises).then(value => {
            const userData = value[0];
            const enroll = value[1];
            if (userData && userData.user && userData.user.uid) {
              // delete data.user.uid
              delete userData.user.policies
            } else {
              res.status(404).send();
            }
            const user = userData.user;
            user.enroll = enroll; 

            const reactDom = renderToString(<Component data = {req.data} user = {user} />)
            res.writeHead( 200, { "Content-Type": "text/html" } );
            res.end( htmlTemplate( {title, script, style, reactDom, data: req.data} ) );
            
          }).catch(err => console.log(err))
        })       
      } else {
        const reactDom = renderToString(<Component data = {req.data} />)
        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( htmlTemplate( {title, script, style, reactDom, data: req.data} ) );      
      }
    }
  }  
}