<template>
  <section>
    <at-menu mode="horizontal" v-if="isLogged" class="navbar">
      <div>
        <at-menu-item name="authors"><router-link to="author">Author</router-link></at-menu-item>
        <at-menu-item name="books">Books</at-menu-item>
        <at-submenu>
          <template slot="title">Friends</template>
          <at-menu-item name="friends"><router-link to="">Friends</router-link></at-menu-item> 
          <at-menu-item name="searchFriends"><router-link to="friends/search">Search friend</router-link></at-menu-item>
        </at-submenu>
      </div>
      <div>
        <at-submenu>
          <template slot="title"><i class="icon icon-settings"></i>{{ user.name }} {{ user.surname }}</template>
          <at-menu-item name="users">Users</at-menu-item>
          <at-menu-item name="books">Books</at-menu-item>
          <at-menu-item name="profile">Profile</at-menu-item>
          <at-menu-item name="logout" ><p @click="logout">Logout</p></at-menu-item>
        </at-submenu>
      </div>
    </at-menu>
    <at-menu mode="horizontal" v-if="!isLogged" class="navbar-not-logged">
      <at-menu-item name="login"><router-link to="login">Login</router-link></at-menu-item>
      <at-menu-item name="register"><router-link to="register">Register</router-link></at-menu-item>
    </at-menu>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters(['isLogged', 'user']),
    methods: {
      logout () {
        console.log('Logout');
        this.$store.dispatch('logout');
        this.$router.push({name: 'welcome'});
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
