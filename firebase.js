import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUOQp7eDPFiVbaLAWA-oYs-MTezZ5t7Nk",
    authDomain: "whats--app.firebaseapp.com",
    databaseURL: "https://whats--app-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "whats--app",
    storageBucket: "whats--app.appspot.com",
    messagingSenderId: "736188889293",
    appId: "1:736188889293:web:0b99758a6c34e095195184",
    measurementId: "G-D7XFN8GMVB"
  };

const app=!firebase.apps.length ? firebase.initializeApp(firebaseConfig):firebase.app();

const db=app.firestore();
const auth=app.auth();
var provider = new firebase.auth.GoogleAuthProvider();

export { db,auth,provider};