<template>
<div class="navWrapper"  v-if="isLogged">
    <div id="menu" :class="{ active: isActive }">
      <el-menu mode="horizontal" :router="true" class="navbar">
          <el-menu-item id="logo" index="/" :route="{ name: 'Root'}">
            <logo></logo>
          </el-menu-item>
          <el-submenu index="authors-submenu">
            <template slot="title">Authors</template>
            <el-menu-item index="/author" :route="{ name: 'authors' }">My authors</el-menu-item>
            <el-menu-item index="/author/search" :route="{ name: 'AuthorSearch' }">Search</el-menu-item>
            <el-menu-item index="/author/new" :route="{ name: 'authorNew' }">Add</el-menu-item>
          </el-submenu>
          <el-submenu index="books-submenu">
            <template slot="title">Books</template>
            <el-menu-item index="/book" :route="{ name: 'Books' }">My books</el-menu-item>
            <el-menu-item index="/book/search" :route="{ name: 'BookSearch' }">Search</el-menu-item>
            <el-menu-item index="/book/new" :route="{ name: 'NewBook' }">Add</el-menu-item>
          </el-submenu>
          <el-submenu index="profile-submenu">
            <template slot="title">{{ user.name }} {{ user.surname }}</template>
            <el-menu-item index="/profile" :route="{ name: 'Profile' }">Profile</el-menu-item>
          </el-submenu>
      </el-menu>
    </div>
    <div id="toggle" @click="select()">
      <div class="span" id="top" :class="{ active: isActive }"></div>
      <div class="span" id="middle" :class="{ active: isActive }"></div>
      <div class="span" id="bottom" :class="{ active: isActive }"></div>
    </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Logo from '@/components/Logo';

  export default {
    data () {
      return {
        isActive: false
      };
    },
    components: {
      Logo
    },
    computed: mapGetters(['isLogged', 'user', 'incoming_requests']),
    created () {
      // this.$store.dispatch('checkPendingFriendships');
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
      },
      select () {
        this.isActive = !this.isActive;
      }
    },
  };
</script>

<style scoped>
</style>
