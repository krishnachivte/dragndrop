// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGUPd0Zm6x2H7uxHpPo_v2sK_GoqouuAU",
  authDomain: "dragndrop-329d4.firebaseapp.com",
  projectId: "dragndrop-329d4",
  storageBucket: "dragndrop-329d4.appspot.com",
  messagingSenderId: "990694404525",
  appId: "1:990694404525:web:61f0b943881a7376a4b124"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
