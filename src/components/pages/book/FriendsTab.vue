<template>
  <v-container>
    <v-list one-line elevation-5>
      <template v-for="friend in friends">
        <v-list-tile avatar :key="friend.id" @click="showFriendProfile(friend.id)">
          <v-list-tile-avatar>
            <img :src="friend.avatar_url" alt="Friend profile picture">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ friend.name }} {{ friend.surname }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-container>
</template>

<script>
export default {
  props: {
    friends: Array,
    showFriendProfile: Function,
  },
};
</script>

<style>

</style>
