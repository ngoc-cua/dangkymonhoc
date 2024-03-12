<template>
  <div class="container pt-5 pb-5">
    <form @submit.prevent="update">
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
          <tr>
            <td><input type="text" v-model="form.studentID" required /></td>
            <td><input type="text" v-model="form.fullName" required /></td>
            <td>
              <select
                class="form-control"
                id="semester"
                v-model="form.semester"
                required
              >
                <option value="">Chọn Học Kỳ</option>
                <option value="1">Học Kỳ 1</option>
                <option value="2">Học Kỳ 2</option>
              </select>
            </td>
            <td>
  <select
    class="form-control"
    id="course"
    v-model="form.courseId"
    required
  >
    <option value="">Chọn Môn Học</option>
    <option
    v-for="course in filteredCourses" 
      :key="course.id"
      :value="course.id"
    >
      {{ course.name }}
    </option>
  </select>
</td>
            <td>
              <button type="submit" class="btn btn-danger btn-sm">
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
import { reactive, onMounted} from "vue";
import { useRoute, useRouter } from "vue-router";
import { getBook,updateBook } from "@/firebase";


export default {
  data() {
    return {
     
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
      if (this.form.semester) {
        return this.courses.filter(course => course.semester.toString() === this.form.semester);
      } else {
        return [];
      }
    }
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const registrationId = route.params.id;
    const form = reactive({
      studentID: "",
      fullName: "",
      semester: "",
      courseId:"",
    });

    onMounted(async () => {
      const registration = await getBook(registrationId);
      form.studentID = registration.studentID;
      form.fullName = registration.fullName;
      form.semester = registration.semester;
      form.courseId = registration.courseId;
    });
  
    const update = async () => {
  try {
    await updateBook(registrationId, form);
    alert("Registration updated successfully");
    router.push("/product").catch(() => {
  window.location.href = "/product"; // Fallback URL using window.location
}); // Redirect to the main page after successful update
  } catch (error) {
    console.error("Error updating registration:", error);
    alert("Error updating registration: " + error.message); // Show an alert with the error message
  }
};

   
    return {
      form,
      update,
    };
    
  },
  
};
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: #fff;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}

.btn {
  cursor: pointer;
}

/* Form */
.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-select {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

/* Button */
.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
}

.btn-danger:focus {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
  box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5);
}
</style>
