import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBzjC01q9s1ZxvQ4Sp7HZi43c4VCjcu1X0',
  authDomain: 'e-widencja.firebaseapp.com',
  databaseURL: 'https://e-widencja.firebaseio.com',
  projectId: 'e-widencja',
  storageBucket: 'e-widencja.appspot.com',
  messagingSenderId: '410193121807',
  appId: '1:410193121807:web:f1fb77fa3fb5ad57c5c97a',
  measurementId: 'G-FSEDMVRYKB'
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();