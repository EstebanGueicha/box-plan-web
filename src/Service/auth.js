import Cookies from 'js-cookie'
import firebase from './firebaseConfig'
const authService = {}
const tokenKey = 'token'

authService.handleAuthGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().languageCode = 'es_ES'
  return firebase.auth().signInWithPopup(provider)
    .then(data => data)
    .catch(err => { throw err })
}

authService.handleAuthFacebook = () => {
  var provider = new firebase.auth.FacebookAuthProvider()
  firebase.auth().languageCode = 'es_ES'
  return firebase.auth().signInWithPopup(provider)
    .then(data => data.use)
    .catch(err => { throw err })
}

authService.handleLogout = () => {
  authService.removeToken()
  return firebase.auth().signOut()
    .then(data => data)
    .catch(err => { throw err })
}

authService.handleLogin = (email, password) => {
  firebase.auth().languageCode = 'es_ES'
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => data)
    .catch(err => { throw err })
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
