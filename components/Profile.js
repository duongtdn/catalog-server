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

    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      displayName: '',
      gender: '',
      email:[],
      address: '',
      phone: [],
      birthday: ''
    }
    
    this.originProfile ={ ...this.state };

    this.updateProfile = this.updateProfile.bind(this)
    this.resetState = this.resetState.bind(this)

  }

  componentWillMount() {
   this._updateStateFromProps(this.props.profile)
  }

  _updateStateFromProps(props) {
    const _psw = {password: '', newPassword: '', retypePassword: ''}
    this._getOriginProfile(props).setState({...this.originProfile, ..._psw})
  }

  _getOriginProfile(props) {
    for (let key in this.originProfile) {
      if (props[key]) {
        this.originProfile[key] = props[key]
      }
    }
    return this
  }

  _updateStateToOriginProfile() {
    for (let key in this.originProfile) {
      this.originProfile[key] = this.state[key]
    }
    this.setState({}) // force render
    return this
  }

  _isStateMatchOrigin() {
    return Object.keys(this.originProfile).every( key => this.state[key] === this.originProfile[key])
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
              <button  className={`w3-bar-item w3-button w3-border-bottom`} onClick={() => this.props.onSelectTab('password')}>
                Password
              </button>
            </div>
          </div>
          
          <hr />

          {this[`render${this._titleCase(this.props.tab)}`]()}

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
                    value={this.state.lastName}
                    onChange={this.getTyped('lastName')}
            />
          </span>

          <span className="w3-mobile" style={{width: '31%', display: 'inline-block', marginRight: '16px'}}>
            <label>Middle Name</label>
            <input className="w3-input w3-border"
                    type="text"
                    value={this.state.middleName}
                    onChange={this.getTyped('middleName')}
            />
          </span>

          <span className="w3-mobile" style={{width: '31%', display: 'inline-block'}}>
            <label>First Name</label>
            <input className="w3-input w3-border"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.getTyped('firstName')}
            />
          </span>
        </p>

        <p>
          <label style={{marginRight: '4px'}}> Gender: </label>

          <input className="w3-radio" style={{marginRight: '4px'}} type="radio" name="gender" value="male" 
                 checked={this.state.gender === 'male'} 
                 onChange = { () => this.setState({gender: 'male'}) }
          />
          <label>Male</label>

          <label style={{marginRight: '8px'}} />

          <input className="w3-radio" style={{marginRight: '4px'}} type="radio" name="gender" value="female" 
                 checked={this.state.gender === 'female'}
                 onChange = { () => this.setState({gender: 'female'}) }
          />
          <label>Female</label>
        </p>

        <p>
          <label>Birthday</label>
          <input  className="w3-input w3-border"
                  type="text"
                  style={{width: '31%'}}
                  placeholder="dd/mm/yyyy"
                  value={this.state.birthday}
                  onChange = {this.getTyped('birthday')}
          />
        </p>

        <p>
          <label>Display Name</label>
          <input  className="w3-input w3-border"
                  type="text"
                  style={{width: '31%'}}
                  value={this.state.displayName}
                  onChange = {this.getTyped('displayName')}
          />
        </p>

        <p>
          <label>Email</label>
          {
            this.state.email.map((email, index) => {
              return (
                <span  key = {index} style={{display: 'block', marginBottom: '4px'}}>
                  <input  className = "w3-input w3-border"
                          type = "text"
                          value = {email}
                          disabled = {index === 0}
                          onChange = {this.getTyped('email', index)}
                  />
                  <label  className = "w3-text-blue" 
                          style = {{cursor: 'pointer', display: (index === this.state.email.length - 1) ? 'inline' : 'none'}} 
                          onClick = {this.addMoreBox('email')} > 
                    + Add more email 
                  </label>
                </span>
              )

            })
          }
        </p>

        <p>
          <label>Phone</label>
          {
            this.state.phone.map((phone, index) => {
              return (
                <span  key = {index} style={{display: 'block', marginBottom: '4px'}}>
                  <input  className = "w3-input w3-border"
                          type = "text"
                          value = {phone}
                          onChange = {this.getTyped('phone', index)}
                  />
                  <label  className = "w3-text-blue" 
                          style = {{cursor: 'pointer', display: (index === this.state.phone.length - 1) ? 'inline' : 'none'}} 
                          onClick = {this.addMoreBox('phone')} > 
                    + Add more phone number 
                  </label>
                </span>
              )

            })
          }
        </p>

        <p>
          <label>Address</label>
          <input  className="w3-input w3-border"
                  type="text"
                  value={this.state.address}
                  onChange = {this.getTyped('address')}
          />
        </p>

        <hr />

        <p>
          <button className="w3-button w3-blue w3-hover-blue w3-hover-opacity" onClick={this.updateProfile} disabled={this._isStateMatchOrigin()} > Save </button>
          <label style={{marginRight: '8px'}} />
          <button className="w3-button" onClick={this.resetState} disabled={this._isStateMatchOrigin()} > Reset </button>
        </p>
            
      </div>
    )
  }

  renderPassword() {
    return (
      <div>

        <p>
          <label>Current Password</label>
            <input className="w3-input w3-border"
                    type="password"
                    value = {this.state.password}
                    onChange = {this.getTyped('password')}
            />
        </p>

        <p>
          <label>New Password</label>
            <input className="w3-input w3-border"
                    type="password"
                    value = {this.state.newPassword}
                    onChange = {this.getTyped('newPassword')}
            />
        </p>

        <p>
          <label>Retype New Password</label>
            <input className="w3-input w3-border"
                    type="password"
                    value = {this.state.retypePassword}
                    onChange = {this.getTyped('retypePassword')}
            />
        </p>

        <hr />

        <p>
          <button className="w3-button w3-blue w3-hover-blue w3-hover-opacity"> Update Password </button>
          <label style={{marginRight: '8px'}} />
          <button className="w3-button"> Cancel </button>
        </p>

      </div>
    )
  }

  _titleCase(str) {
    return str.charAt(0).toUpperCase() + str.substring(1)
  }

  getTyped(target, index) {
    if (index !== undefined) {
      return (evt) => {
        const state = {}
        state[target] = [...this.state[target]]
        state[target][index] = evt.target.value
        this.setState(state)
      }
    } else {
      return (evt) => {
        const state = {}
        state[target] = evt.target.value
        this.setState(state)
      }
    }
    
  }

  updateProfile() {
    const profile = {...this.state}
    profile.phone = this.state.phone.filter(phone => phone.length > 0)
    profile.email = this.state.email.filter(email => email.length > 0)
    this.props.update && this.props.update(profile, (err) => {
      this._updateStateToOriginProfile()
    });
  }

  resetState() {
    this._updateStateFromProps(this.props.profile)
  }

  addMoreBox(box) {
    return (evt) => {
      const _state = {}
      const _container = [...this.state[box]]
      _container.push('');
      _state[box] = _container;
      this.setState({ ..._state })
    }
  }
}

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 'profile'
    }

    this.update = this.update.bind(this)
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
               profile = {user.profile}
               update = {this.update}
          />
        </div>
      </div>
    )
  }

  update(profile, done) {
    console.log('Updating Profile...')
    console.log(profile)
    done(null)
  }

}

module.exports = bindUserProvider(Profile)