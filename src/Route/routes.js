import { Login } from '../Views/Login'
import { Home } from '../Views/Home'
import { Dashboard } from '../Views/Dashboard'
import { PageNotFound } from '../Views/PageNotFound'
import { SelectUserType } from '../Views/Dashboard/SelectUserType'
import { MainDashboard } from '../Views/Dashboard/MainDashboard'

export const routes = [
  {
    path: '/ingresar',
    component: Login,
    exact: true,
    meta: { isPublic: true, name: 'login' }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { isPublic: false },
    routes: [
      {
        path: '/dashboard',
        component: SelectUserType,
        meta: { isPublic: false, name: 'coach' },
        exact: true
      },
      {
        path: '/dashboard/:id',
        component: MainDashboard,
        meta: { isPublic: false },
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
    meta: { isPublic: true, name: 'home' },
    exact: true
  },
  {
    path: '*',
    component: PageNotFound,
    meta: { isPublic: true },
    exact: true
  }
]
