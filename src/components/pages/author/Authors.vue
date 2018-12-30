<template>
  <section class="authors">
    <Tabs value="authors">
      <TabPane label="All" name="all">
        <Table border :columns="headers" :data="all"  @on-row-click="viewProfile"></Table>
      </TabPane>
      <TabPane label="Owned" name="Owned">
        <Table border :columns="headers" :data="authors"  @on-row-click="viewProfile"></Table>
      </TabPane>
    </Tabs>
  </section>
</template>
<script>

export default {
  data () {
    return {
      authors: [],
      all: [],
      loading: true,
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
    viewProfile (selection, row) {
      this.$router.push({ path: `/author/${selection.id}` });
    }
  },
  created () {
    this.$store.dispatch('fetchAuthors').then(response => {
      this.authors = response.data.data;
    });
    this.$store.dispatch('allAuthors').then(response => {
      this.all = response.data.data;
    })
  },
};
</script>

<style>
  .authors {
    max-width: 90%;
    position: relative;
    margin: auto;
  }
</style>