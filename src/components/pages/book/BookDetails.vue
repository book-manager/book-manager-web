<template>
  <section>
      <el-row :gutter="10" class="book-details">
          <el-col :xs="24" :lg="12" :xl="12">
            <img class="cover" :src="book.cover_url"/>
          </el-col>
          <el-col :xs="24" :lg="12" :xl="12">
            <div class="tags">
              <el-button v-if="!bookOwned" type="primary" plain>Add as owned</el-button>
              <el-tag v-if="bookOwned" type="primary">Owned</el-tag>
              <el-button v-if="!bookFavourite" type="danger" plain>Add to favourite</el-button>
              <el-tag v-if="bookFavourite" type="primary">Owned</el-tag>
            </div>
            <p class="title">{{ book.title }}</p>
            <p class="description"> {{ book.description }}</p>
          </el-col>
      </el-row>
      <!-- <div class="books">
        <el-table
            :data="authorDetails.books"
            style="width: 100%"
            @row-click="showBook">
            <el-table-column
              prop="title"
              label="Title">
            </el-table-column>
            <el-table-column
              label="Owned">
              <template slot-scope="scope">
              {{ scope.row.owned ? "Owned" : "Not owned"}}
              </template>
          </el-table-column>
          </el-table>
      </div> -->
  </section> 
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      bookFavourite: false
    };
  },
  computed: {
    ...mapGetters(['book', 'bookOwned', 'bookRead', 'bookCommunityRating', 'friendsBook', 'loading'])
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
  .cover {
    max-width: 50%;
  }

  .description {
    font-size: 1.5em;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
    line-height: 1.5em;
  }

  .title {
    font-weight: bold;
    font-size: 6em;
  }

  .book-details {
    padding-top: 1em;
  }

  .tags {
    padding: 1em;
  }
</style>
