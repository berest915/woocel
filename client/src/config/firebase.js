import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhQVSm-7H66z-t7-cgO93TBqE8gteWI6A",
  authDomain: "woocel-v0.firebaseapp.com",
  databaseURL: "https://woocel-v0.firebaseio.com",
  projectId: "woocel-v0",
  storageBucket: "woocel-v0.appspot.com",
  messagingSenderId: "970868840347",
  appId: "1:970868840347:web:ef2f900a5ac58e95e2333e",
  measurementId: "G-TB0QVBYPCX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider, firebaseApp }
export default db