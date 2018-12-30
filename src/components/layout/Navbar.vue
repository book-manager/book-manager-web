<template>
  <div>
    <div class="navbar">
      <Menu mode="horizontal" @on-select="routeTo" v-if="isLogged">
        <div>
          <Submenu name="authors">
              <template slot="title">
                  <Icon type="people"/>
                  Authors
              </template>
              <MenuItem name="/authors">List</MenuItem>
              <MenuItem name="/author/new">Add</MenuItem>
          </Submenu>
          <Submenu name="books">
              <template slot="title">
                  <Icon type="people"/>
                  Books
              </template>
              <MenuItem name="author">My authors</MenuItem>
              <MenuItem name="all-authors">All</MenuItem>
              <MenuItem name="add-author">Add</MenuItem>
          </Submenu>
          <Submenu name="friends">
              <template slot="title">
                  <Icon type="people"/>
                  Friends
              </template>
              <MenuItem name="/friends">My friends</MenuItem>
              <MenuItem name="/friends/search">Search</MenuItem>
          </Submenu>
        </div>
          <Submenu name="profile">
              <template slot="title">
                  <Icon type="people"/>
                  {{ user.name }} {{ user.surname }}
              </template>
              <MenuItem name="author">Profile</MenuItem>
              <MenuItem name="logout">Logout</MenuItem>
          </Submenu>
      </Menu>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
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
      },
      routeTo (e) {
        if (e === 'logout') {
          return this.logout();
        }
        this.$router.push(e);
      }
    },
  };
</script>

<style>
.ivu-menu {
  display: flex;
  justify-content: space-between;
}
</style>
