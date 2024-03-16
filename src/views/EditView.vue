<template>
  <div class="container pt-5 pb-5">
    <h3 class="bounce-text">Cập Nhật Thông Tin</h3>
    <br />
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
                <option v-for="monhoc in filteredMonhocs" :key="monhoc.id" :value="monhoc.tenmh">{{ monhoc.tenmh }}</option>
              </select>
            </td>
            <td>
              <button class="btn btn-danger btn-sm" @click="update">
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
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