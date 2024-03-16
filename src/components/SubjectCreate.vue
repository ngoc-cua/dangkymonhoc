<template>
  <div>
    <form @submit.prevent="onSubmit">
      <!-- Các trường nhập liệu khác -->
      <label for="mssv">MSSV</label>
      <input
        v-model="form.mssv"
        id="mssv"
        placeholder="MSSV"
        type="text"
        class="form-control"
        required
      />
      <label for="fullname">Họ và Tên</label>
      <input
        type="text"
        v-model="form.fullname"
        id="fullname"
        placeholder="Họ và Tên"
        class="form-control"
        required
      />
      <label for="selectHK">Học kỳ</label>
      <select v-model="form.selectHK" id="selectHK">
        <option value="">Chọn học kỳ</option>
        <option v-for="hk in distinctHK" :key="hk" :value="hk">
          {{ hk }}
        </option>
      </select>
      <label for="selectMH">Môn học</label>
      <select v-model="form.selectMH" id="selectMH">
        <option value="">Chọn môn học</option>
        <option
          v-for="monhoc in filteredMonhocs"
          :key="monhoc.id"
          :value="monhoc.tenmh"
        >
          {{ monhoc.tenmh }}
        </option>
      </select>
      <button type="submit">Đăng ký</button>
    </form>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { Signup } from "@/firebase";
import { reactive, ref, computed } from "vue";
import data from "@/data.json";

export default {
  setup() {
    const form = reactive({
      mssv: "",
      fullname: "",
      selectMH: "",
      selectHK: "",
    });
    
    const db = ref(data);

    const distinctHK = computed(() => {
      return [...new Set(db.value.monhoc.map((item) => item.hk))];
    });

    const filteredMonhocs = computed(() => {
      if (form.selectHK) {
        return db.value.monhoc.filter((item) => item.hk === form.selectHK);
      } else {
        return [];
      }
    });

    const successMessage = ref("");
    const errorMessage = ref("");

    const onSubmit = async () => {
      // Tiếp tục xử lý các giá trị đã lấy được...
      
      await Signup({ ...form });
      if (form.fullname && form.mssv && form.selectHK && form.selectMH) {
        form.mssv = "";
        form.fullname = "";
        form.selectMH = "";
        form.selectHK = "";
        successMessage.value = 'Đăng ký thành công!';
      } else {
        errorMessage.value = 'Đăng ký thất bại. Vui lòng thử lại sau.';
      }
    };
    
    return { form, onSubmit, db, distinctHK, filteredMonhocs, successMessage, errorMessage };
  }
}
</script>