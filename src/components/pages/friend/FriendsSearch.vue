<template>
  <section class="friends">
    <div class="search-bar">
      <Input v-model="query" placeholder="Search for a friends" />
      <Button class="search-button" type="primary" @on-click="search" ghost>Search</Button>
    </div>
    <div class="search-results">
      <Table border :columns="headers" :data="users" @on-row-click="viewProfile"></Table>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      headers: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Surname',
          key: 'surname'
        }
      ]
    };
  },
  methods: {
    search () {
      this.$store.dispatch('searchUsers', this.query);
    },
    viewProfile (id) {
      this.$router.push({ path: `/user/${id}` });
    }
  },
  computed: {
    users () {
      return this.$store.getters.foundUsers;
    }
  }
};
</script>

<style scoped>
  .friends {
    max-width: 90%;
    position: relative;
    margin: auto;
  }
  .search-bar {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1em;
  }

  .search-button {
    margin-left: 1em;
  }
</style>
