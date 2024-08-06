//import * as firebase from 'firebase';
//import { getAnalytics } from "firebase/analytics";
//import 'firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyDSqD2Zj2FpwzVEdSBcoyNAanZ_XpRbKFU",
    authDomain: "newappd-3a77c.firebaseapp.com",
    projectId: "newappd-3a77c",
    storageBucket: "newappd-3a77c.appspot.com",
    messagingSenderId: "541170772884",
    appId: "1:541170772884:web:b35bfbffc6ab8df6a0fd81",
    measurementId: "G-BEDP6GF2N1"
  };

  let app;
  if(firebase.apps.length===0){
    app=firebase.initializeApp(firebaseConfig);
  }else{
    app=firebase.app();
  }

  const db= firebase.firestore();
  const st= firebase.storage();
  const rd= firebase.database();

export { db, st , rd};