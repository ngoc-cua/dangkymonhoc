<template>
  <div class="container pt-5 pb-5">
    <!-- Input để nhập MSSV hoặc chọn Học Kỳ -->
    <input v-model="searchText" type="text" placeholder="Nhập MSSV hoặc Chọn Học Kỳ" class="form-control mb-3" />
    <select v-model="searchType" class="form-select mb-3">
      <option value="studentID">MSSV</option>
      <option value="semester">Học Kỳ</option>
    </select>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">MSSV</th>
          <th scope="col">Họ Và Tên</th>
          <th scope="col">Học Kỳ</th>
          <th scope="col">Môn Học</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <!-- Sử dụng filteredRegistrations thay vì registrations -->
        <tr v-for="(registration, index) in filteredRegistrations" :key="registration.id">
          <td>{{ index + 1 }}</td>
          <td>{{ registration.studentID }}</td>
          <td>{{ registration.fullName }}</td>
          <td>{{ registration.semester }}</td>
          <td>{{ getCourseName(registration.courseId) }}</td>
          <td>
            <router-link :to="`/edit/${registration.id}`" class="btn btn-primary me-2">Edit</router-link>
            <button @click="deleteBook(registration.id)" class="btn btn-danger me-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onValue } from 'firebase/database';
import { booksRef, deleteBook } from '@/firebase';

export default {
  data() {
    return {
      registrations: [],
      courses: [
        { id: 1, name: 'Môn 1' },
        { id: 2, name: 'Môn 2' },
        { id: 3, name: 'Môn 3' },
        { id: 4, name: 'Môn 4' },
        { id: 5, name: 'Môn 5' },
        { id: 6, name: 'Môn 6' }
      ],
      searchText: '',
      searchType: 'studentID'
    };
  },
  methods: {
    fetchRegistrations() {
      onValue(booksRef, snapshot => {
        this.registrations = [];
        snapshot.forEach(childSnapshot => {
          this.registrations.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      });
    },
    getCourseName(courseId) {
      const course = this.courses.find(course => course.id === courseId);
      return course ? course.name : '';
    },
    deleteBook(id) {
      deleteBook(id)
        .then(() => {
          console.log('Book deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting book:', error);
        });
    }
  },
  computed: {
    filteredRegistrations() {
      if (!this.searchText || !['studentID', 'semester'].includes(this.searchType)) {
        return this.registrations;
      }
      return this.registrations.filter(registration => {
        if (this.searchType === 'studentID') {
          return registration.studentID.toLowerCase().includes(this.searchText.toLowerCase());
        }
        if (this.searchType === 'semester') {
          return registration.semester.toLowerCase().includes(this.searchText.toLowerCase());
        }
      });
    }
  },

  created() {
    this.fetchRegistrations();
  }
};
</script>

<style scoped>
div{

  background: linear-gradient(#ede0cf, #d6ad93);
}
/* CSS cho input */
.input-container {
  margin-bottom: 20px;
}

/* CSS cho select */
.select-container {
  margin-bottom: 20px;
}

/* CSS cho table */
.table-container {
  margin-top: 20px;
}
table{
  background-color: #fff;
}

/* CSS cho nút Edit */
.btn-edit {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-edit:hover {
  background-color: #0056b3;
}

/* CSS cho nút Delete */
.btn-delete {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-delete:hover {
  background-color: #bd2130;
}
</style>
