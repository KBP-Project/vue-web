// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCB6Oz-A02QZCW6gihnjo0zXUw6BERMcP4",
    authDomain: "kbp-project-e2575.firebaseapp.com",
    projectId: "kbp-project-e2575",
    storageBucket: "kbp-project-e2575.appspot.com",
    messagingSenderId: "20356887114",
    appId: "1:20356887114:web:f401c33953a3880ca4acb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;