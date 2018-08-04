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
              <p v-if="pending">
                <v-chip color="yellow">Pending</v-chip>
              </p>
              <v-btn v-if="!is_friend"
                color="primary"
                :loading="false"
                @click="addFriend"
              >
                Add 
              </v-btn>
              <v-btn v-if="incoming"
                color="green"
                :loading="false"
                @click="addFriend"
              >
                Accept
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
      is_friend: false,
      pending: false,
      incoming: false
    };
  },
  created () {
    this.loading = true;
    this.$store.dispatch('getUserDetails', { id: this.$route.params.id }).then((response) => {
      this.user = response;
      this.$store.dispatch('checkUserFriendship', { friendId: this.$route.params.id }).then((response) => {
        switch (response.data.friendship) {
          case true:
            this.is_friend = true;
            break;
          case false:
            this.is_friend = false;
            break;
          case 'pending':
            this.pending = true;
            break;
          case 'initiated':
            this.incoming = true;
            break;
          default:
            break;
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
