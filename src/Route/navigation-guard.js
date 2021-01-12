import authService from '../Service/auth'

const navigationGuard = async (to, from, next) => {
  const isAuthenticated = authService.getToken()
  if ((to.meta.name === 'login' || to.meta.name === 'home') && isAuthenticated) {
    next.redirect('/dashboard')
  }

  if (to.meta.name !== 'login' && !to.meta.isPublic && !isAuthenticated) {
    next.redirect('/login')
  }

  next()
}

export { navigationGuard }
