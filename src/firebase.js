import { initializeApp } from "firebase/app";

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

export const app = initializeApp(firebaseConfig)