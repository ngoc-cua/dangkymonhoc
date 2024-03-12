// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, remove, update, onValue } from 'firebase/database';
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
  
  export const deleteBook = id => {
    return remove(ref(db, 'books/' + id));
  };
  export const MonHoc = () => {
    return [
      { id: 1, name: 'Môn 1' },
      { id: 2, name: 'Môn 2' },
      { id: 3, name: 'Môn 3' }
    ];
  };
  export const getBook = (id) => {
    return new Promise((resolve, reject) => {
      onValue(ref(db, `books/${id}`), (snapshot) => {
        const book = snapshot.val();
        if (book) {
          resolve(book);
        } else {
          resolve(null);
        }
      }, (error) => {
        reject(error);
      });
    });
  };
  export const updateBook = (id, book) => {
    return update(ref(db, `books/${id}`), book);
  };
  
  export { booksRef, push };