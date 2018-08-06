<template>
<v-container fluid>
   <v-layout row elevation-5>
     <v-list one-line class="lista">
       <template v-for="author in authors">
        <v-list-tile avatar :key="author.id" @click="viewProfile(author.id)">
           <v-list-tile-avatar>
            <img :src="author.avatar_url">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ author.name }} {{ author.surname }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
       </template>
     </v-list>
   </v-layout>
 </v-container> 
</template>

<script>
export default {
  data () {
    return {
    };
  },
  methods: {
    viewProfile (id) {
      this.$router.push({ path: `/author/${id}` });
    }
  },
  created () {
    this.$store.dispatch('fetchAuthors');
  },
  computed: {
    authors () {
      return this.$store.getters.authors;
    }
  }
};
</script>

<style>
  .lista {
    width: 100%;
  }
</style>