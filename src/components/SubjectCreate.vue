<template>
  <div class="container">
    <h2>Quản Lý Đăng Ký Môn Học</h2>
    <div class="row mb-3">
      <div class="loader"></div>
      <div class="loader"></div>
      <div class="loader"></div>
    </div>

    <form @submit.prevent="onSubmit" class="div">
      <!-- Các trường nhập liệu khác -->
      <div class="row">
        <div class="col-md-6 mt-3 container-input">
          <input
            v-model="form.mssv"
            id="mssv"
            type="number"
            class="dv"
            width="100"
            required
          />
          <label for="mssv" class="label">MSSV</label>
        </div>

        <div class="col-md-6 mt-3 mr-2 container-input">
          <input
            type="text"
            v-model="form.fullname"
            id="fullname"
            class="dv"
            required
          />
          <label for="fullname" class="label">Họ và Tên</label>
        </div>

        <div class="col-md-4 mt-3">
          <!-- <label for="selectHK">Học kỳ</label> -->
          <select class="select" v-model="form.selectHK" id="selectHK">
            <option value="">Chọn học kỳ</option>
            <option v-for="hk in distinctHK" :key="hk" :value="hk">
              {{ hk }}
            </option>
          </select>
        </div>
        <div class="col-md-8 mt-3">
          <!-- <label for="selectMH">Môn học</label> -->
          <select class="select" v-model="form.selectMH" id="selectMH">
            <option value="">Chọn môn học</option>
            <option
              v-for="monhoc in filteredMonhocs"
              :key="monhoc.id"
              :value="monhoc.tenmh"
            >
              {{ monhoc.tenmh }}
            </option>
          </select>
        </div>
      </div>
      <button type="submit" class="mt-3 mb-3 text-center">
        <svg
          class="svg"
          width="20"
          heigth="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
        <span>Đăng Ký</span>
      </button>
    </form>
    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>
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
        successMessage.value = "Đăng ký thành công!";
      } else {
        errorMessage.value = "Đăng ký thất bại. Vui lòng thử lại sau.";
      }
    };

    return {
      form,
      onSubmit,
      db,
      distinctHK,
      filteredMonhocs,
      successMessage,
      errorMessage,
    };
  },
};
</script>
<style scoped>
.div {
  background: linear-gradient(#fee7ed, #ffd8d9);
  height: calc(100%);
  width: calc(100%);
  border-radius: 10px;
  border: 2px solid white;
  -webkit-box-shadow: 0px 0px 134px 18px #c7f1ff;
  -moz-box-shadow: 0px 0px 134px 18px #c7f1ff;
  box-shadow: 0px 0px 134px 18px #c7f1ff;
}
h2 {
  font-size: 50px;
  text-align: center;
  padding-block: 20px;
  padding-inline: 20px;
  border-radius: 10px;
  -webkit-text-stroke: 5px #ffc5c1;
  background: linear-gradient(90deg, #e95d77, #e95d77);
  background-clip: text;
  color: transparent;
}
button {
  transition: color 0.8s ease-in-out, transform 0.8s ease-in-out,
    background-color 0.8s ease-in-out;
  background-color: #ffb9b4;
  font-weight: 10px;
  border: 3px solid #00a5f5;
  align-items: center;
  padding: 0px 20px;
  font-size: 20px;
  margin-left: 485px;
}
button:hover {
  color: #fee7ed;
  transform: scale(1.2);
  background-color: #00a5f5;
}
button:hover .svg {
  animation: plane 0.6s ease-in-out infinite alternate;
}
button:hover svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.3);
}
button:hover span {
  transform: translateX(5em);
}
@keyframes plane {
  from {
    transform: translateY(0.1em);
  }
  to {
    transform: translateY(-0.1em);
  }
}
.select {
  font-size: 18px;
  padding: auto;
  top: 50%;
  transform: translateY(-25%);
  color: #e95d77;
  padding: 0 5px;
  transition: all 0.2s ease-in-out;
  height: 35px;
  width: 100%;
}
.select:hover {
  color: #e24943;
  transform: scale(1.2);
  background-color: #fee7ed;
}
.label {
  position: absolute;
  left: 0.6em;
  color: #e24943;
  pointer-events: none;
  transform: translateY(0.7em);
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 20px;
  margin-left: 10px;
}
.dv {
  width: 100%;
  height: 35px;
}
.dv:focus,
dv:valid {
  outline: none;
  border: 1.5px solid#a631ff;
}
.dv:focus ~ label,
.dv:valid ~ label {
  transform: translateY(-55%) scale(0.8);
  left: 0;
  background-color: #fee7ed;
  padding: 0 0.2em;
  color: #e95d77;
  font-size: 25px;
}

.container-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 41vw;
  position: relative;
  width: 50%;
}

/* HTML: <div class="loader"></div> */
.loader {
  width: 5px;
  color: #e95d77;
  margin-left: 250px;
  aspect-ratio: 1;
  border-radius: 50%;
  clip-path: inset(-45px);
  box-shadow: -60px 15px, -60px 15px, -60px 15px;
  transform: translateY(-15px);
  animation: l19 1s infinite linear;
}
@keyframes l19 {
  16.67% {
    box-shadow: -60px 15px, -60px 15px, 19px 15px;
  }
  33.33% {
    box-shadow: -60px 15px, 0px 15px, 19px 15px;
  }
  40%,
  60% {
    box-shadow: -19px 15px, 0px 15px, 19px 15px;
  }
  66.67% {
    box-shadow: -19px 15px, 0px 15px, 60px 15px;
  }
  83.33% {
    box-shadow: -19px 15px, 60px 15px, 60px 15px;
  }
  100% {
    box-shadow: 60px 15px, 60px 15px, 60px 15px;
  }
}
</style>