<template>
</template>

<script>
export default {
  computed: {
    friends () {
      return this.$store.getters.incoming_requests;
    }
  },
  methods: {
    viewProfile (id) {
      this.$router.push({ path: `/user/${id}` });
    }
  }
};
</script>

<style scoped>
  .lista {
    width: 100%;
  }
</style>
