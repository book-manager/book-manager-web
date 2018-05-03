<template>
 <v-container fluid>
   <v-layout row elevation-5>
     <v-list one-line class="lista">
       <template v-for="friend in friends">
        <v-list-tile avatar :key="friend.id" @click="viewProfile(friend.id)">
          <v-list-tile-avatar>
            <img :src="friend.avatar_url">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ friend.name }} {{ friend.surname }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
       </template>
     </v-list>
   </v-layout>
 </v-container> 
</template>

<script>
export default {
  data () {
    return {
      friends: []
    };
  },
  created () {
    this.$store.dispatch('fetchFriends').then((response) => {
      this.friends = response;
    });
  },
  methods: {
    viewProfile (id) {
      this.$router.push({ path: `/user/${id}` });
    }
  }
};
</script>

<style>
  .lista {
    width: 100%;
  }
</style>
