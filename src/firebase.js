// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyDXxKZpOMkHva6xFLi4curUflwGzZ9Sh_I",
    authDomain: "quanly-f1258.firebaseapp.com",
    databaseURL: "https://quanly-f1258-default-rtdb.firebaseio.com",
    projectId: "quanly-f1258",
    storageBucket: "quanly-f1258.appspot.com",
    messagingSenderId: "787333278536",
    appId: "1:787333278536:web:580149026110e23a72a17d",
    measurementId: "G-WSKBFT778L"
  };


  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const booksRef = ref(db, 'books');
  
  export { booksRef, push };