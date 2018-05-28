<template>
   <div class="md-layout md-gutter author-info md-elevation-10">
    <div class="md-layout-item md-alignment-center-center">
      <div class="author-avatar">
        <img :src="author.avatar_url" alt="">
      </div>
      <div>
        <p class="author-name">{{ author.name }} {{ author.surname }}</p>
      </div>
      <div class="description">
        <div class="author-description">
          <p>{{ author.description }}</p>
        </div>
      </div>
    </div>
    <div class="md-layout-item books">

    </div>
  </div> 
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
      console.log(response);
      this.author = response.data;
    })
  }
};
</script>


<style scoped>
  .author-info {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-align: center;
    padding-top: 7em; 
  }

  .author-avatar {
    padding-top: 1em;
  }

  .author-name {
    font-weight: bold;
    font-size: 2em;
  }

  .description {
    display: flex;
    justify-content: center;
  }

  .author-description {
    max-width: 60%;
    font-size: 1.3em;
  }
</style>
