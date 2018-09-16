<template>
  <v-toolbar v-if="isLogged" flat>
    <v-toolbar-title>Booker</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-badge left v-if="incoming_requests">
      <span slot="badge">{{ incoming_requests.length }}</span>
      <router-link to="/friends/requests">
      <span>Friends requests</span>
      </router-link>
    </v-badge>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-menu offset-y>
        <v-btn flat slot="activator">Authors</v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title><router-link to="/author">My authors</router-link></v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title><router-link to="/author/search">Search</router-link></v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title><router-link to="/author/new">Add</router-link></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> 
      <v-menu offset-y>
        <v-btn flat slot="activator">Books</v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title><router-link to="/books">My books</router-link></v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title><router-link to="/books/search">Search</router-link></v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title><router-link to="/books/new">Add</router-link></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>  
      <v-menu offset-y>
        <v-btn flat slot="activator">Friends</v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>
              <router-link to="/friends">
              Friends
              </router-link>
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title><router-link to="/friends/search">Search</router-link></v-list-tile-title>
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
            <v-list-tile-title><p @click="logout">Logout</p></v-list-tile-title>
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
    computed: mapGetters(['isLogged', 'user', 'incoming_requests']),
    created () {
      this.$store.dispatch('checkPendingFriendships');
    },
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

</style>
