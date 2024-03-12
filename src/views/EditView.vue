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
              <select class="form-control" id="course" v-model="form.courseId">
                <option value="">Chọn Môn Học</option>
                <option v-for="course in form" :key="course.id">
                  {{ course.courseId}}
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
        console.log("Registration updated successfully");
        router.push("/"); // Redirect to the main page after successful update
      } catch (error) {
        console.error("Error updating registration:", error);
      }
    };
  
    return {
      form,
      update,
    };
    
  },
  
};
</script>