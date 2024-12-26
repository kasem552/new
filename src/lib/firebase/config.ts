import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDSkf2SgpZVNOXuXoCD_MNoj-lYz_Bl11Y",
  authDomain: "canaan-media.firebaseapp.com",
  projectId: "canaan-media",
  storageBucket: "canaan-media.firebasestorage.app",
  messagingSenderId: "340131241395",
  appId: "1:340131241395:web:7a7624322592a9bb707fc6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser doesn\'t support persistence.');
  }
});

export { app };