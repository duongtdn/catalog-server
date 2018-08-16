"use strict"

import React, { Component } from 'react'
import { bindUserProvider  } from '@stormgle/react-user'

import { authPost } from '@stormgle/auth-client'

import Header from './Header'
import PurchaseOrder from './PurchaseOrder'
import ProcessPayment from './ProcessPayment'
import { localeString } from '../lib/utils'

class LoginRequiredPopup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const display = this.props.show ? 'block' : 'none';
    return (
      <div className="w3-modal" style={{ display }}>
        <div className="w3-modal-content w3-animate-top">
          <header className="w3-container "> 
            <span onClick={this.props.cancel} 
                  className="w3-button w3-display-topright w3-red">&times;</span>
            <h3 style={{fontWeight: 'bold'}} > Alert </h3>
          </header>

          <div className="w3-container" style={{marginBottom: '32px'}} >
            <p>
              You need to login or create a new account to enroll this course.
            </p>
          </div>

          <footer className="w3-row w3-container w3-padding" style={{marginBottom: '8px'}} >     
            <div className="w3-half" >                                        
              <button className="w3-button w3-text-orange w3-block w3-large" style={{fontWeight: 'bold'}} onClick = {this.props.signup} > Create New Account </button>              
            </div>
            <div className="w3-half">                          
              <button className="w3-button w3-text-blue w3-block w3-large" style={{fontWeight: 'bold'}} onClick = {this.props.login} > Login </button>              
            </div>            
          </footer>

        </div>
      </div>
    )
  }
}

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      isClient: false,
      showLoginRequiredPopup: false,
      showPurchaseOrder: false ,
      showLoginPanel: false,
      showProcessPayment: false,

      items: [],
      billTo: null, // not use right now
    }

    const methods = [
      'openLoginRequiredPopup',
      'closeLoginRequiredPopup',
      'openPurchaseOrder',
      'closePurchaseOrder',
      'onLoginPanelClosed',
      'openProcessPayment',
      'closeProcessPayment',
      'purchase',
      '_calculateOfferPrice'
    ]
    methods.forEach(method => this[method] = this[method].bind(this))

  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.setState({ isClient : true })
    }
  }

  render() {
    const course = this.props.data || {};

    // if client, recalculate price offer for user
    const price = this._calculateOfferPrice();

    return (
      <div className="sg-content">
        <Header showLoginPanel = {this.state.showLoginPanel} onLoginPanelClosed = {this.onLoginPanelClosed} />
        
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
                      <button className="w3-button w3-green w3-card-4" onClick = {this.openPurchaseOrder} > 
                        Enroll Now (Save {price.discount}%) 
                      </button>
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

        <LoginRequiredPopup show = {this.state.showLoginRequiredPopup}
                            cancel = {this.closeLoginRequiredPopup}
                            login = {() => this.openLoginPanel('login')}
                            signup = {() => this.openLoginPanel('signup')}
        />

        <PurchaseOrder  show = {this.state.showPurchaseOrder} 
                        cancel = {this.closePurchaseOrder} 
                        next = {this.openProcessPayment}
                        items = {this.state.items}
        />

        <ProcessPayment user = {this.props.user}
                        show = {this.state.showProcessPayment}
                        cancel = {this.closeProcessPayment}
                        next = {this.purchase}

        />

      </div>
    )
  }

  openLoginRequiredPopup() {
    this.setState( { showLoginRequiredPopup : true})
  }

  closeLoginRequiredPopup() {
    this.setState( { showLoginRequiredPopup : false})
  }

  openPurchaseOrder() {
    if (this.props.user) {
      const course = this.props.data || {};
      const items = [];
      items.push({
        name: course.title,
        type: 'course',
        code: course.courseId,
        quantity: 1,
        price: this._calculateOfferPrice()
      })
      this.setState({ items, showPurchaseOrder: true })
    } else {
      this.openLoginRequiredPopup();
    }
    
  }

  closePurchaseOrder() {
    this.setState({ showPurchaseOrder: false })
  }

  onLoginPanelClosed() {
    this.setState({ showLoginPanel: false })
  }

  openLoginPanel(route) {
    this.setState({ showLoginRequiredPopup : false, showLoginPanel: route })
  }

  openProcessPayment() {
    this.setState({ showPurchaseOrder: false, showProcessPayment: true })
  }

  closeProcessPayment() {
    this.setState({ showProcessPayment: false })
  }

  purchase(billTo) {
    const items = this.state.items;
    const cart = {items, billTo}
    authPost({
      endPoint: 'http://localhost:3210/purchase',
      service: 'sglearn',
      data: {cart},
      onSuccess: (data) => {
        console.log(data)
        this.setState({ showProcessPayment: false })
      },
      onFailure: ({status, err}) => {
        console.log(err)
      }
    })
  }

  _calculateOfferPrice() {
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
    return price;
  }
 
}

module.exports = bindUserProvider(Course)