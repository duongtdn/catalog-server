"use strict"

import React, { Component } from 'react'

class Catalog extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2> Catalog </h2>
        <p> {JSON.stringify(this.props.data)} </p>
        <button onClick = {this.alert}> Alert </button>
      </div>
    )
  }

  alert() {
    console.log('alert')
  }
  
}

module.exports = Catalog