import { Login } from '../Views/Login'
import { Home } from '../Views/Home'
import { Dashboard } from '../Views/Dashboard'
import { PageNotFound } from '../Views/PageNotFound'
import { SelectUserType } from '../Views/SelectUserType'

export const routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
    meta: { isPublic: true, name: 'login' }
  },
  {
    path: '/dashboard',
    component: SelectUserType,
    meta: { isPublic: false },
    routes: [
      {
        path: '/dashboard/coach',
        component: Dashboard,
        meta: { isPublic: false, name: 'coach' },
        exact: true
      },
      {
        path: '/dashboard/athlete',
        component: Dashboard,
        meta: { isPublic: false, name: 'athlete' },
        exact: true
      },
      {
        path: '*',
        component: PageNotFound,
        meta: { isPublic: true },
        exact: true
      }
    ]
  },
  {
    path: '/',
    component: Home,
    meta: { isPublic: true, name: 'Home' },
    exact: true
  },
  {
    path: '*',
    component: PageNotFound,
    meta: { isPublic: true },
    exact: true
  }
]
