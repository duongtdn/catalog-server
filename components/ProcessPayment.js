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
            <label > Your name </label>
            <input  className = "w3-input w3-border" 
                    type = "text" 
                    value = {this.props.fullName} 
                    onChange = {(evt) => this.props.updateName(evt.target.value)}
            />
          </p>

          <p>
            <label > Phone number </label>
            <input  className = "w3-input w3-border" 
                    type = "text" 
                    value = {this.props.phone} 
                    onChange = {(evt) => this.props.updatePhone(evt.target.value)}
            />
          </p>

          <p>
            <label > Email </label>
            <input  className = "w3-input w3-border" 
                    type = "text" 
                    value = {this.props.email} 
                    onChange = {(evt) => this.props.updateEmail(evt.target.value)}
            />
          </p>

          <p>
            <label > Address </label>
            <input  className = "w3-input w3-border" 
                    type = "text" 
                    value = {this.props.address} 
                    onChange = {(evt) => this.props.updateAddress(evt.target.value)}
            />
          </p>

        </div>
      </div>
    )
  }
}

class ProcessPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      phone: '',
      address: '',
      email: ''
    }

    const methods = [
      'next',
      'updateName',
      'updatePhone',
      'updateEmail',
      'updateAddress',
      '_updateStateIfUserLoggedIn'
    ]
    methods.forEach( method => this[method] = this[method].bind(this) )

  }

  componentWillMount() {
    this._updateStateIfUserLoggedIn(this.props);
  }

  componentWillReceiveProps(props) {
    this._updateStateIfUserLoggedIn(props);
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

            <COD  fullName = {this.state.fullName}
                  phone = {this.state.phone}
                  address = {this.state.address}
                  email = {this.state.email}
                  updateName = {this.updateName}
                  updatePhone = {this.updatePhone}
                  updateEmail = {this.updateEmail}
                  updateAddress = {this.updateAddress}
            />

          </div>

          <footer className="w3-container" style={{paddingBottom: '16px'}} >
            <button className="w3-button w3-blue w3-right" onClick={this.next}> Next </button>
          </footer>

        </div>
      </div>
    )
  }

  updateName(fullName) {
    this.setState({ fullName })
  }

  updatePhone(phone) {
    this.setState({ phone })
  }

  updateAddress(address) {
    this.setState({ address })
  }

  updateEmail(email) {
    this.setState({ email })
  }

  next() {
    console.log(this.state)
  }

  _updateStateIfUserLoggedIn(props) {
    if (props.user) {
      const profile = props.user.profile || null;
      const fullName = profile.fullName || '';
      const phone = (profile.phone && profile.phone.length) > 0 ? profile.phone[0] : '';
      const email = (profile.email && profile.email.length) > 0 ? profile.email[0] : '';
      const address = profile.address || '';
      this.setState({ fullName, email, phone, address })
    }
  }

}

module.exports = ProcessPayment