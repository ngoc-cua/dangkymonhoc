<template>
  <div class="container pt-5 pb-5">
    <h3 class="bounce-text">Danh Sách Sinh Viên</h3>
    <br />
    <!-- Input để nhập MSSV hoặc chọn Học Kỳ -->
    <div class="input-container">
      <input
        v-model="searchText"
        type="text"
        placeholder="Nhập MSSV hoặc Chọn Học Kỳ"
        class="form-control mb-3"
      />
      <select v-model="searchType" class="form-select mb-3">
        <option value="studentID">MSSV</option>
        <option value="semester">Học Kỳ</option>
        <option value="studentName">Tên sv</option>
      </select>
      <label for="">Chọn môn học</label>
      <select v-model="selectedSubject" class="form-select mb-3">
        <option value="">Chọn Môn Học</option>
        <option
          v-for="monhoc in filteredMonhocs"
          :key="monhoc.id"
          :value="monhoc.tenmh"
        >
          {{ monhoc.tenmh }}
        </option>
      </select>
    </div>
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
        <tr v-for="(student, index) in Search" :key="student.id">
          <td>{{ index + 1 }}</td>
          <td>{{ student.mssv }}</td>
          <td>{{ student.fullname }}</td>
          <td>{{ student.selectHK }}</td>
          <td>{{ student.selectMH }}</td>
          <td>
            <router-link :to="`/edit/${student.id}`">
              <button class="btn btn-primary btn-sm me-2">Edit</button>
            </router-link>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteStudent(student.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { LoadStudent, deleteStudent } from "@/firebase";
import { computed, ref } from "vue";
import data from "@/data.json";

export default {
  data() {
    return {
      searchText: "",
      searchType: "studentID",
      selectedSubject: "",
    };
  },
  setup() {
    const db = ref(data);
    const filteredMonhocs = computed(() => {
      return db.value.monhoc;
    });
    const student = LoadStudent();

    return { student, filteredMonhocs, deleteStudent };
  },
  computed: {
  Search() {
    let filteredStudents = this.student;

    if (this.searchText && this.searchType === "studentID") {
      filteredStudents = filteredStudents.filter((student) => {
        return student.mssv.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }

    if (this.searchText && this.searchType === "semester") {
      filteredStudents = filteredStudents.filter((student) => {
        const selectHK = student.selectHK;
        if (typeof selectHK === "string") {
          return selectHK.toLowerCase().includes(this.searchText.toLowerCase());
        }
        return false;
      });
    }

    if (this.searchText && this.searchType === "studentName") {
      filteredStudents = filteredStudents.filter((student) => {
        return student.fullname.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }

    if (this.selectedSubject) {
      filteredStudents = filteredStudents.filter((student) => {
        return student.selectMH.toLowerCase() === this.selectedSubject.toLowerCase();
      });
    }

    return filteredStudents;
  },
},
};
</script>