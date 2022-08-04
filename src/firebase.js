import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBFnd7r51elcxaIuFreNTp7itJSlR5bgiY',
  authDomain: 'foodcourt-41c1a.firebaseapp.com',
  projectId: 'foodcourt-41c1a',
  storageBucket: 'foodcourt-41c1a.appspot.com',
  messagingSenderId: '644727679391',
  appId: '1:644727679391:web:52b158b365e7232490f5aa',
  measurementId: 'G-KK75RJ67X4',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
