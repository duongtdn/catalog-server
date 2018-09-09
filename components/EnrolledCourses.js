"use strict"

"use strict"

import React, { Component } from 'react'

import { postJSON } from 'simple-json-xhr'
import { bindUserProvider  } from '@stormgle/react-user'

import { server } from '../lib/env'
import Header from './Header'
import BankTranfer from './popup/BankTransfer'

class EnrolledCourses extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      enrolled: null,
      showBankTransfer: false,
      invoiceToShow: null
    }

    const methods = [
      'openBankTransferPopup'
    ];
    methods.forEach(method => this[method] = this[method].bind(this))
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
              const d = new Date(parseInt(e.enrollAt));
              const tag = (e.status==='billing') ? 
                            <span className="w3-tag w3-small w3-red" style={{fontWeight: 'normal'}}> New </span>
                            :
                            (e.status==='complete') ? 
                              <span className="w3-tag w3-small w3-green" style={{fontWeight: 'normal'}}> Complete </span>
                              :
                              <span className="w3-tag w3-small w3-orange" style={{fontWeight: 'normal'}}> Active </span>
              return (
                <li key={e.invoice.number} className="w3-bar" >
                  <div className="w3-bar-item">
                    <p className="w3-large cursor-pointer" style={{fontWeight: 'bold'}} > 
                      {tag} <br />
                      {e.title} <span style={{fontWeight: 'normal', fontStyle:'italic'}}> ({e.level}) </span>
                    </p>
                    <p className="w3-text-grey"> {e.snippet} </p>
                    <p className="w3-text-grey" style={{fontStyle:'italic'}}> Enrolled on: {`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`} </p>
                  </div>
                  <div className="w3-bar-item w3-right" style={{textAlign:'center', paddingTop: '36px'}}>
                    <button className="w3-button w3-border w3-text-blue" style={{fontWeight:'bold'}} onClick={() => this.openBankTransferPopup(e.invoice)}> 
                      Study Now 
                    </button> 
                    {
                       (e.status==='billing') ?
                          <p style={{textAlign:'center'}}> 
                            <span className="w3-text-grey" style={{marginBottom: '8px'}}> Waiting for payment </span> <br />
                            <span className="w3-text-grey cursor-pointer" style={{textDecoration:'underline'}}> Order: {e.invoice.number} </span>
                          </p>
                          :
                          null
                    }
                  </div> 
                </li>
              )
            })
          } </ul>

          </div>

          <BankTranfer  show = {this.state.showBankTransfer}
                        cancel = {() => {this.setState({showBankTransfer : false})}}
                        user={this.props.user}
                        invoice={this.state.invoiceToShow}
                        title="This course is wating for payment completed"
          />
  
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

  openBankTransferPopup(invoiceToShow) {
    this.setState({ invoiceToShow, showBankTransfer: true })
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