<template>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xl6>
          <img class="user-avatar" :src="user.attributes.avatar_url" :alt="user.attributes.name"> 
        </v-flex>
        <v-flex xl6>
          <v-layout row wrap>
              <p class="user-name">{{ user.attributes.name }} {{ user.attributes.surname }}
                 <v-chip v-show="friendship" color="green">Friend</v-chip>
              </p> 
              <v-btn v-show="!incoming && (!friendship && !pending)"
                color="primary"
                :loading="false"
                @click="addFriend"
              >
                Add 
              </v-btn>
              <p v-if="pending">
                <v-chip color="yellow">Pending</v-chip>
              </p>

              <v-btn v-show="incoming" color="green" @click="acceptRequest">
                Accept
              </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      user: {},
      pending: false,
      friendship: false
    };
  },
  async created () {
    const userResponse = await this.$store.dispatch('getUserDetails', { id: this.$route.params.id });
    this.user = userResponse.data.data;

    this.$store.dispatch('checkIncomingFriendship', { id: this.$route.params.id });

    const friendshipResponse = await this.$store.dispatch('checkUserFriendship', { id: this.$route.params.id });
    console.log(friendshipResponse);

    const friendship = friendshipResponse.data.data;
    if (friendship.id === '') {
      this.friendship = false;
      this.pending = false;
    } else if (friendship.attributes.pending === true) {
      this.friendship = false;
      this.pending = true;
    } else if (friendship.id !== '') {
      this.friendship = true;
      this.$store.dispatch('setIncoming', { incoming: false });
    }
  },
  computed: {
    ...mapGetters(['incoming']),
    showPending () {
      return this.$store.getters.user_pending_friendship;
    },
    showAddFriend () {
      console.log(this.$store.getters.user_pending_friendship);
      return (this.$store.getters.user_pending_friendship);
    }
  },
  methods: {
    addFriend () {
      this.$store.dispatch('addFriend', { id: this.$route.params.id });
    },
    async acceptRequest () {
      const result = await this.$store.dispatch('acceptFriend', { id: this.$route.params.id });
      if (result.status === 2000) {
        this.friendship = true;
      }
    }
  }
};
</script>

<style scoped>
  .user-avatar {
    width: 60%;
  }

  .user-name {
    font-size: 4em;
  }
</style>
