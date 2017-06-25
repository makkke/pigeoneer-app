import React from 'react'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '250px',
    height: '100%',
    padding: '0 18px',
    boxShadow: '2px 0 0 0 rgba(68, 68, 68, 0.35)',
    backgroundColor: '#01B1FF',
    position: 'fixed',
    zIndex: 1,
  },
}

const NavBar = () => (
  <div>
    <div style={styles.root}>
      <div>SIDEBAR</div>
    </div>
  </div>
)

export default NavBar
