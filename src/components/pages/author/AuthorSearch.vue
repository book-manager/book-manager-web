<template>
  <section>
    <v-container fluid grid-list-xl>
      <v-layout row justify-space-between>
        <v-flex xs8 xl10>
           <v-text-field
              name="search"
              label="Search for an author"
              id="searchBox"
              v-model="query"
            ></v-text-field>
        </v-flex>
        <v-flex xs4 xl2>
          <v-btn @click="search">Search</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row elevation-5>
        <v-list class="lista">
          <template v-for="author in authors">
            <v-list-tile avatar :key="author.id" class="user-list" @click="showDetails(author.id)">
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
  </section>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      authors: []
    };
  },
  methods: {
    search () {
      this.$store.dispatch('searchAuthor', { query: this.query }).then((response) => {
        this.authors = response;
      });
    },
    showDetails (id) {
      this.$router.push({ path: `/author/${id}` });
    }
  }
};
</script>

<style>
  .author-table {
    margin-top: 3em;
    width: 100%;
  }
</style>
