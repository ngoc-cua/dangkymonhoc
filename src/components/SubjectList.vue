<template>
  <div class="container">
    <table class="table m-0">
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
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <router-link>
              <button class="me-2">Edit</button>
            </router-link>
            <button class="btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
div {
  background: linear-gradient(#ede0cf, #d6ad93);
  height: calc(100%);
  width: calc(100%);
  border-radius: 10px;
  border: 2px solid white; 
}
button {
  transition: color 0.8s ease-in-out, transform 0.8s ease-in-out,
    background-color 0.8s ease-in-out;
  background-color: #ffb9b4;
  font-weight: 10px;
  border: 3px solid #2aafc1;
}
button:hover {
  color: #fee7ed;
  transform: scale(1.2);
  background-color: #2aafc1;
}
</style>