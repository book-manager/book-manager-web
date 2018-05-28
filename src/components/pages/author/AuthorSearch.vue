<template>
  <section>
    <div class="md-layout md-gutter author-info md-elevation-10 md-alignment-center-center">
      <div class="md-layout-item md-size-90 search-bar">
        <md-field>
          <label>Search for an author</label>
          <md-input v-model="query"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-10">
        <md-button class="md-raised md-primary" @click="search">Search</md-button>
      </div>
    </div>
    <div class="md-layout md-gutter md-alignment-center-center">
      <md-table v-model="authors" md-card class="author-table">
        <md-table-toolbar>
          <h1 class="md-title">Authors</h1>
        </md-table-toolbar>

        <md-table-row  @click="showDetails(item.id)" slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Surname" md-sort-by="surname">{{ item.surname }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      authors: []
    }
  },
  methods: {
    search () {
      this.$store.dispatch('searchAuthor', { query: this.query }).then((response) => {
        this.authors = response.data.authors;
      });
    },
    showDetails (id) {
      this.$router.push({ path: `/author/details/${id}` });
    }
  }
}
</script>

<style>
  .author-table {
    margin-top: 3em;
    width: 100%;
  }
</style>
