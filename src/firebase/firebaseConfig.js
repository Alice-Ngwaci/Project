// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, browserSessionPersistence } from 'firebase/auth';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBTojwL0o8ihHFIA5GxLZwj2Y7VmxZ7jVY",
    authDomain: "mhasibusacco-2bf05.firebaseapp.com",
    projectId: "mhasibusacco-2bf05",
    storageBucket: "mhasibusacco-2bf05.appspot.com",
    messagingSenderId: "428425338164",
    appId: "1:428425338164:web:5949d8172fcf8860689961",
    measurementId: "G-3MKJHPWMVJ"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = initializeAuth(app, { persistence: browserSessionPersistence });
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };