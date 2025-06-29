import { initializeApp,getApp,getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyD1_1FM1to2Ib62vuD0fLT2a0Fxv02fbV4",
    authDomain: "interviewer-749cf.firebaseapp.com",
    projectId: "interviewer-749cf",
    storageBucket: "interviewer-749cf.firebasestorage.app",
    messagingSenderId: "262664749703",
    appId: "1:262664749703:web:e69b0f72cbffac8bdbae22",
    measurementId: "G-YYYD7Y6QK5"
};

// Initialize Firebase
const app =!getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);