// @flow
import React, { Component } from 'react'
import { TextField, RaisedButton } from 'material-ui'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import * as actions from './auth.module'
import { history } from '../store/configureStore'

const styles = {
  root: {
    backgroundColor: 'white',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}

class Login extends Component {
  state = {
    email: 'slava@makkke.com',
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

  login = async () => {
    // login
    try {
      const { email, password } = this.state
      this.setState({ loading: true })
      await this.props.actions.login(email, password)
      history.push('/')
    } catch (err) {
      this.setState({ errors: { login: true }, loading: false })
    }
  }

  render() {
    return (
      <div style={styles.root}>
        THIS IS LOGIN PAGE
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
        <Link to="/signup">Sign up</Link>
      </div>
    )
  }
}

Login.contextTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
