// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyDbMiLg2I0X3gtqhQI7hRgGsXQqFlnfDB4",
     authDomain: "campuscart-ade82.firebaseapp.com",
     projectId: "campuscart-ade82",
     storageBucket: "campuscart-ade82.firebasestorage.app",
     messagingSenderId: "1013650150202",
     appId: "1:1013650150202:web:428fef15c4706d37377603",
     measurementId: "G-96ECL9KBX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

// Export services
export { auth, storage, db };
export default app;