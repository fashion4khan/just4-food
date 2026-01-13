import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_JCVc6FfhDDgPJE2EgBx4M4AiBrcQEAY",
  authDomain: "just4food-135fd.firebaseapp.com",
  projectId: "just4food-135fd",
  storageBucket: "just4food-135fd.firebasestorage.app",
  messagingSenderId: "924492667527",
  appId: "1:924492667527:web:d05fed5e2bd3ce377fb622",
  measurementId: "G-EPYY2X44K9"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);