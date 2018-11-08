"use strict"

import React, { Component } from 'react'

import { bindUserProvider  } from '@stormgle/react-user'

import Header from './Header'

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sg-content">
        <Header user = {this.props.user} />
      </div>
    )
  }

}

module.exports = bindUserProvider(Profile)