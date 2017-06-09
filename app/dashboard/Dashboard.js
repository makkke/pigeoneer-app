// @flow
import React, { Component } from 'react'
import { TextField, RaisedButton } from 'material-ui'

import NavBar from '../components/NavBar'
// import SideBar from '../components/SideBar'
import { login, signup, loginWithGoogle, loginWithGithub } from '../utils/auth'

const styles = {
  backgroundColor: 'white',
  position: 'relative',
  minHeight: '100vh',
}

class Dashboard extends Component {

  state = {
    email: 'benny@abcd.com',
    password: 'test123',
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
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <TextField
          name="password"
          floatingLabelText="Password"
          type="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <RaisedButton onClick={this.login}>Log In</RaisedButton>
        <RaisedButton onClick={this.signup}>Sign Up</RaisedButton>
        <RaisedButton onClick={() => loginWithGoogle()}>Login with Google</RaisedButton>
        <RaisedButton onClick={() => loginWithGithub()}>Login with Github</RaisedButton>
      </div>
    )
  }
}

export default Dashboard
