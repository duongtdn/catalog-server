"use strict"

import React, { Component } from 'react'

import auth, { logout, authGet } from '@stormgle/auth-client'
import { bindUserProvider  } from '@stormgle/react-user'
import LoginPanel from './popup/LoginPanel'
import { server } from '../lib/env'

auth.use({cookie: 'sglearn'})


class Sidebar extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const _display = this.props.display ? 'block' : 'none';
    return (
      <div className="w3-sidebar w3-bar-block w3-animate-right w3-hide-medium w3-hide-large" 
           style= {{ display: _display, right: 0, width: '100%', background: 'linear-gradient(to bottom right, #f1f1f1  0%, #ddffff  100%)' }} 
      >
        <span className="w3-button w3-display-topright w3-text-red" onClick={this.props.close}>X</span>

        {
          (this.props.user)? 
            // <div className="w3-bar-item w3-border-bottom" style={{marginTop: '48px', textAlign: 'center', paddingBottom: '16px'}} > 
            //   <div className="w3-bar-item" style={{textAlign: 'center'}}> {this.props.user.displayName || this.props.user.username} </div>
            //   <button className="w3-button w3-large w3-border w3-border-blue-grey w3-round" onClick={this.props.logout}> Logout </button>
            // </div>
            <div className="w3-bar-item w3-border-bottom" style={{marginTop: '48px', textAlign: 'center', paddingBottom: '16px'}} >
              <img src={this.props.user.profile.picture}
                      className="w3-image w3-round" 
                      style={{paddingRight: '8px'}}
                      width={60} height={60}
                      alt="user picture" />
              {this.props.user.profile.firstName || this.props.user.username}
            </div>
          :
            <div className="w3-bar-item w3-border-bottom" style={{marginTop: '48px'}} >               
              <button className="w3-button w3-block w3-large w3-border w3-blue w3-card-4 w3-round" onClick={() => this.props.login('login')}> Login </button>
              <button className="w3-button w3-block w3-text-orange w3-hover-none w3-hover-text-blue no-outline" onClick={() => this.props.login('signup')} > Sign up </button>
            </div>
        }

        {
          (this.props.user)? 
            <a href="" className="w3-bar-item w3-button">My Profile</a> : null
        }

        {
          (this.props.user)? 
            <a href="/me/enrolled" className="w3-bar-item w3-button">My Study</a> : null
        }
        
        <a href="#" className="w3-bar-item w3-button w3-border-top">Home</a>
        <a href="/browse" className="w3-bar-item w3-button">Browse Courses</a>
        <a href="#" className="w3-bar-item w3-button">About</a>
        <a href="#" className="w3-bar-item w3-button">Contact</a>

        {
          (this.props.user)? 
              <button className="w3-button w3-block w3-border-top w3-text-orange" onClick={this.props.logout}> Logout </button>
          : null
        }

      </div>
    )
    
  }
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSidebar: false,
      showLogin: false,
      route: 'login'
    }

    const methods = [
      'closeSidebar', 
      'openSidebar', 
      'login', 
      'logout', 
      'closeLogin',
      '_updateUserServiceData',
      '_convertEnrollListToObject'
    ]
    methods.forEach( method => this[method] = this[method].bind(this) )

  }

  componentWillMount() {
    if (typeof window !== 'undefined' && this.props.user) {
      // user logged in
      this._updateUserServiceData(this.props.user)
    }
  }

  componentWillReceiveProps(props) {
    if (props.showLoginPanel) {      
     this.login(props.showLoginPanel)
    }
    if (typeof window !== 'undefined' && !this.props.user && props.user) {
      // user just logged in
      this._updateUserServiceData(props.user)
    }
  }

  render() {
    return (
      <div className="w3-container w3-bar" style={{padding: '0.01em 40px'}}>
        <div className="w3-bar-item" > <h2> Catalog </h2> </div>

        {/* render for small device */}

        <div className="w3-bar-item w3-right w3-hide-medium w3-hide-large" style={{marginTop: '16px'}} > 
          <i className="fa fa-bars w3-xlarge cursor-pointer"  aria-hidden="true"  onClick={this.openSidebar} ></i>
        </div>

        <Sidebar  display = {this.state.showSidebar} 
                  close = {this.closeSidebar} 
                  login={this.login} 
                  logout={this.logout}
                  user={this.props.user}
        />

        {/* render for medium and large device */}

        {
          (this.props.user)? 
            <div className="w3-bar-item w3-right w3-hide-small w3-dropdown-hover" style={{marginTop: '16px'}}>        
              <button className="w3-button w3-hover-opacity"> 
                <img src={this.props.user.profile.picture}
                      className="w3-image w3-round" 
                      style={{paddingRight: '8px'}}
                      width={40} height={40}
                      alt="user picture" />
                {this.props.user.profile.firstName || this.props.user.username} <i className="fa fa-caret-down" />
              </button>
              <div className="w3-dropdown-content w3-bar-block w3-card-4" style={{backgroundColor: '#f1f1f1'}}>
                <a href=""className="w3-bar-item w3-button" > My Profile </a>
                <a href="/me/enrolled"className="w3-bar-item w3-button" > My Study </a>
                <button className="w3-button w3-block w3-border-top w3-text-orange" onClick={this.logout}> Logout </button>
              </div>
            </div>
          :
            <div className="w3-bar-item w3-right w3-hide-small" style={{marginTop: '16px'}}>               
              <button className="w3-button w3-text-orange w3-hover-none w3-hover-text-blue no-outline" onClick={() => this.login('signup')} > Sign up </button>
              <button className="w3-button w3-large w3-border w3-blue w3-card-4 w3-round" onClick={() => this.login('login')}> Login </button>
            </div>
        }
        
        <div className="w3-bar-item w3-right w3-hide-small w3-border-right" style={{marginTop: '16px'}}> 
          <a href="#" className="w3-bar-item w3-button no-outline w3-hover-blue">Home</a>
          <a href="/browse" className="w3-bar-item w3-button no-outline w3-hover-blue">Browse Course</a>
          {
            (this.props.user)? <a href="/me/enrolled" className="w3-bar-item w3-button no-outline w3-hover-blue">My Study</a> : null
          }
          <a href="#" className="w3-bar-item w3-button no-outline w3-hover-blue">About</a>
          <a href="#" className="w3-bar-item w3-button no-outline w3-hover-blue">Contact</a>
        </div>

        <LoginPanel display = {this.state.showLogin} route = {this.state.route} close={this.closeLogin} />

      </div>
    )
  }

  closeSidebar() {
    this.setState({ showSidebar: false })
  }

  openSidebar() {
    this.setState({ showSidebar: true })
  }

  login(route) {
    this.setState({ route, showLogin: true })
  }

  logout() {
    logout()
  }

  closeLogin() {
    this.setState({ showLogin: false, showSidebar: false })
    this.props.onLoginPanelClosed && this.props.onLoginPanelClosed();
  }

  _updateUserServiceData(user, done) {
    authGet({
      endPoint: `${server.enroll}/user/enroll`,
      service: 'sglearn',
      onSuccess: (data) => {
        const enroll = this._convertEnrollListToObject(data)
        user.update({enroll});
        done && done(null);
      },
      onFailure: ({status, err}) => {
        done && done(err)
      }
    })
  }
  
  _convertEnrollListToObject(enrolls) {
    if (enrolls && enrolls.length > 0) {
      const obj = {};
      enrolls.forEach( enroll => {
        obj[enroll.courseId] = {
          invoice: enroll.invoice,
          status: enroll.status,
          enrollAt: enroll.enrollAt
        }
      })
      return obj
    } else {
      return {}
    }
  }

}

module.exports = bindUserProvider(Header)
