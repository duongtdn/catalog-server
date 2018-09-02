"use strict"

const render = require('../../../lib/render')
const EnrolledCourses = require('../../../components/EnrolledCourses')

function authen(db) {
  return function(req, res, next) {
    console.log('reach server')
    next()
  }
}

module.exports = [authen, render({Component: EnrolledCourses, script: 'script/bundle.js'})]