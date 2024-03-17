import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ref, onUnmounted} from 'vue'
///đã Api
const firebaseConfig = {
    apiKey: "AIzaSyDQ3eVs8nxzl9VakhU1GZVjIh8DtFVIoyk",
    authDomain: "ck-vuejs.firebaseapp.com",
    projectId: "ck-vuejs",
    storageBucket: "ck-vuejs.appspot.com",
    messagingSenderId: "1031738972954",
    appId: "1:1031738972954:web:16123bd7de0e99b727eaa3",
    measurementId: "G-MB4DVV7V3E"
 };
///
const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const StudentCollection = db.collection('ql_dkmh')
///đăng ký
export const Signup = stu => {
  return StudentCollection.add(stu)
}
export const deleteStudent = id => {
   return new Promise((resolve, reject) => {
    const confirmation = confirm("Bạn có muốn xóa?");
    if (confirmation) {
      StudentCollection.doc(id)
        .delete()
        .then(() => {
          // Xử lý thành công
          resolve("Xóa thành công");
        })
        .catch(error => {
          // Xử lý lỗi
          reject("Lỗi khi xóa: " + error.message);
        });
    } else {
      // Người dùng đã hủy bỏ xóa
      resolve("Hủy bỏ xóa");
    }
  });
}

export const getStudent = async id => {
  const stu = await StudentCollection.doc(id).get()
  return stu.exists ? stu.data() : null
}

export const updateStudent = (id, stu) => {
  return StudentCollection.doc(id).update(stu)
}
export const LoadStudent  = () => {
  const student = ref([])
  const close = StudentCollection.onSnapshot(snapshot => {
    student.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return student
}