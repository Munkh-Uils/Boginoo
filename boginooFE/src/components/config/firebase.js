// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS1DM2uU1585I8amGZWbK4dwFX5b2mDxM",
  authDomain: "boginoo-1d000.firebaseapp.com",
  databaseURL: "https://boginoo-1d000-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "boginoo-1d000",
  storageBucket: "boginoo-1d000.appspot.com",
  messagingSenderId: "764964399635",
  appId: "1:764964399635:web:17143dfbec81491d4eede6",
  measurementId: "G-YLB2SKR76P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);