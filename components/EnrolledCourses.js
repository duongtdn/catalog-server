"use strict"

"use strict"

import React, { Component } from 'react'

import { postJSON } from 'simple-json-xhr'
import { bindUserProvider  } from '@stormgle/react-user'

import { server } from '../lib/env'
import Header from './Header'

class EnrolledCourses extends Component {
  constructor(props) {
    super(props);

    this.state = { enrolled: null }
  }

  componentDidMount() {
    this._createEnrolledList(this.props)
  }

  componentWillReceiveProps(props) {
    this._createEnrolledList(props)
  }

  render() {
    console.log(this.state.enrolled)
    if (this.props.user) {
      return (
        <div className="sg-content">
          <Header user = {this.props.user} />
  
          <div className="w3-container w3-margin">

          {/* just a sentence */}
          {
            this.state.enrolled ?
              <h3> 
                You have {this.state.enrolled.filter(e=> e.status === 'billing').length} new courses
              </h3>
              :
              <h3> You don't have any enrolled course yet </h3> 
          }  

          {/* enrolled list */}
          <ul className="w3-ul"> {
            this.state.enrolled && this.state.enrolled.map(e => {
              const d = new Date(parseInt(e.enrollAt))
              return (
                <li key={e.invoice} className="w3-bar" >
                  <div className="w3-bar-item">
                    <p className="w3-large curdor-pointer" style={{fontWeight: 'bold'}} > 
                      {e.title} <span style={{fontWeight: 'normal', fontStyle:'italic'}}> ({e.level}) </span>
                    </p>
                    <p className="w3-text-grey"> {e.snippet} </p>
                    <p className="w3-text-grey" style={{fontStyle:'italic'}}> Enrolled on: {`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`} </p>
                  </div>
                  <div className="w3-bar-item w3-right">
                    <button className="w3-button w3-border w3-text-blue" style={{fontWeight:'bold'}}> Study Now </button> 
                  </div> 
                </li>
              )
            })
          } </ul>

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
    postJSON({
      endPoint: `${server.course}/query`,
      data: {courses: courseIds},
      onSuccess: ({status, data}) => {
        const enrolled = this._matchCourseWithEnrolled(user.enroll, data.data);
        this.setState({ enrolled })
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