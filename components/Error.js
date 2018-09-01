"use strict"

import React, { Component } from 'react'

class Error extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const display = this.props.show? 'block' : 'none'
    return (
      <div className="w3-modal" style={{ display }}>
        <div className="w3-modal-content w3-animate-top">

          <header className="w3-container "> 
            <span onClick={this.props.cancel} 
                  className="w3-button w3-display-topright w3-red">&times;</span>
            <h2 className="w3-text-red" style={{fontWeight: 'bold'}} > Error </h2>
          </header>

          <div className="w3-container" style={{marginBottom: '32px'}} >
            <p className="w3-large w3-text-dark-grey" style={{fontWeight: 'bold'}}>
              We are sorry for the inconvenience. There is an error why trying to connect to purchase server.
            </p>
            <p className="w3-large w3-text-dark-grey" style={{fontWeight: 'bold'}}>
              Please try again later.
            </p>
          </div>

          <footer className="w3-bar w3-container w3-padding">     
            <div className="w3-right" style={{marginBottom: '8px'}}>                          
              <button className="w3-button w3-blue" onClick={this.props.cancel} > Close </button>
            </div>
          </footer>

        </div>
      </div>
    )
  }

}

module.exports = Error