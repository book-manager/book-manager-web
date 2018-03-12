<template>
  <section>
    <el-table
        :data="authors"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="surname"
          label="Surname">
        </el-table-column>
      </el-table>
    <el-button type="primary" plain @click="addAuthor">Primary</el-button>
  </section>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  methods: {
    addAuthor () {
      this.$router.push({name: 'authorNew'});
    }
  },
  created () {
    this.$store.dispatch('fetchAuthors');
  },
  computed: {
    authors () {
      return this.$store.getters.authors;
    }
  }
};
</script>

<style scoped>

</style>
