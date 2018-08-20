<template>
  <div class="wrapper">
    <v-text-field name="search" label="Search for a book" id="searchBox" v-model="query" ></v-text-field>
    <div class="cards">
      <card v-for="collection in books" :key="collection.id" :collection="collection" :showBookDetails="showDetails"></card>
    </div>
  </div>
</template>

<script>
import Card from './CoverCard';
export default {
  data () {
    return {
      query: ''
    };
  },
  created () {
    this.$store.dispatch('fetchBooks');
  },
  components: {
    Card
  },
  computed: {
    books () {
      return this.$store.getters.books.filter(book => {
        if (this.query !== '') {
          return book.title.toUpperCase().includes(this.query);
        } else {
          return book;
        }
      });
    }
  },
  methods: {
    showDetails (id) {
      this.$router.push({ path: '/books/' + id });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
