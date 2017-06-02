// @flow
import React, { Component } from 'react'
import Radium from 'radium'
import { TextField, RaisedButton } from 'material-ui'

import NavBar from '../components/NavBar'
// import SideBar from '../components/SideBar'
import { login, signup, loginWithGoogle } from '../utils/auth'

const styles = {
  backgroundColor: 'white',
  position: 'relative',
  minHeight: '100vh',
}

class Dashboard extends Component {

  state = {
    email: '',
    password: '',
    loading: false,
    errors: {},
  }

  handleInputChange = (event) => {
    const { errors } = this.state
    const value = event.target.value.trim()
    const field = event.target.name

    errors[field] = null
    errors.login = null

    this.setState({ [field]: value, errors })
  }

  login = () => {
    // TODO: add validation

    // login
    try {
      const { email, password } = this.state
      this.setState({ loading: true })
      login(email, password)
      // await this.props.actions.login(this.state.email, this.state.password)
    } catch (err) {
      this.setState({ errors: { login: true }, loading: false })
    }
  }

  signup = () => {
    try {
      const { email, password } = this.state
      this.setState({ loading: true })
      signup(email, password)
    } catch (err) {
      this.setState({ errors: { login: true }, loading: false })
    }
  }

  render() {
    return (
      <div style={styles}>
        <NavBar />
        <TextField
          name="email"
          floatingLabelText="Email"
          onChange={this.handleInputChange}
        />
        <TextField
          name="password"
          floatingLabelText="Password"
          type="password"
          onChange={this.handleInputChange}
        />
        <RaisedButton onClick={this.login}>Log In</RaisedButton>
        <RaisedButton onClick={this.signup}>Sign Up</RaisedButton>
        <RaisedButton onClick={() => loginWithGoogle}>Login with Google</RaisedButton>
      </div>
    )
  }
}

export default Radium(Dashboard)
