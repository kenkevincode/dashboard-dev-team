import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from '@/firebase/config'

export function authorize () {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.warn('User is logged in!')
    }
  })
}

export function signUp (email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export let refreshToken = ''

export async function signIn (email, password) {
  const data = await firebase.auth().signInWithEmailAndPassword(email, password)
  refreshToken = data.refreshToken
}

export async function signOut () {
  await firebase.auth().signOut()
  refreshToken = ''
}
