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
        <div className="w3-modal-content">

          <header className="w3-container "> 
            <span onClick={this.props.cancel} 
                  className="w3-button w3-display-topright">&times;</span>
            <h2> Purchase Order </h2>
          </header>

          <div className="w3-container">
            <p>Some text..</p>
            <p>Some text..</p>
          </div>

        </div>
      </div>
    )
  }

}

module.exports = Catalog