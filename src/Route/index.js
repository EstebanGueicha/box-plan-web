import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import { navigationGuard } from './navigation-guard'
import { GuardProvider, GuardedRoute } from 'react-router-guards'
import { routes } from './routes'
import { Spinner } from 'react-bootstrap'

export default function Routes (props) {
  const [loading] = useState(false)

  return (
    loading ? <Spinner />
      : (
        <Router>
          <GuardProvider guards={[navigationGuard]}>
            <Switch>
              {routes.map((route, i) => (
                <GuardedRoute
                  key={i}
                  state={route.state}
                  path={route.path}
                  exact={route.exact}
                  meta={route.meta}
                  render={props => {
                    return <route.component {...props} routes={route.routes} meta={route.meta} />
                  }}
                />
              ))}
            </Switch>
          </GuardProvider>
        </Router>
      )
  )
}
