import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'



// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDU4t0s5qIwIhOnguM_o8uBVgm475kV4cA",
    authDomain: "auth-development-2e7b3.firebaseapp.com",
    projectId: "auth-development-2e7b3",
    storageBucket: "auth-development-2e7b3.appspot.com",
    messagingSenderId: "693490690247",
    appId: "1:693490690247:web:7713f62be6fe0633f176e2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// const app = firebase.initializeApp({
//
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID
// })

export const auth = app.auth()
export default app
