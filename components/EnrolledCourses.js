"use strict"

"use strict"

import React, { Component } from 'react'

import { bindUserProvider  } from '@stormgle/react-user'

import Header from './Header'

class EnrolledCourses extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.user) {
      return (
        <div className="sg-content">
          <Header user = {this.props.user} />
  
          <div className="w3-container w3-margin">
            <h2> Your Enrolled courses </h2>
          </div>
  
        </div>
      )
    } else {
      return (
        <div className="sg-content">
          <Header  />
  
          <div className="w3-container w3-margin">
            <h3> You need to login to see this page </h3>
          </div>
         
        </div>
      )
    }
   
  }
}

module.exports = bindUserProvider(EnrolledCourses)