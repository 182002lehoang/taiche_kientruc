// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoUy5UW0rUaIx9htvhukwHcuHtQAj3Wm4",
  authDomain: "taiche-f2e38.firebaseapp.com",
  projectId: "taiche-f2e38",
  storageBucket: "taiche-f2e38.appspot.com",
  messagingSenderId: "25725989362",
  appId: "1:25725989362:web:63fee7376f5841e26d3b6b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db,storage };