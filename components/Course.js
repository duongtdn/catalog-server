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

          <h2 style = {{fontWeight: 'bold'}}> {course.title} </h2>

          <span className="w3-tag w3-green">  {course.level} </span>
          
          {/* render 1st panel: course information */}
          <div className="w3-row">

            {/* left */}
            <div className="w3-half">

              <p className="w3-text-grey" style={{fontStyle: 'italic'}} > {course.snippet} </p>

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

              <br />

              <div style={{marginBottom: '32px'}} >
                {
                  course.enroll > 100 ?
                    <p style={{fontStyle: 'italic'}} > There are <span style={{fontWeight: 'bold'}} > {course.enroll} </span> students joined this course </p>
                    : null
                }                                
                <button className="w3-button w3-green w3-card-4"> Enroll Now (Save 15%) </button>
                <p> Discount for new course: </p>
                <p > 

                  <span className="w3-large w3-text-red" style={{fontWeight: 'bold', textDecoration: 'line-through', marginRight: '16px'}}> 
                    {course.price.value.toLocaleString(course.price.locale, { style: 'currency', currency: course.price.currency })}
                  </span> 

                  <span className="w3-small w3-text-orange" style={{fontWeight: 'bold'}}> 
                    {course.price.value.toLocaleString(course.price.locale, { style: 'currency', currency: course.price.currency })}
                  </span> 
                </p>

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


        {/* render course information */}
        <div className="w3-container w3-margin" >

          <hr />

          <h3 className="w3-text-blue-grey" style = {{fontWeight: 'bold'}}> COURSE INFORMATION </h3>

          <div className="w3-text-dark-grey"> 
            <div> {course.description} </div>
            
            <div >
              <p style={{fontWeight: 'bold'}}> What you will learned after this course </p>
              {
                course.objective.map( (obj,index) => (
                  <p key={index} style={{marginLeft: '16px'}} > {obj} </p>
                ))
              }
            </div>

            <div >
              <p style={{fontWeight: 'bold'}}> Skills to be accquired and improved </p>
              {
                course.skills.map( (skill, index) => (
                  <p key={index} className="cursor-pointer" style={{marginLeft: '16px'}} > {skill} </p>
                ))
              }
            </div>

            <div >
              <p style={{fontWeight: 'bold'}}> This course is required for certificates </p>
              {
                course.certificates.map( (cert, index) => (
                  <p key={index} className="cursor-pointer" style={{marginLeft: '16px'}} > {cert} </p>
                ))
              }
            </div>

            <div>
              <p style={{fontWeight: 'bold'}} > Course Structure </p>
              <p  style={{marginLeft: '16px'}} > Video lessons: {course.structure.video} </p>
              <p  style={{marginLeft: '16px'}} > Interactive quizs: {course.structure.quiz} </p>
              <p  style={{marginLeft: '16px'}} > Exercises: {course.structure.exercise} </p>
              <p  style={{marginLeft: '16px'}} > Final test: {course.structure.test} </p>
            </div>

          </div>

          



        </div>

      </div>
    )
  }

 
}

module.exports = Course