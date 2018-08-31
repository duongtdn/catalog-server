"use strict"

import React, { Component } from 'react'

const banks = {
  tcb: {
    name: 'Techcombank HCMC',
    account: '1111-2222-3333-4455'
  },
  vcb: {
    name: 'Vietcombank HCMC',
    account: '6666-7777-8888-9900'
  }
}

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
            <h2 style={{fontWeight: 'bold'}} > Success </h2>
          </header>

           <br />

          <div className="w3-container" style={{marginBottom: '32px'}} >
            <p> You have enrolled to this course. Please complete the payment process by a wire transfer as below information </p>

            <br />

            <p>
              <label>Bank</label>
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
              <label>Account No.</label>
              <input className="w3-input w3-border" type="text" value={banks[this.state.bank].account} disabled/>
            </p>

            <hr />

            <p>
              <label> Amount: <span className='w3-text-red' style={{fontWeight: 'bold'}}> 500,000 </span></label>
            </p>

            <p>
              <label> Content </label>
              <textarea style={{width:'100%'}} value={this.state.content} disabled />
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

  prepareTransferContent() {
    const content = 'tester@team.com Payment for invoice number: 1881321'
    this.setState({content})
  }
}

module.exports = BankTransfer