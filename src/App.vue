<template>
  <div class="container">
    <router-view />

    <nav class="mt-3">
      <router-link :to="isProductPage ? '/' : '/product'">{{
        isProductPage ? "Back" : "Thống Kê"
      }}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    isProductPage() {
      return this.$route.path === "/product";
    },
  },
};
</script>

<style>
nav {
  display: inline-block;
  font-size: 15px;
  letter-spacing: 1.6px;
  color: white;
  /* background: #111; */
  padding: 10px 30px;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 10px;
  transition: 0.8s;
  text-align: center;
  margin-left: 480px;
}
nav:hover {
  color: #ffd8d9;
  text-shadow: 0 0 5px #ffd8d9;
  box-shadow: 0 0 10px #ffd8d9, 0 0 20px #ffd8d9, 0 0 40px #ffd8d9,
    0 0 80px #ffd8d9, 0 0 160px #ffd8d9;
  letter-spacing: 4px;
}
</style>
