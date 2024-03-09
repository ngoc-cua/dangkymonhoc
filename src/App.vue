<template>
  <div class="container">
    <router-view />
  
  <nav class="my-2 my-md-0 mr-md-3 text-center">
    <router-link :to="isProductPage ? '/' : '/product'">{{ isProductPage ? 'Back' : 'Thống Kê' }}</router-link>
  </nav></div>
</template>

<script>
export default {
  computed: {
    isProductPage() {
      return this.$route.path === '/product';
    }
  }
}
</script>

<style>
/* styles here */
</style>
