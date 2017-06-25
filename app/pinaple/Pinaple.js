// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NavBar from './components/NavBar'
import * as actions from '../auth/auth.module'

const styles = {
  backgroundColor: 'white',
  position: 'relative',
  minHeight: '100vh',
}

class Pinaple extends Component {
  render() {
    return (
      <div style={styles}>
        <NavBar
          name={this.props.user.name}
          logout={this.props.actions.logout}
        />
        <div>THIS IS PINAPLE MAIN PAGE</div>
      </div>
    )
  }
}

Pinaple.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
}

const mapStateToProps = state => ({ user: state.auth.user })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Pinaple)
