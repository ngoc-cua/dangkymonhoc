<template>
  <h2>Danh Sách Sinh Viên</h2>
  <div class="loader mb-5"></div>
  <div class="container">
    <!-- Input để nhập MSSV hoặc chọn Học Kỳ -->
    <div class="row">
      <div class="col-md-6">
        <select v-model="searchType" class="form-select mb-3">
          <option value="studentID">MSSV</option>
          <option value="semester">Học Kỳ</option>
          <option value="studentName">Tên sv</option>
        </select>
      </div>
      <div class="col-md-6">
        <!-- <label for="">Chọn môn học</label> -->
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
      <div class="col-md-12">
        <input
          v-model="searchText"
          type="text"
          placeholder="Nhập MSSV hoặc Chọn Học Kỳ"
          class="form-control"
        />
      </div>
    </div>
  </div>
  <table class="table table-striped mt-3">
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
            <button class="button1 btn-sm me-2">
              <span>Edit</span>
            </button>
          </router-link>
          <button class="button2 btn-sm" @click="deleteStudent(student.id)">
            <span>Delete</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
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
          return student.mssv
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
      }

      if (this.searchText && this.searchType === "semester") {
        filteredStudents = filteredStudents.filter((student) => {
          const selectHK = student.selectHK;
          if (typeof selectHK === "string") {
            return selectHK
              .toLowerCase()
              .includes(this.searchText.toLowerCase());
          }
          return false;
        });
      }

      if (this.searchText && this.searchType === "studentName") {
        filteredStudents = filteredStudents.filter((student) => {
          return student.fullname
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
      }

      if (this.selectedSubject) {
        filteredStudents = filteredStudents.filter((student) => {
          return (
            student.selectMH.toLowerCase() ===
            this.selectedSubject.toLowerCase()
          );
        });
      }

      return filteredStudents;
    },
  },
};
</script>
<style scoped>
.container {
  background: linear-gradient(#f9ebd9, #ede0cf);
  padding: 20px;
  border-radius: 10px;
}
.input {
  width: 100%;
}
.table-container {
  overflow-x: auto;
}

.table-striped tbody tr:nth-child(odd) {
  background-color: #ede0cf;
}

.table-striped tbody tr:nth-child(even) {
  background-color: #fee7ed;
}

.btn-edit {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}
.btn-delete {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-edit:hover {
  background-color: #0056b3;
}

.btn-delete:hover {
  background-color: #bd2130;
}

h2 {
  font-size: 50px;
  text-align: center;
  padding-block: 20px;
  padding-inline: 20px;
  border-radius: 10px;
  -webkit-text-stroke: 5px #e0c0a9;
  background: linear-gradient(90deg, #e24943, #e24943);
  background-clip: text;
  color: transparent;
  animation: bounce 2s infinite;
  transform: 1s;
  cursor: pointer;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.loader {
  width: 10px;
  margin-left: 555px;
  height: 10px;
  background: #e0c0a9;
  color: #e0c0a9;
  box-shadow: -18px -9px, 0 -9px, 18px -9px, -18px 0, 18px 0, -18px 9px, 0 9px,
    18px 9px, -18px 18px, 0 18px, 18px 18px;
  animation: l30 2s infinite;
}
@keyframes l30 {
  10% {
    box-shadow: -18px -9px, 0 -9px, 18px -9px, -18px 0, 18px 0, -18px 9px 0 2px,
      0 9px, 18px 9px 0 2px, -18px 18px, 0 18px, 18px 18px;
  }
  20% {
    box-shadow: -18px -9px, 0 -9px, 18px -9px, -18px 0, 18px 0, -18px 9px, 0 9px,
      18px 9px 0 2px, -18px 18px 0 2px, 0 18px, 18px 18px;
  }
  30% {
    box-shadow: -18px -9px, 0 -9px, 18px -9px, -18px 0 0 2px, 18px 0, -18px 9px,
      0 9px 0 2px, 18px 9px, -18px 18px 0 2px, 0 18px, 18px 18px 0 2px;
  }
  40% {
    box-shadow: -18px -9px, 0 -9px, 18px -9px, -18px 0 0 2px, 18px 0 0 2px,
      -18px 9px, 0 9px, 18px 9px, -18px 18px, 0 18px, 18px 18px 0 2px;
  }
  50% {
    box-shadow: -18px -9px, 0 -9px, 18px -9px, -18px 0, 18px 0 0 2px,
      -18px 9px 0 2px, 0 9px, 18px 9px, -18px 18px, 0 18px, 18px 18px;
  }
  60% {
    box-shadow: -18px -9px, 0 -9px 0 2px, 18px -9px, -18px 0, 18px 0,
      -18px 9px 0 2px, 0 9px, 18px 9px, -18px 18px 0 2px, 0 18px, 18px 18px;
  }
  70% {
    box-shadow: -18px -9px, 0 -9px 0 2px, 18px -9px 0 2px, -18px 0, 18px 0,
      -18px 9px, 0 9px, 18px 9px, -18px 18px 0 2px, 0 18px, 18px 18px;
  }
  80% {
    box-shadow: -18px -9px 0 2px, 0 -9px, 18px -9px, -18px 0, 18px 0, -18px 9px,
      0 9px, 18px 9px, -18px 18px, 0 18px, 18px 18px 0 2px;
  }
  90% {
    box-shadow: -18px -9px 0 2px, 0 -9px, 18px -9px, -18px 0, 18px 0, -18px 9px,
      0 9px 0 2px, 18px 9px, -18px 18px, 0 18px, 18px 18px 0 2px;
  }
}
.button1 {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 10px 15px;
  transition: 0.5s;
  position: relative;
  font-size: 10px;
  background: #e24943;
  border: none;
  color: #74a65d;
  cursor: pointer;
  border-radius: 5px;
}
.button1:hover {
  letter-spacing: 0.25em;
  background: #9739bf;
  color: #9739bf;
  box-shadow: 0 0 45px #9739bf;
}
.button1::before {
  content: "";
  position: absolute;
  inset: 2px;
  background: #cdfde5;
}
.button1 span {
  position: relative;
  z-index: 1;
}
.button2 {
  transition: color 0.8s ease-in-out, transform 0.8s ease-in-out,
    background-color 0.8s ease-in-out;
  background-color: #e0c0a9;
  font-weight: 10px;
  border: 3px solid #6a4731;
  align-items: center;
  color: #9f8467;
}
.res[data-v-338b7148] {
  margin-left: 598px;
}
.button2:hover {
  color: #3b210a;
  transform: scale(1.2);
  background-color: #ede0cf;
}
</style>
