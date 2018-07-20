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
      </div>
    )
  }

}

module.exports = Header