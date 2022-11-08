import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBBuW81FW6iTBXbb-DJQx-raoJWUvigBfw",
  authDomain: "in-work-7ff29.firebaseapp.com",
  projectId: "in-work-7ff29",
  storageBucket: "in-work-7ff29.appspot.com",
  messagingSenderId: "46600672456",
  appId: "1:46600672456:web:3fb9c684167669ff7741fd"
};


const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore()