"use strict"

import React, { Component } from 'react'
import { bindUserProvider  } from '@stormgle/react-user'

import Header from './Header'

function localeString(x, sep, grp) {
  var sx = (''+x).split('.'), s = '', i, j;
  sep || (sep = ' '); // default seperator
  grp || grp === 0 || (grp = 3); // default grouping
  i = sx[0].length;
  while (i > grp) {
      j = i - grp;
      s = sep + sx[0].slice(j, i) + s;
      i = j;
  }
  s = sx[0].slice(0, i) + s;
  sx[0] = s;
  return sx.join('.');
}

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = { isClient: false }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.setState({ isClient : true })
    }
  }

  render() {
    const course = this.props.data || {};

    // if client, recalculate price offer for user
    const price = {
      origin: course.price.value
    }
    if (this.state.isClient) {
      let deduction = 0;
      if (course.promote.discount) {
        deduction += course.promote.discount;
      }
      if (this.props.user && 
          this.props.user.promote && 
          this.props.user.promote.course  && this.props.user.promote.course[course.courseId] ) {
        deduction += this.props.user.promote.course[course.courseId];
      }

      const offer = price.origin - deduction;
      price.offer = (offer > 0) ? offer : 0;
      price.discount = Math.floor((deduction / price.origin) * 100)
    }

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


              {/* Enroll button */}
              <div style={{marginBottom: '32px'}} >
                {
                  course.enroll > 100 ?
                    <p style={{fontStyle: 'italic'}} > There are <span style={{fontWeight: 'bold'}} > {course.enroll} </span> students joined this course </p>
                    : null
                }              

                {/* recalculate discount price for user in client */}
                {
                  (this.state.isClient && price.discount) ?
                    <div>
                      <button className="w3-button w3-green w3-card-4"> Enroll Now (Save {price.discount}%) </button>
                      <p> {course.promote.reason} </p>
                      <p > 

                        <span className="w3-large w3-text-red" style={{fontWeight: 'bold', textDecoration: 'line-through', marginRight: '16px'}}> 
                          {/* {price.origin.toLocaleString(course.price.locale, { style: 'currency', currency: course.price.currency })} */}
                          {localeString(price.origin, '.')} {'\u20ab'}
                        </span> 

                        <span className="w3-small w3-text-orange" style={{fontWeight: 'bold'}}> 
                          {/* {price.offer.toLocaleString(course.price.locale, { style: 'currency', currency: course.price.currency })} */}
                          {localeString(price.offer, '.')} {'\u20ab'}
                        </span> 
                      </p>
                    </div>
                  :
                    <div>
                        <button className="w3-button w3-green w3-card-4"> Enroll Now </button>
                        <p >
                          <span className="w3-small w3-text-orange" style={{fontWeight: 'bold', marginRight: '16px'}}> 
                            {/* {price.origin.toLocaleString(course.price.locale, { style: 'currency', currency: course.price.currency })} */}
                            {localeString(price.origin, '.')} {'\u20ab'}
                          </span>                           
                        </p>
                        {
                          this.state.isClient === false ?
                            <p> Calculating special offer for you... </p>
                            : null
                        }
                    </div>
                }

                

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

module.exports = bindUserProvider(Course)