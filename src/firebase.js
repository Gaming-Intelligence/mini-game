// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQWWQ81qn5b2tXB4rLg2QsQK_SUsCCz4I",
  authDomain: "telegram-bot-c6b03.firebaseapp.com",
  databaseURL: "https://telegram-bot-c6b03-default-rtdb.firebaseio.com",
  projectId: "telegram-bot-c6b03",
  storageBucket: "telegram-bot-c6b03.appspot.com",
  messagingSenderId: "362103607768",
  appId: "1:362103607768:web:5ce17bef6e21efb3f0a2ad",
  measurementId: "G-2TSYNNBJ3N"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();