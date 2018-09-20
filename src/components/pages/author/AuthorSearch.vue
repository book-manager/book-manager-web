<template>
  <div class="author-search">
    <el-row>
      <el-col :span="18">
        <el-input
          placeholder="Search for author"
          v-model="query"
          clearable>
        </el-input>
      </el-col>
      <el-col :span="6" class="search-button">
          <el-button type="primary" @click="search" plain>Search</el-button>
      </el-col>

      <el-col :span="24" class="search-results">
        <el-table
          :data="authors"
          style="width: 100%"
          @row-click="showDetails">
          <el-table-column
            prop="name"
            label="Name">
          </el-table-column>
          <el-table-column
            prop="surname"
            label="Surname">
          </el-table-column>
          <el-table-column
            label="Books">
            <template slot-scope="scope">
             {{ scope.row.books.length }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      query: '',
    };
  },
  methods: {
    search () {
      this.$store.dispatch('searchAuthor', { query: this.query });
    },
    showDetails (row, event, column) {
      this.$router.push({ path: `/author/${row.id}` });
    }
  },
  computed: mapGetters(['authors'])
};
</script>

<style scoped>
  .author-search {
    width: 80%;
    text-align: center;
    margin: auto;
    padding-top: 1em;
  }

  .search-button {
    text-align: left;
    padding-left: 1em;
  }

  .search-results {
    padding-top: 1em;
  }
</style>
