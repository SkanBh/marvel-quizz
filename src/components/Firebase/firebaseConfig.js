import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from 'firebase/firestore'




const config = {
    apiKey: "AIzaSyCDMyMuwfJpFRP8V5MAakRwfLyPqrcQcwQ",
    authDomain: "marvel-quiz-3f11f.firebaseapp.com",
    projectId: "marvel-quiz-3f11f",
    storageBucket: "marvel-quiz-3f11f.appspot.com",
    messagingSenderId: "963062296334",
    appId: "1:963062296334:web:f990e9b484ce528d3d315f"
  };

const app = initializeApp(config);
export const auth = getAuth(app)

export const firestore = getFirestore()

export const user = uid => doc(firestore, `users/${uid}`)

