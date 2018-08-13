<template>
  <v-container grid-list-md text-xs-center elevation-5>
    <v-layout row wrap>
      <v-flex xs-6>
        <img :src="book.cover_url" alt="book cover">
        <v-container>
          {{ book.title }}
        </v-container>
      </v-flex>
      <v-flex xs-6>
        <v-container class="title">
          {{ book.title }}
        </v-container>
        <v-container class="author-info">
          {{ book.author_name }} {{ book.author_surname }}
        </v-container>
        <v-container class="description">
          {{ book.description }}
        </v-container> 
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      loading: false,
      error: false,
      errorMessage: ''
    };
  },
  computed: mapGetters(['book', 'owned']),
  created () {
    this.loading = true;
    this.$store.dispatch('fetchBookDetails', { id: this.$route.params.id }).then(() => {

    }).catch(error => {
      this.error = true;
      this.errorMessage = error.msg;
    });
  },
  methods: {
    addAuthor () {
      this.loading = true;
      this.$store.dispatch('createOwnership', { author_id: this.$route.params.id }).then((response) => {
        this.loading = false;
        this.success = true;
        this.successMsg = `${this.author.name} ${this.author.surname} has been added to your collection`;
      });
    }
  }
};
</script>


<style scoped>
  .author-name {
    font-weight: bold;
    font-size: 2em;
  }
</style>
