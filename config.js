import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCh1fRbnDdwt5qPmtxHbyEJuZzx1pZelN8",
    authDomain: "realplaza-95f2f.firebaseapp.com",
    projectId: "realplaza-95f2f",
    storageBucket: "realplaza-95f2f.appspot.com",
    messagingSenderId: "679938315884",
    appId: "1:679938315884:web:b8b2e11e4a914047d5ea49",
    measurementId: "G-2L73JQZV02"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };