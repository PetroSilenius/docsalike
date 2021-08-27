import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyALad-Sh70oJiMzeD8kSWcVp_8RdUPvorQ',
  authDomain: 'docsalike.firebaseapp.com',
  projectId: 'docsalike',
  storageBucket: 'docsalike.appspot.com',
  messagingSenderId: '60302053960',
  appId: '1:60302053960:web:9b85ebd146e29ebdd0fe7d',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()

export { db }
