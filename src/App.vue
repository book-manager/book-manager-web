<template>
<v-app>
  <div id="app">
    <navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</v-app>
</template>

<script>
  import Navbar from './components/partials/Navbar.vue';

  export default {
    name: 'app',
    components: {
      'navbar': Navbar,
    }
  };
</script>
