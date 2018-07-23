"use strict"

import React, { Component } from 'react'

class Header extends Component {
  constructor(props) {
    super (props)
  }

  render() {
    return (
      <div className="w3-container w3-bar">
        <div className="w3-bar-item"> <h2> Catalog </h2> </div>

        <div className="w3-bar-item w3-right w3-hide-medium w3-hide-large"> 
          <i className="fa fa-sign-in"  ariaHidden="true" />
        </div>

        <div className="w3-bar-item w3-right w3-hide-small" style={{marginTop: '16px'}}> 
          <button className="w3-button w3-hover-none w3-hover-text-blue"> Sign up </button>
          <button className="w3-button w3-large w3-blue w3-card-4 w3-round"> Login </button>
        </div>

      </div>
    )
  }

}

module.exports = Header