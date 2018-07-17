"use strict"

const render = require('../../../lib/render')
const Course = require('../../../components/Course')

function getCourse(db) {
  return function(req, res, next) {
    const courseId = req.params && req.params.course;
    db.course.getCourse({courseId}, (err, data) => {
      if (err) {
        res.status(400).send();
      } else {
        req.data = data;
        next()
      }
    })
  }
}

module.exports = [getCourse, render({Component: Course, script: 'script/bundle.js'})]
 