// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "multai-51fc1.firebaseapp.com",
  projectId: "multai-51fc1",
  storageBucket: "multai-51fc1.firebasestorage.app",
  messagingSenderId: "587285396998",
  appId: "1:587285396998:web:20bdb692828a867b510d87",
  measurementId: "G-HDLX01MVHK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
