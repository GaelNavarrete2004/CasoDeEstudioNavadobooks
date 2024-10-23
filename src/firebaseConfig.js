// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5enkfEpzflgLjgf_4VfPQNvns4xlwk4A",
  authDomain: "navadobooks.firebaseapp.com",
  projectId: "navadobooks",
  storageBucket: "navadobooks.appspot.com",
  messagingSenderId: "680138597176",
  appId: "1:680138597176:web:ac62d53c61e98ae7d057cd",
  measurementId: "G-GR3NJQ851R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const storage = getStorage(app);