import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from '@/firebase/config'

export function init () {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.warn('User is logged in!')
    }
  })
}

export function signUp (email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export function getRefreshToken () {
  return firebase.auth().currentUser.refreshToken
}

export function signIn (email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export function signOut () {
  return firebase.auth().signOut()
}
