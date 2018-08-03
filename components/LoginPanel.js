"use strict"

import React, { Component } from 'react'
import { Login } from '@stormgle/react-user'

const _api = {
  login: process.env.API_LOGIN || 'http://localhost:3100/auth/login',
  signup: process.env.API_SIGNUP || 'http://localhost:3100/auth/signup',
  check: process.env.API_CHECK || 'http://localhost:3100/check/user',
}

class LoginPanel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const _display = this.props.display ? 'block' : 'none';
    return (
      <div  className="w3-sidebar w3-animate-top"
            style= {{ display: _display, right: 0, width: '100%', background: 'linear-gradient(to bottom right, #f1f1f1  0%, #ddffff  100%)' }} 
      > 
        <div style={{margin: 'auto'}} >
          <Login show = {this.props.display} 
                 close = {this.props.close} 
                 api = {_api}
                 route={this.props.route}
          /> 
        </div>
      </div>
    )
  }
}


module.exports = LoginPanel