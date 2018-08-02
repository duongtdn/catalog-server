"use strict"

import React, { Component } from 'react'

class Catalog extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const display = this.props.show ? 'block' : 'none'
    return (
      <div className="w3-modal" style={{ display }}>
        <div className="w3-modal-content w3-animate-top">

          <header className="w3-container "> 
            <span onClick={this.props.cancel} 
                  className="w3-button w3-display-topright w3-hover-red">&times;</span>
            <h2 style={{fontWeight: 'bold'}} > Purchase Order </h2>
          </header>

          <br />

          <div className="w3-container" style={{marginBottom: '32px'}} >
            <table className="w3-table w3-border w3-bordered">
              <tr className="w3-blue">
                <th className = "w3-border-right">Item</th>
                <th style={{textAlign: 'right'}} >Value</th>
              </tr>
              
              <tr>
                <td className = "w3-border-right">ABC</td>
                <td style={{textAlign: 'right'}}>500</td>
              </tr>
            </table>
          </div>

          <footer className="w3-bar w3-container w3-padding">     
            <div className="w3-right">
              <button className="w3-button w3-orange" style={{marginRight: '16px'}} > Move to Cart </button>                               
              <button className="w3-button w3-blue" > Process payment </button>
            </div>
          </footer>

        </div>
      </div>
    )
  }

}

module.exports = Catalog