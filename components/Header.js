"use strict"

import React, { Component } from 'react'

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

        <div className="w3-bar-item w3-border-bottom" style={{marginTop: '48px'}} > 
          <button className="w3-button w3-block w3-large w3-blue w3-card-4 w3-round"> Login </button>
          <button className="w3-button w3-block w3-hover-none w3-hover-text-blue no-outline"> Sign up </button>
        </div>
        
        <a href="#" className="w3-bar-item w3-button">Home</a>
        <a href="#" className="w3-bar-item w3-button">About</a>
        <a href="#" className="w3-bar-item w3-button">Contact</a>
      </div>
    )
    
  }
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebar: false
    }

    const methods = ['closeSidebar', 'openSidebar']
    methods.forEach( method => this[method] = this[method].bind(this) )

  }

  render() {
    return (
      <div className="w3-container w3-bar">
        <div className="w3-bar-item" > <h2> Catalog </h2> </div>

        <div className="w3-bar-item w3-right w3-hide-medium w3-hide-large" style={{marginTop: '16px'}} > 
          <i className="fa fa-bars w3-xlarge cursor-pointer"  aria-hidden="true"  onClick={this.openSidebar} ></i>
        </div>

        <Sidebar display = {this.state.sidebar} close = {this.closeSidebar} />

        <div className="w3-bar-item w3-right w3-hide-small" style={{marginTop: '16px'}}> 
          <button className="w3-button w3-hover-none w3-hover-text-blue no-outline"> Sign up </button>
          <button className="w3-button w3-large w3-blue w3-card-4 w3-round"> Login </button>
        </div>

        <div className="w3-bar-item w3-right w3-hide-small w3-border-right" style={{marginTop: '16px'}}> 
          <a href="#" className="w3-bar-item w3-button no-outline">Home</a>
          <a href="#" className="w3-bar-item w3-button no-outline">About</a>
          <a href="#" className="w3-bar-item w3-button no-outline">Contact</a>
        </div>

      </div>
    )
  }

  closeSidebar() {
    this.setState({ sidebar: false })
  }

  openSidebar() {
    this.setState({ sidebar: true })
  }

}

module.exports = Header