<template>
  <v-container fluid>
   <v-layout row elevation-5>
     <v-list one-line class="lista">
       <template v-for="friend in pending_friendship">
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
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters(['pending_friendship']),
  methods: {
    viewProfile (id) {
      this.$router.push({ path: `/user/${id}` });
    }
  }
}
</script>

<style scoped>
  .lista {
    width: 100%;
  }
</style>
