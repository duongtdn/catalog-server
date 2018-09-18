"use strict"

"use strict"

import React, { Component } from 'react'

import { postJSON } from 'simple-json-xhr'
import { bindUserProvider  } from '@stormgle/react-user'

import { server } from '../lib/env'
import Header from './Header'
import BankTranfer from './popup/BankTransfer'
import { localeString } from '../lib/utils'

class InvoiceDetail extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.invoice) {
      const invoice = this.props.invoice;
      const d = new Date(parseInt(invoice.issueAt));
      const display = this.props.show? 'block' : 'none'
      return (
        <div className="w3-modal" style={{ display }}>
          <div className="w3-modal-content w3-animate-top">

            <header className="w3-container "> 
              <span onClick={this.props.cancel} 
                    className="w3-button w3-display-topright w3-red">&times;</span>
              <h2 className="w3-text-green" style={{fontWeight: 'bold'}} > {this.props.title} </h2>
            </header>

            <div className="w3-container" style={{marginBottom: '32px'}} >
              <p style={{fontWeight: 'bold'}}> Order Nummber: {invoice.number} </p>
              <p> Date Issue: {`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`} </p>
              <p> SubTotal: <span className="w3-text-blue" style={{fontWeight: 'bold'}} > {localeString(invoice.subTotal)} {'\u20ab'} </span> </p>

              <hr />

              <table className="w3-table w3-border w3-bordered">
                <thead>
                  <tr className="w3-blue">
                    <th className = "w3-border-right">Item</th>
                    <th style={{textAlign: 'right'}} >Value ({'\u20ab'})</th>
                  </tr>
                </thead>
                <tbody>
                {
                invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className = "w3-border-right">
                        <div> {item.name} </div>
                        <div className="w3-small w3-text-grey"> {item.code} </div>
                      </td>
                      <td style={{textAlign: 'right'}}>
                        {
                          item.price.discount ? 
                            <div>
                              {localeString(item.price.offer)}
                            </div>
                          :
                            <div> {localeString(item.price.origin)} </div>
                        }                      
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>

            </div>

            <footer className="w3-bar w3-container w3-padding">     
              <div className="w3-right" style={{marginBottom: '8px'}}>                          
                <button className="w3-button w3-blue" onClick={this.props.cancel} > Close </button>
              </div>
            </footer>

          </div>
        </div>
      )
    } else {
      return (null)
    }
    
  }
}

class EnrolledCourses extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      enrolled: null,
      showBankTransfer: false,
      invoiceToShow: null,
      showInvoiceDetail: false
    }

    const methods = [
      'showBankTransferPopup',
      'showInvoiceDetailPopup'
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
              const tag = this._generateTag(e);
              return (
                <li key={e.invoice.number} className="w3-bar" >
                  <div className="w3-bar-item">
                    <p className="w3-large " style={{fontWeight: 'bold'}} > 
                      {tag} <br />
                      <span className="cursor-pointer w3-hover-text-blue" onClick={() => this.gotoStudyPage(e)}> 
                        {e.title} 
                        <span style={{fontWeight: 'normal', fontStyle:'italic'}} > ({e.level}) </span>
                      </span>
                    </p>
                    <p className="w3-text-grey"> {e.snippet} </p>
                    <p className="w3-text-grey" style={{fontStyle:'italic'}}> Enrolled on: {`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`} </p>
                  </div>
                  <div className="w3-bar-item w3-right" style={{textAlign:'center', paddingTop: '36px'}}>
                    <button className="w3-button w3-border w3-text-blue" style={{fontWeight:'bold'}} onClick={() => this.gotoStudyPage(e)}> 
                      Study Now 
                    </button> 
                    {
                       (e.status==='billing') ?
                          <p style={{textAlign:'center'}}> 
                            <span className="w3-text-grey" style={{marginBottom: '8px'}}> Waiting for payment </span> <br />
                            <span className="w3-text-grey cursor-pointer" style={{textDecoration:'underline'}} onClick={() => this.showInvoiceDetailPopup(e.invoice)}> 
                              Order: {e.invoice.number} 
                            </span>
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
                        cancel = {() => {this.setState({showBankTransfer: false})}}
                        user={this.props.user}
                        invoice={this.state.invoiceToShow}
                        title="This course is wating for payment completed"
          />

          <InvoiceDetail  show = {this.state.showInvoiceDetail}
                          cancel = {() => {this.setState({showInvoiceDetail: false})}}
                          invoice={this.state.invoiceToShow}
                          title="Purchase Order"
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

  showInvoiceDetailPopup(invoiceToShow) {
    this.setState({ invoiceToShow, showInvoiceDetail: true})
  }

  gotoStudyPage(enroll) {

    switch (enroll.status) {
      case 'billing':
        this.showBankTransferPopup(enroll.invoice)
        break;
      case 'active':
        console.log('update enroll sattus to studying')
      case 'studying':
      case 'completed':
        console.log(`goto: https://learndesk.io/study/${enroll.courseId}`)
      default:
        break;``
    }

  }

  showBankTransferPopup(invoiceToShow) {
    this.setState({ invoiceToShow, showBankTransfer: true })
  }

  _generateTag(e) {
    let tag = null;
    switch (e.status) {
      case 'billing': 
        tag = <span className="w3-tag w3-small w3-blue-grey" style={{fontWeight: 'normal'}}> Pending </span>
        break
      case 'completed':
        tag = <span className="w3-tag w3-small w3-green" style={{fontWeight: 'normal'}}> Completed </span>
        break
      case 'active':
        tag = <span className="w3-tag w3-small w3-yellow" style={{fontWeight: 'normal'}}> Active </span>
        break
      case 'studying':
        tag = <span className="w3-tag w3-small w3-blue" style={{fontWeight: 'normal'}}> Studying </span>
        break
    }
    return tag
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

        enrolled.sort(function(a,b) {
          // if one is billing, it will be sorted first
          if (a.status === 'billing' && b.status !== 'billing') {
            return -1
          }
          if (b.status === 'billing' && a.status !== 'billing') {
            return 1
          }

          if (a.status === 'studying' && b.status !== 'studying') {
            return -1
          }
          if (b.status === 'studying' && a.status !== 'studying') {
            return 1
          }

          
          if (a.status === 'active' && b.status === 'completed') {
            return -1
          }
          if (a.status === 'completed' && b.status === 'active') {
            return 1
          }
          // a and b status is the same, sort by enrolled date
          return b.enrollAt - a.enrollAt
        })
        
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