// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEv7l477p7g3Y-dKCoPPXdHP4-M3639XE",
  authDomain: "pfe-mutual-fund.firebaseapp.com",
  projectId: "pfe-mutual-fund",
  storageBucket: "pfe-mutual-fund.appspot.com",
  messagingSenderId: "394731650296",
  appId: "1:394731650296:web:445e73dca3965fadf5cf0d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);