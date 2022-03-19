import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_ID,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_ID,
  appId: process.env.REACT_APP_FB_APPID,
});

const db = firebase.firestore();
const auth = firebase.auth();

export { app, db, auth };
