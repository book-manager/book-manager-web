<template>
  <section>
    <v-container fluid grid-list-xl>
      <v-layout row justify-space-between>
        <v-flex xs8 xl10>
           <v-text-field
              name="search"
              label="Search for a friend"
              id="searchBox"
              v-model="query"
            ></v-text-field>
        </v-flex>
        <v-flex xs4 xl2>
          <v-btn @click="search">Search</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row elevation-5>
        <v-list >
          <template v-for="user in users">
            <v-list-tile avatar :key="user.id" class="user-list">
              <v-list-tile-avatar>
                <img :src="user.avatar_url">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ user.name }} {{ user.surname }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  data () {
    return {
      query: ''
    };
  },
  methods: {
    search () {
      this.$store.dispatch('searchUsers', this);
    },
    addFriend (id) {
      // this.$store.dispatch('addFriend', { id: id });
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
</style>
