<template>
  <v-container grid-list-md text-xs-center elevation-5>
    <v-layout row wrap>
      <v-flex xs6>
        <img :src="cover" alt="book cover" class="cover">
      </v-flex>
      <v-flex xs6>
        <v-tabs fixed-tabs icons-and-text dark>
          <v-tab key="info">
            Info
            <v-icon>info</v-icon>
          </v-tab>
          <v-tab key="friends">
            Friends
            <v-icon>account_box</v-icon>
          </v-tab>
          <v-tab-item key="info">
            <v-card-text>
              <book-details-tab :book="book" :owned="bookOwned" :read="bookRead" :addAuthor="addAuthor" :markAsRead="markAsRead"></book-details-tab>
            </v-card-text>
          </v-tab-item>
          <v-tab-item key="friends">
            <v-card-text>
              <friends-tab :friends="friendsBook" :showFriendProfile="showFriendProfile"/>
            </v-card-text>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
    <vue-element-loading :active="loading" :is-full-screen="true" />

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
</style>
