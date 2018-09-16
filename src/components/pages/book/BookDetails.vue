<template>
  <v-container fluid grid-list-xl text-xl-center elevation-1 class="details">
    <v-layout row wrap>
    <vue-element-loading :active="loading" :is-full-screen="true" />
      <v-flex xs6>
        <img :src="cover" alt="book cover" class="cover">
      </v-flex>
      <v-flex xs6>
        <book-details-tab :book="book" :owned="bookOwned" :read="bookRead" :addAuthor="addAuthor" :markAsRead="markAsRead"></book-details-tab>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import BookDetailsTab from './BookDetailsTab';
import FriendsTab from './FriendsTab';

export default {
  data () {
    return {};
  },
  components: {
    BookDetailsTab,
    FriendsTab
  },
  computed: {
    ...mapGetters(['book', 'bookOwned', 'bookRead', 'bookCommunityRating', 'friendsBook', 'loading']),
    cover () {
      return this.$store.getters.book.data.attributes.cover_url;
    }
  },
  created () {
    this.$store.dispatch('fetchBookDetails', { id: this.$route.params.id });
    this.$store.dispatch('showFriendsBooks', { bookID: this.$route.params.id });
  },
  methods: {
    addAuthor () {
      this.$store
        .dispatch('addBookToCollecation', { bookID: this.book.data.attributes.id })
        .then(() => {});
    },
    markAsRead () {
      this.$store.dispatch('markAsRead', { bookID: this.book.data.attributes.id });
    },
    showFriendProfile (id) {
      this.$router.push({ path: `/user/${id}` });
    }
  }
};
</script>

<style>
.details {
  width: 100%;
  height: 100%;
}
</style>
