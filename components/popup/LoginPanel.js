"use strict"

import React, { Component } from 'react'
import { Login } from '@stormgle/react-user'

import { api } from '../../env'

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
                 api = {api}
                 route={this.props.route}
          /> 
        </div>
      </div>
    )
  }
}


module.exports = LoginPanel