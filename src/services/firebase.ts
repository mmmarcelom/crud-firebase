// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcvChG7msEXA2-7fdeEn_qRz-I7ygkFwM",
  authDomain: "crud-8a905.firebaseapp.com",
  projectId: "crud-8a905",
  storageBucket: "crud-8a905.firebasestorage.app",
  messagingSenderId: "963044332372",
  appId: "1:963044332372:web:2586d361412db9a365eec1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 