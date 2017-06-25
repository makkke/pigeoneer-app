import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import PropTypes from 'prop-types'

import { history } from '../../../store/configureStore'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    padding: '0 18px',
    boxShadow: '0 2px 4px 0 rgba(68, 68, 68, 0.35)',
    backgroundColor: '#01B1FF',
  },
  column: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    margin: 'auto 0',
  },
}

class NavBar extends Component {
  state = {
    open: false,
  }

  handleUserDropdown = (event) => {
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  handleLogout = () => {
    this.props.logout()
    history.push('/')
  }

  render = () => (
    <div style={styles.root}>
      <div style={styles.column}>
        <div style={styles.logo}>PINAPLE</div>
      </div>
      {
        this.props.name ?
          <div style={styles.column}>
            <RaisedButton
              onTouchTap={this.handleUserDropdown}
              label={this.props.name}
            />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleRequestClose}
              animation={PopoverAnimationVertical}
            >
              <Menu>
                <MenuItem primaryText="Logout" onClick={this.handleLogout} />
              </Menu>
            </Popover>
          </div> :
          <RaisedButton
            onTouchTap={() => history.push('/login')}
            label="Login"
          />
      }

    </div>
  )
}

NavBar.contextTypes = {
  name: PropTypes.string,
  logout: PropTypes.func,
}

export default NavBar
