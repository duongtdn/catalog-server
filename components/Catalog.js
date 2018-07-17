"use strict"

import React, { Component } from 'react'

class Catalog extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const catalog = this.props.data || {};
    return (
      <div>
        <h2> Catalog </h2>
        <ul>
          {
            catalog.courses && catalog.courses.map(course => (
              <li key={course.courseId}> 
                {course.title} 
                <a href={`/course/${course.courseId}`}> Enter </a>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

 
}

module.exports = Catalog