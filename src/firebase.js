// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8Dpha_JcGGj-8JYqs-94OYhb4VsV_Kpg",
  authDomain: "url-shortener-ed126.firebaseapp.com",
  projectId: "url-shortener-ed126",
  storageBucket: "url-shortener-ed126.appspot.com",
  messagingSenderId: "860487718295",
  appId: "1:860487718295:web:50a82a5ca602786f3ca0d2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)