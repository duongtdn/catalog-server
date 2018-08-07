"use strict"

import React, { Component } from 'react'

class COD extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="w3-container">
        <p className="w3-text-grey"> Please fill in information below </p>
        <div>

          <p>
            <label > Full name </label>
            <input className="w3-input w3-border" type="text" />
          </p>

          <p>
            <label > Phone number </label>
            <input className="w3-input w3-border" type="text" />
          </p>

          <p>
            <label > Address </label>
            <input className="w3-input w3-border" type="text" />
          </p>

        </div>
      </div>
    )
  }
}

class ProcessPayment extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const display = this.props.show ? 'block' : 'none';
    return (
      <div className="w3-modal" style={{ display }}>
        <div className="w3-modal-content w3-animate-right">

          <header className="w3-container "> 
            <span onClick={this.props.cancel} 
                  className="w3-button w3-display-topright w3-red">&times;</span>
            <h2 style={{fontWeight: 'bold'}} > Process Payment </h2>
          </header>

          <br />

          <div style={{marginBottom: '16px'}} >

            <div className="w3-bar w3-border-bottom w3-border-blue w3-large" style={{padding: '0 16px'}}>
              <button className="w3-button w3-bar-item w3-blue"> Cost at Delivery (COD) </button>
            </div>

            <COD />

          </div>

          <footer className="w3-container" style={{paddingBottom: '16px'}} >
            <button className="w3-button w3-blue w3-right"> Next </button>
          </footer>

        </div>
      </div>
    )
  }

}

module.exports = ProcessPayment