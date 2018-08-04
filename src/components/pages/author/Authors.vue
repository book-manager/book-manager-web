<template>
<v-container fluid>
   <v-layout row elevation-5>
     <v-list one-line>
       <template v-for="author in authors">
        <v-list-tile avatar :key="author.id" @click="viewProfile(author.id)">
          <v-list-tile-content>
            <v-list-tile-title>{{ author.name }} {{ author.surname }}</v-list-tile-title>
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
    };
  },
  methods: {
    addAuthor () {
      this.$router.push({name: 'authorNew'});
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

<style scoped>

</style>
