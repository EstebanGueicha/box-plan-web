import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import { navigationGuard } from './navigation-guard'
import { GuardProvider, GuardedRoute } from 'react-router-guards'
import { routes } from './routes'
import { Spinner } from 'react-bootstrap'
import firebase from '../Service/firebaseConfig'

export default function Routes (props) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    firebase.auth().onAuthStateChanged(user => console.log(user))
    setLoading(false)
  }, [])

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
