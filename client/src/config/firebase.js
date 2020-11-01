import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDVDp7TE7Bzg0KKrvQUy1O9u9ARu9e3wno",
  authDomain: "wsc-socket.firebaseapp.com",
  databaseURL: "https://wsc-socket.firebaseio.com",
  projectId: "wsc-socket",
  storageBucket: "wsc-socket.appspot.com",
  messagingSenderId: "146468174485",
  appId: "1:146468174485:web:34ffbf9212601bca9af99c",
  measurementId: "G-8QRD7FLLV8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db