<template>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xl6>
          <img class="user-avatar" :src="user.avatar_url" :alt="user.name"> 
        </v-flex>
        <v-flex xl6>
          <v-layout row wrap>
            <v-flex xl12>
              <p class="user-name">{{ user.name }} {{ user.surname }}</p>
              <p v-if="is_friend">
                <v-chip color="green">Friend</v-chip>
              </p>
                 <v-btn v-else
                  color="primary"
                  :loading="false"
                  @click.native="addFriend"
                >
                  Add 
                </v-btn>
            </v-flex>
            <v-flex xl12>
              <p>Member from: {{ user.created_at }}</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      error: false,
      user: {},
      is_friend: false
    };
  },
  created () {
    this.loading = true;
    this.$store.dispatch('getUserDetails', { id: this.$route.params.id }).then((response) => {
      this.user = response;
      this.$store.dispatch('checkUserFriendship', { friendId: this.$route.params.id }).then((response) => {
        if (response.data.is_friend === true) {
          this.is_friend = true;
        }
      });
    }).catch((error) => {
      this.loading = false;
      this.error = true;
      console.log(error);
    });
  },
  methods: {
    addFriend () {
      this.$store.dispatch('addFriend', { id: this.$route.params.id }).then((response) => {
        console.log(response);
      })
    }
  }
}
</script>

<style scoped>
  .user-avatar {
    width: 60%;
  }

  .user-name {
    font-size: 4em;
  }
</style>
