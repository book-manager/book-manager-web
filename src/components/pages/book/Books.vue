<template>
  <section>
    <v-tabs fixed-tabs>
      <v-tab key="covers">
        Covers
      </v-tab>
      <v-tab key="friend">
        Friends
      </v-tab>
      <v-tab-item key="covers">
        <books-covers />
      </v-tab-item>
      <v-tab-item key="friend">
      </v-tab-item>
    </v-tabs>
  </section>
</template>

<script>
import BooksCovers from './BooksCovers';
export default {
  components: {
    BooksCovers
  },
  created () {
    this.$store.dispatch('fetchBooks');
  },
};
</script>

<style lang="scss" scoped>

</style>
