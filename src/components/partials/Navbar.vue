<template>
  <section>
    <div v-if="isLogged">
      <el-menu
        @select="handleSelect"
        mode="horizontal">
          <el-menu-item  index="home">Booker</el-menu-item>
          <el-submenu index="settings">
            <template slot="title"> <i class="el-icon-setting"></i>{{ user.name }} {{ user.surname }}</template>
            <el-menu-item :click="logout" index="logout">Logout</el-menu-item>
          </el-submenu>
      </el-menu>
    </div>
    <div class="navbar-not-logged" v-if="!isLogged">
       <el-menu
          mode="horizontal">
        <el-menu-item index="login">
          <router-link to="/login">
            Login
          </router-link>
        </el-menu-item>
        <el-menu-item index="register">
          <router-link to="/register">Register</router-link>
        </el-menu-item>
      </el-menu>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters(['isLogged', 'user']),
    methods: {
      logout () {
        console.log('Logging out');
        this.$store.dispatch('logout');
        this.$router.push({name: 'welcome'});
      },
      handleSelect (key, path) {
        switch (key) {
          case 'logout':
            this.logout();
            break;
          case 'home':
            this.$router.push({name: 'home'});
            break;
          default:
        }
      }
    },
  };
</script>

<style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
  }

  .navbar-not-logged {
    display: flex;
    justify-content: flex-end;
  }
</style>
