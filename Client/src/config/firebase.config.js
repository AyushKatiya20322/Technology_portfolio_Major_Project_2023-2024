import {getApp, getApps, initializeApp} from "firebase/app"
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"






const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSEAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-QT2PWZB18D"
  };
  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const storage = getStorage (app);
const db= getFirestore(app)  ;
  export  {app, storage, db};  