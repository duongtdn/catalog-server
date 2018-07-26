"use strict"

import React, { Component } from 'react'

import Header from './Header'

class Course extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const course = this.props.data || {};
    return (
      <div className="sg-content">
        <Header />
        
        {/* render course detail */}
        <div className="w3-container w3-margin">

          <h2> {course.title} </h2>
          
          {/* render 1st panel: course information */}
          <div className="w3-bar">
            {/* left side */}
            <div className="w3-bar-item">
              lefy side
            </div>
            {/* right side */}
            <div className="w3-bar-item">
              right side
            </div>
          </div>

        </div>

      </div>
    )
  }

 
}

module.exports = Course