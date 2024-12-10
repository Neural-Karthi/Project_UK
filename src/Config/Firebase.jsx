import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, sendEmailVerification ,sendPasswordResetEmail} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXbxHA-DfVMzdWbnaV8PeQNYL5oFu0cIc",
  authDomain: "jobavenue-f51f5.firebaseapp.com",
  projectId: "jobavenue-f51f5",
  storageBucket: "jobavenue-f51f5.firebasestorage.app",
  messagingSenderId: "865583669317",
  appId: "1:865583669317:web:f4177c6c1dbd9e3447432c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { db, auth, signInWithPopup, provider, sendEmailVerification,sendPasswordResetEmail };
export default app;
