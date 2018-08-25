<template>
  <v-container grid-list-md text-xs-center elevation-5>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- <v-alert :value="success" type="success" transition="scale-transition">
      {{ successMsg }}
    </v-alert> -->
    <v-layout row wrap>
      <v-flex xs6>
        <div>
          <img :src="authorAvatar" alt="author avatar">
        </div>
        <div>
          <p class="author-name">{{ authorDetails.data.attributes.name }} {{ authorDetails.data.attributes.surname }}</p>
        </div>
        <div>
          <p>{{ authorDetails.data.attributes.description }}</p>
        </div>
      </v-flex>
      <v-flex xs6>
        <v-btn v-if="!authorOwned" color="primary" :loading="false" @click="addAuthor">
          Add to library
        </v-btn>

        <p v-if="authorOwned">
          <v-chip color="green">In library</v-chip>
        </p>
        <v-card>
           <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
          <v-data-table :headers="headers" :items="authorDetails.included" hide-actions class="elevation-1" :search="search">
            <template slot="items" slot-scope="props" value="selected">
              <td @click="showBook(props.item.attributes.id)">{{ props.item.attributes.title }}</td>
              <td v-if="props.item.owned">✅ </td>
              <td v-else>❌</td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      headers: [
        { text: 'Title', value: 'title', sortable: false, align: 'left' },
        { text: 'Owned', value: 'owned', sortable: false, align: 'left' }
      ],
      search: ''
    };
  },
  computed: {
    ...mapGetters(['loading', 'authorDetails', 'authorOwned', 'authorBooks', 'authorOwnedUser']),
    booksFiltered () {
      return this.$store.getters.authorBooks.filter(book => {
        if (this.search) {
          return book.title.includes(this.search);
        } else {
          return book;
        }
      });
    },
    authorAvatar () {
      return this.$store.getters.authorDetails.data.attributes.avatar_url;
    }
  },
  created () {
    this.$store.dispatch('fetchAuthorDetails', { id: this.$route.params.id });
  },
  methods: {
    addAuthor () {
      this.$store
        .dispatch('createOwnership', { author_id: this.$route.params.id })
        .then(response => {
          this.success = true;
          this.successMsg = `${this.author.name} ${
            this.author.surname
          } has been added to your collection`;
        });
    },
    showBook (id) {
      this.$router.push({ path: `/books/${id}` });
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
