<template>
  
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {
    this.$store.dispatch('fetchAuthors');
  }
}
</script>

<style scoped>

</style>


