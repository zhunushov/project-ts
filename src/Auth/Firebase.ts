// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmbGj80SwBptedffLOAuyxst1wkVJGdeI",
  authDomain: "progect-b29bb.firebaseapp.com",
  projectId: "progect-b29bb",
  storageBucket: "progect-b29bb.appspot.com",
  messagingSenderId: "153190440021",
  appId: "1:153190440021:web:438eb43c1fdf9f1cef48dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

