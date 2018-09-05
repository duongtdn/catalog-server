"use strict"

"use strict"

import React, { Component } from 'react'

import { postJSON } from 'simple-json-xhr'
import { bindUserProvider  } from '@stormgle/react-user'

import { server } from '../lib/env'
import Header from './Header'

class EnrolledCourses extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this._createEnrolledList(this.props)
  }

  componentWillReceiveProps(props) {
    this._createEnrolledList(props)
  }

  render() {
    if (this.props.user) {
      console.log(this.props.user)
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

  _createEnrolledList(props) {
    if (!props.user) {
      return [];
    }
    const user = props.user;
    
    const courseIds = [];
    for(let courseId in user.enroll) {
      courseIds.push(courseId)
    }
    console.log(courseIds)
    postJSON({
      endPoint: `${server.course}/query`,
      data: {courses: courseIds},
      onSuccess: ({status, data}) => {
        const enrolled = this._matchCourseWithEnrolled(user.enroll, data.data)
        console.log(enrolled)
      },
      onFailure: ({status, err}) => {
        console.log(err)
      }
    })
  }

  _matchCourseWithEnrolled(enrolledList, courses) {
    return courses.map(course => {
      const enroll = enrolledList[course.courseId]
      return {...course, ...enroll}
    })
  }

}

module.exports = bindUserProvider(EnrolledCourses)