// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHvLf--YHoyGsO59SlYhiVTh-SBdGKBYg",
  authDomain: "gr-portal.firebaseapp.com",
  projectId: "gr-portal",
  storageBucket: "gr-portal.firebasestorage.app",
  messagingSenderId: "206763025354",
  appId: "1:206763025354:web:ec0080d1f0127a1c51a533",
  measurementId: "G-6NM23BGJYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
