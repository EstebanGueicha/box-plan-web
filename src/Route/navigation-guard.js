import firebase from '../Service/firebaseConfig'

const navigationGuard = async (to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if ((to.meta.name === 'login' || to.meta.name === 'home') && user) {
      next.redirect('/dashboard')
    }

    if (to.meta.name !== 'login' && !to.meta.isPublic && !user) {
      next.redirect('/ingresar')
    }

    next()
  })
}

export { navigationGuard }
