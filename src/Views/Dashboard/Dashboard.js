import React, { useEffect, useState } from 'react'
import { Switch } from 'react-router-dom'
import { GuardedRoute, GuardProvider } from 'react-router-guards'
import { navigationGuard } from '../../Route/navigation-guard'
import firebase from '../../Service/firebaseConfig'
import userService from '../../Service/user'
import { setUserData } from '../../Redux/actions'
import './Dashboard.scss'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

export const Dashboard = ({ routes }) => {
  const [user, setUser] = useState(null)
  const { id } = useSelector((state) => state.user, shallowEqual) || ''
  const dispatch = useDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setUser(user))
    const getUser = async () => {
      try {
        const { displayName, email, photoURL } = user
        const userData = await userService.loginWithSocialCredentials({
          name: displayName,
          mail: email,
        })
        userData.avatar = photoURL
        dispatch(setUserData(userData))
      } catch (err) {
        console.log(err)
      }
    }
    if (user && !id) {
      getUser()
    }
  }, [dispatch, user, id])

  return (
    <div className="background-container">
      <GuardProvider guards={[navigationGuard]}>
        <Switch>
          {routes.map((route, i) => (
            <GuardedRoute
              key={i}
              path={route.path}
              exact={route.exact}
              meta={route.meta}
              render={(props) => {
                return <route.component {...props} routes={route.routes} meta={route.meta} />
              }}
            />
          ))}
        </Switch>
      </GuardProvider>
    </div>
  )
}
