import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 
firebase.initializeApp({
  apiKey: "AIzaSyCmbGj80SwBptedffLOAuyxst1wkVJGdeI",
  authDomain: "progect-b29bb.firebaseapp.com",
  projectId: "progect-b29bb",
  storageBucket: "progect-b29bb.appspot.com",
  messagingSenderId: "153190440021",
  appId: "1:153190440021:web:438eb43c1fdf9f1cef48dc"
})
const auth = firebase.auth()
const  db = firebase.firestore()
export {auth, db, firebase}

