<template>
  <div class="author-search">
      <el-col :span="24" class="search-results">
        <el-table
          :data="authors"
          style="width: 100%"
          @row-click="viewProfile">
          <el-table-column
            prop="name"
            label="Name">
          </el-table-column>
          <el-table-column
            prop="surname"
            label="Surname">
          </el-table-column>
          <!-- <el-table-column
            label="Books">
            <template slot-scope="scope">
             {{ scope.row.books.length }}
            </template>
          </el-table-column> -->
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data () {
    return {
      authors: []
    };
  },
  methods: {
    viewProfile (row, event, column) {
      this.$router.push({ path: `/author/${row.id}` });
    }
  },
  created () {
    this.$store.dispatch('fetchAuthors').then(response => {
      this.authors = response.data.data;
    });
  },
};
</script>

<style>
  .author-search {
    padding: 1em;
  }
</style>