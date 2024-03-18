<template>
  <h2>Cập Nhật Thông Tin</h2>
  <div class="row">
    <div class="loader"></div>
    <div class="loader"></div>
    <div class="loader"></div>
  </div>
  <div class="container mt-3">
    <form @submit.prevent="update">
      <!-- Input để nhập MSSV hoặc chọn Học Kỳ -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">MSSV</th>
            <th scope="col">Họ Và Tên</th>
            <th scope="col">Học Kỳ</th>
            <th scope="col">Môn Học</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="selectedStudent" :key="selectedStudent.id">
            <td><input type="text" v-model="selectedStudent.mssv" /></td>
            <td><input type="text" v-model="selectedStudent.fullname" /></td>
            <td><input type="text" v-model="selectedStudent.selectHK" /></td>
            <td>
              <select v-model="selectedStudent.selectMH">
                <option
                  v-for="monhoc in filteredMonhocs"
                  :key="monhoc.id"
                  :value="monhoc.tenmh"
                >
                  {{ monhoc.tenmh }}
                </option>
              </select>
            </td>
            <td>
              <button @click="update">
                <span>Update</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
  <router-link :to="`/`">
    <a class="link btn-sm me-2">Trang Chủ</a>
  </router-link>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import data from "@/data.json";
import { getStudent, updateStudent } from "@/firebase";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const db = ref(data);
    const filteredMonhocs = computed(() => {
      return db.value.monhoc;
    });
    const router = useRouter();
    const route = useRoute();
    const StuID = computed(() => route.params.id);

    const selectedStudent = ref(null);

    onMounted(async () => {
      const studentData = await getStudent(StuID.value);
      selectedStudent.value = studentData;
    });

    const update = async () => {
      await updateStudent(StuID.value, selectedStudent.value);
      router.push("/product");
    };

    return { update, selectedStudent, filteredMonhocs };
  },
};
</script>
<style scoped>
h2 {
  font-size: 50px;
  text-align: center;
  padding-block: 20px;
  padding-inline: 20px;
  border-radius: 10px;
  -webkit-text-stroke: 5px #90c577;
  background: linear-gradient(90deg, #e24943, #e24943);
  background-clip: text;
  color: transparent;
  transform: 1s;
  cursor: pointer;
}

table tbody {
  background-color: #accc88;
}
table tbody td input {
  box-shadow: 0 0 4px 4px #00c5a7;
}
table tbody td select {
  box-shadow: 1px 1px 4px 4px #01bda0;
}

/* Form */
.form-control,
.form-select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

button {
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
button:hover {
  letter-spacing: 0.25em;
  background: #9739bf;
  color: #9739bf;
  box-shadow: 0 0 45px #9739bf;
}
button::before {
  content: "";
  position: absolute;
  inset: 2px;
  background: #cdfde5;
}
button span {
  position: relative;
  z-index: 1;
}

.loader {
  width: 20px;
  margin-left: 250px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #90c577;
  animation: l20-1 0.8s infinite linear alternate, l20-2 1.6s infinite linear;
}
@keyframes l20-1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  12.5% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 0%,
      100% 0%,
      100% 0%
    );
  }
  25% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      100% 100%,
      100% 100%
    );
  }
  50% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  62.5% {
    clip-path: polygon(
      50% 50%,
      100% 0,
      100% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  75% {
    clip-path: polygon(
      50% 50%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  100% {
    clip-path: polygon(
      50% 50%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      0% 100%
    );
  }
}
@keyframes l20-2 {
  0% {
    transform: scaleY(1) rotate(0deg);
  }
  49.99% {
    transform: scaleY(1) rotate(135deg);
  }
  50% {
    transform: scaleY(-1) rotate(0deg);
  }
  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}

.link {
  display: inline-block;
  font-size: 15px;
  letter-spacing: 1.6px;
  color: #00c5a7;
  /* background: #111; */
  padding: 10px 30px;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 10px;
  transition: 0.8s;
  text-align: center;
  margin-left: 480px;
}
.link:hover {
  color: #ffd8d9;
  text-shadow: 0 0 5px #ffd8d9;
  box-shadow: 0 0 10px #ffd8d9, 0 0 20px #ffd8d9, 0 0 40px #ffd8d9,
    0 0 80px #ffd8d9, 0 0 160px #ffd8d9;
  letter-spacing: 4px;
}
</style>