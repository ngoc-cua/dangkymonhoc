<template>
  <h2 class="mt-2">Quản Lý Đăng Ký Học Phần</h2>
  <form class="mt-3">
    <div class="container div">
      <div class="row mt-4">
        <div class="col-md-6">
          <input
            placeholder="Họ và Tên"
            type="text"
            class="form-control"
            required
          />
        </div>
        <div class="col-md-6">
          <input placeholder="MSSV" type="text" class="form-control" required />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label for="">Học Kỳ</label>
          <select class="form-control" name="" id="">
            <option></option>
            <option></option>
            <option></option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="">Môn Học</label>
          <select class="form-control" name="" id="">
            <option></option>
            <option></option>
            <option></option>
          </select>
        </div>
      </div>
      <button type="submit" class="mt-3 mb-3">Đăng Ký</button>
    </div>
  </form>
  <!-- </div> -->
</template>

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
label {
  text-align: left;
  font-size: 15px;
}
</style>