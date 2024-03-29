/* eslint-disable no-useless-catch */
import Cookies from 'js-cookie'
import firebase from './firebaseConfig'
const authService = {}
const tokenKey = 'token'

authService.handleAuthGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().languageCode = 'es_ES'
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((data) => data.user)
    .catch((err) => {
      throw err
    })
}

authService.handleAuthFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider()
  firebase.auth().languageCode = 'es_ES'
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((data) => data.user)
    .catch((err) => {
      throw err
    })
}

authService.handleLogout = () => {
  authService.removeToken()
  return firebase
    .auth()
    .signOut()
    .then((data) => data)
    .catch((err) => {
      throw err
    })
}

authService.handleLogin = (email, password) => {
  firebase.auth().languageCode = 'es_ES'
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => data.user)
    .catch((err) => {
      throw err
    })
}

authService.signup = async (email, password, firstName, lastName) => {
  try {
    firebase.auth().languageCode = 'es_ES'
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const user = await firebase.auth().currentUser
    await user.updateProfile({ displayName: `${firstName} ${lastName}` })
  } catch (err) {
    throw err
  }
}

authService.getToken = () => {
  return Cookies.get(tokenKey)
}

authService.setToken = (token) => {
  return Cookies.set(tokenKey, token)
}

authService.removeToken = () => {
  return Cookies.remove(tokenKey)
}

export default authService
