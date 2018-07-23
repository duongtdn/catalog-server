"use strict"

import React, { Component } from 'react'

class Header extends Component {
  constructor(props) {
    super (props)
  }

  render() {
    return (
      <div className="w3-container w3-bar">
        <div className="w3-bar-item" > <h2> Catalog </h2> </div>

        <div className="w3-bar-item w3-right w3-hide-medium w3-hide-large" style={{marginTop: '16px'}}> 
          <i className="fa fa-bars w3-xlarge"  aria-hidden="true" ></i>
        </div>

        <div className="w3-bar-item w3-right w3-hide-small" style={{marginTop: '16px'}}> 
          <button className="w3-button w3-hover-none w3-hover-text-blue no-outline"> Sign up </button>
          <button className="w3-button w3-large w3-blue w3-card-4 w3-round"> Login </button>
        </div>

        <div className="w3-bar-item w3-right w3-hide-small w3-border-right" style={{marginTop: '16px'}}> 
          <button className="w3-button no-outline"> Home </button>
          <button className="w3-button no-outline"> About </button>
          <button className="w3-button no-outline"> Contact </button>
        </div>

      </div>
    )
  }

}

module.exports = Header