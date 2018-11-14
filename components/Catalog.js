"use strict"

import React, { Component } from 'react'

import Header from './Header'

class Catalog extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const catalog = this.props.data.catalog || {};
    const list = this.props.data.list || {};
    return (
      <div className="sg-content">     
        <Header user = {this.props.user} />  
        <div className="w3-container w3-margin">                   
          {/* render list of catalogs */}
          {
            // list.map(cat => {
            //   if (cat.title === catalog.title) {
            //     return (
            //       <div key={cat.catalogId} className="cursor-pointer w3-tag w3-round-large w3-blue-grey"  style={{marginRight: '16px'}}> <h4> {catalog.title} </h4> </div>
            //     )
            //   } else {
            //     return (
            //       <div key={cat.catalogId} className="cursor-pointer w3-tag w3-round-large w3-hover-khaki" style={{marginRight: '16px', background: 'none', color: 'grey'}}> 
            //         <h4> <a href={`/catalog/${cat.catalogId}`} style={{textDecoration: 'none'}}> {cat.title} </a> </h4> 
            //       </div>
            //     )
            //   }
            // })
          }
          
          {/* render list of courses */}
          <ul className="w3-ul">{
            catalog.courses && catalog.courses.map(course => {
              const _rating = this._ratingCourseLevel(course.level);
              return (

                <li key={course.courseId} className="" style={{padding: '0 0 8px 0'}} > 
                  {/* render small line indicate course level */}
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
                    {/* render course info */}
                    <div className="w3-bar-item">
                      <div className="w3-cell-row">
                        <img src={course.thumbnail} className="w3-container w3-cell w3-hide-small" style={{width:'150px', borderRadius: '24px'}} />
                      
                        <div className="w3-container w3-cell">
                          <div className="cursor-pointer w3-large w3-text-dark-grey" style={{fontWeight: 'bold', padding: '0 0 4px 0'}}> 
                            <a href={`/course/${course.courseId}`} className="w3-hover-text-blue" style={{textDecoration: 'none'}}> 
                              {course.title} 
                            </a> 
                          </div> 
                          <div className="w3-text-dark-grey" style={{fontStyle: 'italic', padding: '0 0 8px 0'}}> {course.snippet} </div> 
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
                          <hr style={{margin: '8px 0'}} />
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
                    {/* render course action button */}
                    <div className="w3-bar-item w3-right">
                      <a href={`/course/${course.courseId}`} className="w3-button w3-round w3-orange w3-card-4"> View Course </a>
                    </div>
                  </div>
                </li>
              )
            })
          }</ul>
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