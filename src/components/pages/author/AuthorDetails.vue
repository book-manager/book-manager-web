<template>
      <!-- <el-row :gutter="10" class="author-details">
          <el-col :xs="24" :lg="12" :xl="12"><img :src="authorDetails.avatar_url"/></el-col>
          <el-col :xs="24" :lg="12" :xl="12">
            <div>
              <el-button v-if="!authorOwned" type="primary" @click="addAuthor" >Add as owned</el-button>
              <el-tag v-if="authorOwned" type="primary">Owned</el-tag>
              <el-button v-if="!authorFavourite" type="danger" plain>Add to favourite</el-button>
              <el-tag v-if="authorFavourite" type="primary">Owned</el-tag>
            </div>
            <p class="author-name">{{ authorDetails.name }} {{ authorDetails.surname }}</p>
            <p class="description"> {{ authorDetails.description }}</p>
          </el-col>
      </el-row>
      <div class="books">
        <el-table
            :data="authorDetails.books"
            style="width: 100%"
            @row-click="showBook">
            <el-table-column
              prop="title"
              label="Title">
            </el-table-column>
            <el-table-column
              label="Owned">
              <template slot-scope="scope">
              {{ scope.row.owned ? "Owned" : "Not owned"}}
              </template>
          </el-table-column>
          </el-table>
      </div> -->
<section>
  <Row>
    <Col :lg="6" :xs="24">
      <img :src="authorDetails.avatar_url"/>
    </Col>
    <Col :lg="12" :xs="24" offset="-2">
        <Button v-if="!authorOwned" type="primary" @click="addAuthor" icon="md-add" ghost>Add as owned</Button>
        <Tag v-if="authorOwned" type="dot" color="success">Owned</Tag>
        <Button type="error" icon="ios-heart" ghost>Add as favourite</Button>

        <p class="author-name">{{ authorDetails.name }} {{ authorDetails.surname }}</p>
        <p class="description"> {{ authorDetails.description }}</p>
    </Col>
  </Row>
  <Table class="books" :columns="headers" :data="authorDetails.books" @on-row-click="showBook"></Table>
</section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      search: '',
      authorFavourite: false,
      headers: [
        {
          title: 'Title',
          key: 'title'
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['loading', 'authorDetails', 'authorOwned', 'authorBooks', 'authorOwnedUser']),
    booksFiltered () {
      return this.$store.getters.authorBooks.filter(book => {
        if (this.search) {
          return book.title.includes(this.search);
        } else {
          return book;
        }
      });
    }
  },
  created () {
    this.$store.dispatch('fetchAuthorDetails', { id: this.$route.params.id });
  },
  methods: {
    addAuthor () {
      this.$store
        .dispatch('createOwnership', { author_id: this.$route.params.id });
    },
    showBook (selection, row) {
      this.$router.push({ path: `/books/${selection.id}` });
    }
  }
};
</script>


<style scoped>
  .author-name {
    font-weight: bold;
    font-size: 3em;
  }

  .author-details {
    padding-top: 1em;
  }

  .description {
    font-size: 1em;
    white-space: pre-wrap;
    line-height: 1.5em;
    max-width: 70%;
    margin: auto;
  }

  .books {
    padding: 2em;
  }
</style>
