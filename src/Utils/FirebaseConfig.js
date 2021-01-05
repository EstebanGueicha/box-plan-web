// import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/storage' // for storage
// import 'firebase/database';    // for realtime database
import 'firebase/firestore' // for cloud firestore
// import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions' // for cloud functions

import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
