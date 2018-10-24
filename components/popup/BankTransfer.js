"use strict"

import React, { Component } from 'react'

import { localeString } from '../../lib/utils'

import banks from '../../lib/banks'

class BankTransfer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bank: 'tcb',
      content: ''
    }

    this.selectBank = this.selectBank.bind(this);


  }

  componentDidMount() {
    this.prepareTransferContent(this.props)
  }

  componentWillReceiveProps(props) {
    this.prepareTransferContent(props)
  }

  render() {
    const display = this.props.show? 'block' : 'none'
    return (
      <div className="w3-modal" style={{ display }}>
        <div className="w3-modal-content w3-animate-top">

          <header className="w3-container "> 
            <span onClick={this.props.cancel} 
                  className="w3-button w3-display-topright w3-red">&times;</span>
            <h2 className="w3-text-green" style={{fontWeight: 'bold'}} > {this.props.title} </h2>
          </header>

          <div className="w3-container" style={{marginBottom: '32px'}} >
            <p className="w3-large w3-text-dark-grey" style={{fontWeight: 'bold'}}> Thank you for using our service </p>
            <p className="w3-large w3-text-dark-grey"> Please complete the payment process by a wire transfer as below information </p>

            <hr />

            <p>
              <label className="w3-text-blue-grey" style={{fontWeight: 'bold'}} >Bank</label>
              <select  className="w3-input w3-border" type="text" name='option' onChange={this.selectBank} >
                <option value="" disabled > Choose a bank for transfer </option>
                {
                  Object.keys(banks).map(bank => (
                    <option key={bank} value={bank}> {banks[bank].name} </option>
                  ))
                }
              </select>
            </p>
            
            <p>
              <label className="w3-text-blue-grey" style={{fontWeight: 'bold'}}>Account Info.</label>
              <textarea className="w3-input w3-border" type="text" rows="4"
                        value= {"Account Name: " + banks[this.state.bank].account.name + "\r\n" + "Account Number: " + banks[this.state.bank].account.number}
                        disabled
              />
            </p>

            <p>
              <label className="w3-text-blue-grey" style={{fontWeight: 'bold'}}> Amount: <span className='w3-text-red' style={{fontWeight: 'bold'}}> {localeString(this.state.amount)} {'\u20ab'} </span></label>
            </p>

            <p>
              <label className="w3-text-blue-grey" style={{fontWeight: 'bold'}}> Content </label>
              <textarea className="w3-large" style={{width:'100%'}} rows="4" value={this.state.content} disabled />
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

  selectBank(e) {
    const bank = e.target.value;
    this.setState({bank})
  }

  prepareTransferContent(props) {
    const invoice = props.invoice || {number: '', subTotal: 0};
    const user = props.user || {profile: {fullName: ''}};
    const content = `${user.profile.fullName || ''} pay for invoice number: ${invoice.number}`
    const amount = invoice.subTotal;
    this.setState({content, amount})
  }
}

module.exports = BankTransfer