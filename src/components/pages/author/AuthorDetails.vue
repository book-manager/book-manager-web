<template>
  <v-container grid-list-md text-xs-center elevation-5>
     <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-alert
      :value="success"
      type="success"
      transition="scale-transition"
    >
      {{ successMsg }} 
    </v-alert>
    <v-layout row wrap>
      <v-flex xs6>
        <div>
          <img :src="author.avatar_url" alt="author avatar">
        </div>
        <div>
          <p class="author-name">{{ author.name }} {{ author.surname }}</p>
        </div>
        <div>
          <p>{{ author.description }}</p>
        </div>
      </v-flex>
      <v-flex xs6>
        <v-btn v-if="!owned"
          color="primary"
          :loading="false"
          @click="addAuthor"
        >
          Add to library
        </v-btn>

        <p v-if="owned">
          <v-chip color="green">In library</v-chip>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      author: {},
      owned: false,
      loading: false,
      success: false,
      successMsg: ''
    };
  },
  created () {
    this.loading = true;
    this.$store.dispatch('fetchAuthorDetails', { id: this.$route.params.id }).then((response) => {
      this.author = response.data;

      this.$store.dispatch('checkOwned', { id: this.$route.params.id }).then((response) => {
        switch (response) {
          case true:
            this.owned = true;
            this.loading = false;
            break;
          case false:
            this.owned = false;
            this.loading = false;
            break;
          default:
            break;
        }
      });
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
