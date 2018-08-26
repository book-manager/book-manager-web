<template>
  <v-container fluid>
   <v-layout row elevation-5>
     <v-list one-line class="lista">
       <template v-for="friend in friends">
        <v-list-tile avatar :key="friend.attributes.id" @click="viewProfile(friend.attributes.id)">
          <v-list-tile-avatar>
            <img :src="friend.attributes.avatar_url">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ friend.attributes.name }} {{ friend.attributes.surname }}</v-list-tile-title>
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
  computed: {
    friends () {
      return this.$store.getters.incoming_requests;
    }
  },
  methods: {
    viewProfile (id) {
      this.$router.push({ path: `/user/${id}` });
    }
  }
};
</script>

<style scoped>
  .lista {
    width: 100%;
  }
</style>
