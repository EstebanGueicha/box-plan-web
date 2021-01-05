const navigationGuard = async (to, from, next) => {
  const isAuthenticated = true
  if ((to.meta.name === 'login') && isAuthenticated) {
    next.redirect('/dashboard')
  }
  if (to.meta.name !== 'login' && to.meta.isPublic) {
    next()
  }
  if (to.meta.name !== 'login' && !to.meta.isPublic && !isAuthenticated) {
    next.redirect('/login')
  }

  next()
}

export { navigationGuard }
