// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ2Cmf75hTHAdJwvHRoC0T7XbyVlz4x_0",
  authDomain: "my-mess-e50e9.firebaseapp.com",
  projectId: "my-mess-e50e9",
  storageBucket: "my-mess-e50e9.appspot.com",
  messagingSenderId: "440047560663",
  appId: "1:440047560663:web:dd585797e05cbc465d0d92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;