<template>
  <div>
    <h2 class="mt-2">Quản Lý Đăng Ký Học Phần</h2>
    <form class="mt-3" @submit.prevent="register">
      <div class="container div">
        <div class="row mt-4">
          <div class="col-md-6">
            <input v-model="fullName" placeholder="Họ và Tên" type="text" class="form-control" required />
          </div>
          <div class="col-md-6">
            <input v-model="studentID" placeholder="MSSV" type="text" class="form-control" required />
          </div>
          <div class="col-md-6">
            <label for="semester">Học Kỳ</label>
            <select v-model="semester" class="form-control" id="semester" required @change="updateCourses">
              <option value="">Chọn Học Kỳ</option>
              <option value="1">Học Kỳ 1</option>
              <option value="2">Học Kỳ 2</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="course">Môn Học</label>
            <select v-model="selectedCourse" class="form-control" id="course" required>
              <option value="">Chọn Môn Học</option>
              <option v-for="course in filteredCourses" :key="course.id" :value="course.id">{{ course.name }}</option>
            </select>
          </div>
        </div>
        <button type="submit" class=" res offset-md-5 mt-3 mb-3">Đăng Ký</button>
      </div>
    </form>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { booksRef, push } from '@/firebase';

export default {
  data() {
    return {
      fullName: '',
      studentID: '',
      semester: '',
      selectedCourse: '',
      courses: [
        { id: 1, name: 'Môn 1', semester: 1 },
        { id: 2, name: 'Môn 2', semester: 1 },
        { id: 3, name: 'Môn 3', semester: 1 },
        { id: 4, name: 'Môn 4', semester: 2 },
        { id: 5, name: 'Môn 5', semester: 2 },
        { id: 6, name: 'Môn 6', semester: 2 }
      ],
      successMessage: '',
      errorMessage: ''
    };
  },
  computed: {
    filteredCourses() {
      if (this.semester) {
        return this.courses.filter(course => course.semester.toString() === this.semester);
      } else {
        return [];
      }
    }
  },
  methods: {
    register() {
      if (this.fullName && this.studentID && this.semester && this.selectedCourse) {
        push(booksRef, {
          fullName: this.fullName,
          studentID: this.studentID,
          semester: this.semester,
          courseId: this.selectedCourse
        }).then(() => {
          this.successMessage = 'Đăng ký thành công!';
          this.clearForm();
        }).catch(error => {
          console.error('Đăng ký thất bại:', error);
          this.errorMessage = 'Đăng ký thất bại. Vui lòng thử lại sau.';
        });
      } else {
        this.errorMessage = 'Vui lòng điền đầy đủ thông tin.';
      }
    },
    clearForm() {
      this.fullName = '';
      this.studentID = '';
      this.semester = '';
      this.selectedCourse = '';
    },
    updateCourses() {
      this.selectedCourse = ''; // Reset selected course when semester changes
    }
  }
};
</script>


<style scoped>
.div {
  background: linear-gradient(#ede0cf, #d6ad93);
  height: calc(100%);
  width: calc(100%);
  border-radius: 10px;
  border: 2px solid white;
}
h2 {
  background-color: #f0d3bf;
  padding-block: 20px;
  padding-inline: 20px;
  border-radius: 10px;
}
button {
  transition: color 0.8s ease-in-out, transform 0.8s ease-in-out, background-color 0.8s ease-in-out;
  background-color: #ffb9b4;
  font-weight: 10px;
  border: 3px solid #2aafc1;
}
button:hover {
  color: #fee7ed;
  transform: scale(1.2);
  background-color: #2aafc1;
}
label {
  text-align: left;
  font-size: 15px;
}
.res {
  margin-left:510px;
}
</style>
