import firebase from 'firebase/app'
// import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  // measurementId: process.env.REACT_APP_MEASUREMENTID,
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
