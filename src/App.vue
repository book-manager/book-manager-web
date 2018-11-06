<template>
  <div class="app-wrapper">
    <navbar></navbar>
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/layout/Navbar.vue';

  export default {
    name: 'app',
    components: {
      'navbar': Navbar,
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.main-container {
  text-align: center;
  margin-top: 60px;
  min-height: 50vh;
  height: 100%;
}
</style>