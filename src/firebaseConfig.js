import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// firebase init goes here
const config = {
  apiKey: "AIzaSyAM2Zlcc72x7peaQOwLfzuAMLnMEhKkQOw",
  authDomain: "moneytracker.wrenn.me",
  databaseURL: "https://money-tracker-65bde.firebaseio.com",
  projectId: "money-tracker-65bde",
  storageBucket: "money-tracker-65bde.appspot.com",
  messagingSenderId: "1064274161603",
  appId: "1:1064274161603:web:9d7e30cd51aa6497"
};
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()

export {
    db,
    auth,
    firebase
}