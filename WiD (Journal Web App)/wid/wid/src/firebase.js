// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbVj7TFawYcwKz-A-j8ThxCmCg0QntH8M",
  authDomain: "healthy-feat-373100.firebaseapp.com",
  projectId: "healthy-feat-373100",
  storageBucket: "healthy-feat-373100.appspot.com",
  messagingSenderId: "1072114462322",
  appId: "1:1072114462322:web:7be988ee13bd3f9eb35ceb",
  measurementId: "G-W5QM9441Z6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);