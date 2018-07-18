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
        <div className="w3-container w3-margin">
          <div> <h2> {catalog.title} </h2> </div>
          {
            catalog.courses && catalog.courses.map(course => (
              <div key={course.courseId} className="w3-card w3-round-large" style={{margin: '32px 0', padding: '0 0 8px 0'}} > 
                <div className="w3-container" >
                  <div className="w3-bar-item  w3-right">                    
                    <div className='w3-grey' style={{width: '8px', height: '8px', marginLeft: '2px', display: 'inline-block'}} />
                    <div className='w3-grey' style={{width: '8px', height: '8px', marginLeft: '2px', display: 'inline-block'}} />
                    <div className='w3-green' style={{width: '8px', height: '8px', marginLeft: '2px', display: 'inline-block'}} />
                    <span className='w3-small'> Beginner </span>
                  </div>
                </div>
                <div className="w3-bar">
                  <img src={course.picture} className="w3-bar-item w3-hide-small  w3-round-xlarge" style={{width:'150px'}} />
                  
                  <div className="w3-bar-item">
                    <div className="w3-large w3-text-dark-grey" style={{fontWeight: 'bold', padding: '0 0 8px 0'}}> {course.title} </div> 
                    <div>                    
                      <span className="w3-text-grey"> Develop Skills: </span>
                      <br />
                      {
                        course.skills.map(skill => (
                          <span key={skill} > <span className="w3-tag w3-round w3-large w3-green" style={{margin: '4px 0'}}> {skill} </span> {'\u00A0'} </span>
                          // <span key={skill} > <span className="w3-text-green" style={{margin: '4px 0', fontWeight: 'bold'}}> {skill} </span> {'\u00A0'} </span>
                        ))
                      }
                      <br />
                    </div>
                    <hr />
                    <div>
                      <span className="w3-text-grey"> Required for Certificates: </span>
                      <br />                    
                      {
                        course.certificates.map(cert => (
                          // <span key={cert} > <span className="w3-tag w3-teal" style={{margin: '4px 0'}}> {cert} </span> {'\u00A0'} </span>
                          <span key={cert} > <span className="w3-text-blue" style={{margin: '4px 0', fontWeight: 'bold'}}> + {cert} </span> {'\u00A0'} </span>
                        ))
                      }                  
                    </div>
                  </div>

                  <div className="w3-bar-item w3-right">
                    <a href={`/course/${course.courseId}`} className="w3-button w3-orange w3-card-4"> Click to enter </a>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

 
}

module.exports = Catalog