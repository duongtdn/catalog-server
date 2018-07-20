"use strict"

import React, { Component } from 'react'

class Catalog extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const catalog = this.props.data || {};
    return (
      <div className="">       
        <div className="w3-container w3-margin">
          <div> <h2> {catalog.title} </h2> </div>
          {
            catalog.courses && catalog.courses.map(course => {
              const _rating = this._ratingCourseLevel(course.level);
              return (
                <div key={course.courseId} className="w3-card w3-round-large w3-white" style={{margin: '32px 0', padding: '0 0 8px 0'}} > 
                  <div className="w3-container" >                    
                      <div className="w3-bar-item  w3-right">                    
                        {
                          _rating.map((val, index) => {
                            const _color = val ? 'w3-green' : 'w3-light-grey'
                            return (<div key={index} className={_color} style={{width: '8px', height: '8px', marginLeft: '2px', display: 'inline-block'}} />)
                          })    
                        }                        
                        <span className='w3-small'> {course.level} </span>
                    </div>
                  </div>
                  <div className="w3-bar">
                    <div className="w3-bar-item">
                      <div className="w3-cell-row">
                        <img src={course.picture} className="w3-container w3-cell w3-hide-small" style={{width:'200px', borderRadius: '24px'}} />
                      
                        <div className="w3-container w3-cell">
                          <div className="w3-large w3-text-dark-grey" style={{fontWeight: 'bold', padding: '0 0 8px 0'}}> {course.title} </div> 
                          <div>                    
                            <span className="w3-text-grey"> Develop Skills: </span>
                            <br />
                            {
                              course.skills.map(skill => (
                                <span key={skill} > <span className="w3-tag w3-round w3-left-align w3-green" style={{margin: '4px 0'}}> {skill} </span> {'\u00A0'} </span>
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
                                <span key={cert} > <span className="w3-text-blue" style={{margin: '4px 0', fontWeight: 'bold', display: 'inline-block'}}> + {cert} </span> {'\u00A0'} </span>
                              ))
                            }                  
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w3-bar-item w3-right">
                      <a href={`/course/${course.courseId}`} className="w3-button w3-orange w3-card-4"> Click to enter </a>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  _ratingCourseLevel(level) {
    if (level === 'Beginner') {
      return [false, false, true]
    }
    if (level === 'Intermidate') {
      return [false, true, true]
    }
    if (level === 'Advanced') {
      return [true, true, true]
    }
  }

 
}

module.exports = Catalog