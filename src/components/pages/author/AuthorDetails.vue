<template>
  <v-container grid-list-md text-xs-center elevation-5>
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

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      author: {}
    };
  },
  created () {
    this.loading = true;
    this.$store.dispatch('fetchAuthorDetails', { id: this.$route.params.id }).then((response) => {
      this.author = response.data;
    })
  }
};
</script>


<style scoped>
  .author-name {
    font-weight: bold;
    font-size: 2em;
  }
</style>
