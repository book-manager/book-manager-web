<template>

</template>

<script>
export default {
  data () {
    return {
      friends: []
    };
  },
  created () {
    this.$store.dispatch('fetchFriends').then((response) => {
      this.friends = response;
    });
  },
  methods: {
    viewProfile (id) {
      this.$router.push({ path: `/user/${id}` });
    }
  }
};
</script>

<style>
  .lista {
    width: 100%;
  }
</style>
