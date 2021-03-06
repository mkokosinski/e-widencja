import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const isLocal = window.location.hostname === 'localhost';
// const isLocal = false;

if (isLocal) {
  config = {
    databaseURL: 'http://localhost:8080?ns=emulatorui',
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  };
}

firebase.initializeApp(config);
const secondaryApp = firebase.initializeApp(config, 'secondary');

export const auth = firebase.auth();
export const authOtherUser = secondaryApp.auth();

export const firestore = firebase.firestore();

export const firestoreFunctions = firebase.firestore;

if (isLocal) {
  auth.useEmulator('http://localhost:9099');
  authOtherUser.useEmulator('http://localhost:9099');
  firestore.useEmulator('localhost', 8080);
}
