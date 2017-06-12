// @flow
import React, { Component } from 'react'
import { TextField, RaisedButton } from 'material-ui'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { signup } from '../utils/auth'
import { history } from '../store/configureStore'
import * as actions from './auth.module'

const styles = {
  root: {
    backgroundColor: 'white',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}

class Signup extends Component {

  state = {
    email: 'benny@abcd.com',
    password: 'test123',
    loading: false,
    errors: {},
  }

  handleInputChange = (event) => { // eslint-disable-line
    const { errors } = this.state
    const value = event.target.value.trim()
    const field = event.target.name

    errors[field] = null
    errors.login = null

    this.setState({ [field]: value, errors })
  }

  handleSignup = async () => {
    try {
      const { email, password } = this.state
      this.setState({ loading: true })
      this.props.actions.signup(email, password)
      history.push('/login')
    } catch (err) {
      this.setState({ errors: { login: true }, loading: false })
    }
  }

  render() {
    return (
      <div style={styles.root}>
        THIS IS SIGN UP PAGE
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
        <RaisedButton onClick={this.handleSignup}>Sign Up</RaisedButton>
      </div>
    )
  }
}

Signup.contextTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
}

const mapStateToProps = state => ({ name: state.auth.name })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
