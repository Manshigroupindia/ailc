import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  getDocs,
  addDoc,
  deleteDoc
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAsvMvt9XY96YY9sc_GMxQqQwYrLh3wRz8",
  authDomain: "ailc-7adc3.firebaseapp.com",
  projectId: "ailc-7adc3",
  storageBucket: "ailc-7adc3.firebasestorage.app",
  messagingSenderId: "97863504169",
  appId: "1:97863504169:web:1df9fcf2942b0f964a6738",
  measurementId: "G-WBPE0N4ZRV"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export {
  app,
  auth,
  db,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  getDocs,
  addDoc,
  deleteDoc
};
