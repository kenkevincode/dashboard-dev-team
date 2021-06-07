import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from '@/firebase/config'

export function init () {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  return new Promise((resolve /* , reject */) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return resolve()
      }
    })
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
