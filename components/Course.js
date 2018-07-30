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
          <div className="w3-row">

            {/* left */}
            <div className="w3-half">

              <p className="w3-text-grey" style={{fontStyle: 'italic'}} > {course.snippet} </p>

              <p style={{fontWeight: 'bold'}}> <span className="w3-text-grey">Level: </span> <span  className="w3-text-green" > {course.level} </span> </p>

              <p className="w3-text-grey" style={{fontWeight: 'bold'}}> Skills </p>
              {
                course.skills.map(skill => (
                  <p key={skill}  className="cursor-pointer w3-text-blue" style={{paddingLeft: '16px', fontWeight: 'bold'}} > + {skill} </p>
                ))
              }

              <p className="w3-text-grey" style={{fontWeight: 'bold'}}> Required for Certificates </p>
              {
                course.certificates.map(cert => (
                  <p key={cert}  className="cursor-pointer w3-text-blue" style={{paddingLeft: '16px', fontWeight: 'bold'}} > + {cert} </p>
                ))
              }

              <hr />

              <div>
                <button className="w3-button w3-green w3-card-4"> Enroll Now </button>
              </div>

            </div>
            
            {/* right */}
            <div className="w3-half">
              <div className="embed-responsive">
                <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY" />
              </div>
            </div>

          </div> 

        </div>

      </div>
    )
  }

 
}

module.exports = Course