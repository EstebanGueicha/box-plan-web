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
import { setUserData } from '../Redux/actions'
import { useDispatch } from 'react-redux'
import userService from '../Service/user'

export default function Routes (props) {
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      try {
        await firebase.auth().onAuthStateChanged(user => setUserInfo(user))
        if (userInfo) {
          const { displayName, email } = userInfo
          const user = await userService.loginWithSocialCredentials({ name: displayName, lastName: 'lastName', mail: email })
          dispatch(setUserData(user))
        }
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    getUser()
  }, [dispatch, userInfo])

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
