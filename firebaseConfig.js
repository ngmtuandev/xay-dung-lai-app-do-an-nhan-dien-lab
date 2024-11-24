import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config từ Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBWQUEubB_VjgH5xYpktgVac2uXbsSNJtc",
  authDomain: "ok-travel-vn.firebaseapp.com",
  projectId: "ok-travel-vn",
  storageBucket: "ok-travel-vn.firebasestorage.app",
  messagingSenderId: "451717733640",
  appId: "1:451717733640:web:c95ef55dd0c4d740c720bd",
  measurementId: "G-F0265EJ3GK",
};

// Khởi tạo Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Lấy Firebase Auth
export const auth = getAuth(firebaseApp);
export default firebaseApp;
