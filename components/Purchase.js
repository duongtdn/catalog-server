"use strict"

import React, { Component } from 'react'

import { localeString } from '../lib/utils'

class Catalog extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const display = this.props.show ? 'block' : 'none';
    
    let totalPrice = 0;
    this.props.items.forEach( item => {
      if (item.price.offer) {
        totalPrice += item.price.offer;
      } else {
        totalPrice += item.price.origin;
      }
    })


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
              <thead>
                <tr className="w3-blue">
                  <th className = "w3-border-right">Item</th>
                  <th style={{textAlign: 'right'}} >Value ({'\u20ab'})</th>
                </tr>
              </thead>
              <tbody>
              {
                this.props.items.map((item, index) => (
                  <tr key={index}>
                    <td className = "w3-border-right">
                      <div> {item.name} </div>
                      <div className="w3-small w3-text-grey"> {item.code} </div>
                    </td>
                    <td style={{textAlign: 'right'}}>
                      {
                        item.price.discount ? 
                          <div>
                            {localeString(item.price.offer)}
                          </div>
                        :
                          <div> {localeString(item.price.origin)} </div>
                      }
                      
                    </td>
                  </tr>
                ))
              }
              </tbody>
              <tfoot>
                <tr className="w3-pale-blue">
                  <th className = "w3-border-right">Total</th>
                  <th className="w3-text-orange" style={{textAlign: 'right'}} > {localeString(totalPrice)} </th>
                </tr>
              </tfoot>
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