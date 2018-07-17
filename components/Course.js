"use strict"

import React, { Component } from 'react'

class Course extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const course = this.props.data || {};
    return (
      <div>
        <h2> Course </h2>
        <div> {course.courseId} </div>
      </div>
    )
  }

 
}

module.exports = Course