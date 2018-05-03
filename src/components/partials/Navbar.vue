<template>
  <v-toolbar v-if="isLogged">
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>Booker</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Authors</v-btn>
      <v-btn flat>Books</v-btn>
      <v-menu offset-y>
        <v-btn flat slot="activator">Friends</v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title><router-link to="friends">Friends</router-link></v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <v-list-title-title><router-link to="friends/search">Search</router-link></v-list-title-title>
          </v-list-tile>
        </v-list>
      </v-menu> 
      <v-menu offset-y>
        <v-btn flat slot="activator">{{ user.name }} {{ user.surname }}</v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <v-list-title-title><p @click="logout">Logout</p></v-list-title-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
    <v-toolbar v-else>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>Booker</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="login">Login</v-btn>
      <v-btn flat @click="register">Register</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters(['isLogged', 'user']),
    methods: {
      logout () {
        this.$store.dispatch('logout');
        this.$router.push({name: 'welcome'});
      },
      login () {
        this.$router.push({name: 'Login'});
      },
      register () {
        this.$router.push({name: 'Register'});
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
