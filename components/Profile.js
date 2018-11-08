"use strict"

import React, { Component } from 'react'

import { bindUserProvider  } from '@stormgle/react-user'

import Header from './Header'

class SideBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="w3-sidebar w3-bar-block w3-border-right w3-hide-small" style={{background: 'none', width: '200px'}}>
        <h3 className="w3-bar-item">Menu</h3>

        <button  className={`w3-bar-item w3-button w3-border-bottom ${this.isActive('profile')? 'w3-blue': ''}`} 
                 onClick={() => this.props.onSelectTab('profile')} 
        >
          Profile
        </button> 

        <button  className={`w3-bar-item w3-button w3-border-bottom ${this.isActive('contact')? 'w3-blue': ''}`}
                 onClick={() => this.props.onSelectTab('contact')} 
        >
          Contact
        </button>

        <button  className={`w3-bar-item w3-button w3-border-bottom ${this.isActive('password')? 'w3-blue': ''}`}
                 onClick={() => this.props.onSelectTab('password')} 
        >
          Password
        </button>  

      </div>
    )
  }

  isActive(tab) {
    return this.props.active === tab
  }
}

class Tab extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="w3-row">

        <div className="w3-col  w3-hide-small" style={{width: '200px', height: '10px'}} /> 

        <div className="w3-rest w3-container">

          <div className="w3-dropdown-hover" style={{background:'none'}}>
            <h3> {this.props.tab.toUpperCase()} <i className="fa fa-caret-down w3-hide-medium w3-hide-large" /> </h3>
            <div className="w3-dropdown-content w3-bar-block w3-card-4 w3-hide-medium w3-hide-large" style={{backgroundColor: '#f1f1f1'}}>
              <button  className={`w3-bar-item w3-button w3-border-bottom`} onClick={() => this.props.onSelectTab('profile')}>
                Profile
              </button> 
              <button  className={`w3-bar-item w3-button w3-border-bottom`} onClick={() => this.props.onSelectTab('contact')}>
                Contact
              </button> 
              <button  className={`w3-bar-item w3-button w3-border-bottom`} onClick={() => this.props.onSelectTab('password')}>
                Password
              </button>
            </div>
          </div>
          
          <hr />

          {this.renderProfile()}

        </div>
      </div>
    )
  }

  renderProfile() {
    return (
      <div>
        <p> 
          <span className="w3-mobile" style={{width: '31%', display: 'inline-block', marginRight: '16px'}}>
            <label>Last Name</label>
            <input className="w3-input w3-border"
                    type="text"
            />
          </span>

          <span className="w3-mobile" style={{width: '31%', display: 'inline-block', marginRight: '16px'}}>
            <label>Middle Name</label>
            <input className="w3-input w3-border"
                    type="text"
            />
          </span>

          <span className="w3-mobile" style={{width: '31%', display: 'inline-block'}}>
            <label>First Name</label>
            <input className="w3-input w3-border"
                    type="text"
            />
          </span>
        </p>

        <p>
          <label style={{marginRight: '4px'}}> Gender: </label>

          <input className="w3-radio" style={{marginRight: '4px'}} type="radio" name="gender" value="male" />
          <label>Male</label>

          <label style={{marginRight: '8px'}} />

          <input className="w3-radio" style={{marginRight: '4px'}} type="radio" name="gender" value="female" />
          <label>Female</label>
        </p>
        
        <hr />

        <p>
          <button className="w3-button w3-blue"> Save </button>
          <label style={{marginRight: '8px'}} />
          <button className="w3-button"> Reset </button>
        </p>
            
      </div>
    )
  }

}

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 'profile'
    }
  }

  render() {
    const user = this.props.user
    return (
      <div className="sg-content">
        <Header user = {user} />
        <div className="w3-container w3-margin">
          <SideBar active = {this.state.tab}
                   onSelectTab = { (tab) => this.setState({ tab }) }
          />
          <Tab tab = {this.state.tab} 
               onSelectTab = { (tab) => this.setState({ tab }) }
          />
        </div>
      </div>
    )
  }

}

module.exports = bindUserProvider(Profile)