<template>
<v-container fluid>
   <v-layout row elevation-5>
     <v-list one-line class="lista">
       <template v-for="author in authors.data">
        <v-list-tile avatar :key="author.attributes.id" @click="viewProfile(author.attributes.id)">
           <v-list-tile-avatar>
            <img :src="author.attributes.avatar_url">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ author.attributes.name }} {{ author.attributes.surname }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
       </template>
     </v-list>
   </v-layout>
 </v-container> 
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    viewProfile (id) {
      this.$router.push({ path: `/author/${id}` });
    }
  },
  created () {
    this.$store.dispatch('fetchAuthors');
  },
  computed: mapGetters(['authors']),
};
</script>

<style>
  .lista {
    width: 100%;
  }
</style>