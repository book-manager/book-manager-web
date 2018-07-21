<template>
  <el-button type="primary" plain @click="addBook">Primary</el-button>
</template>

<script>
export default {
  created () {

  },
  methods: {
    addBook () {
      this.$router.push({name: 'booksNew'});
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
