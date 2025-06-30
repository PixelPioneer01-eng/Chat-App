import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHfphJTDy0pviPjhD0Z6VhFCiKi79qMaY",
  authDomain: "my-chat-app-c6efe.firebaseapp.com",
  projectId: "my-chat-app-c6efe",
  storageBucket: "my-chat-app-c6efe.firebasestorage.app",
  messagingSenderId: "947357389107",
  appId: "1:947357389107:web:3f7c753d1ef1693080ee46",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
