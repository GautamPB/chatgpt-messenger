// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAjOqh9zjSxEclJlCZ6dhktWi6ZURu6lvM',
    authDomain: 'chat-gpt-messenger-d2593.firebaseapp.com',
    projectId: 'chat-gpt-messenger-d2593',
    storageBucket: 'chat-gpt-messenger-d2593.appspot.com',
    messagingSenderId: '869944820451',
    appId: '1:869944820451:web:3904be82b8ae47ca673bd6',
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
