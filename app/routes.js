/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'

import Pinaple from './pinaple'

export default () => (
  <Switch>
    <Route path="/" component={Pinaple} onEnter={parseAuthHash} />
    <Route path="login" component={LoginPage} onEnter={parseAuthHash} />
    <Route path="signup" component={SignupPage} onEnter={parseAuthHash} />
  </Switch>
)
