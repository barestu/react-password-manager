import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAQbkpmaGmacwc2LYttgVmrCsj1wMSPYSU",
  authDomain: "h8-phase3.firebaseapp.com",
  databaseURL: "https://h8-phase3.firebaseio.com",
  projectId: "h8-phase3",
  storageBucket: "h8-phase3.appspot.com",
  messagingSenderId: "488782270777"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const db = firebase.database()