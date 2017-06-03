import React from 'react'

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

const NavBar = () => (
  <div>
    <div style={styles.root}>
      <div style={styles.column}>
        <div style={styles.logo}>Pinaple</div>
      </div>
      <div style={styles.column}>
        <div>Login</div>
      </div>
    </div>
  </div>
)

export default NavBar
