/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Switch, Route, HashRouter as Router } from 'react-router-dom'

import Pinaple from './pinaple'
import Login from './auth/Login'
import Signup from './auth/Signup'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Pinaple} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </Router>
)
