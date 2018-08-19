<template>
  <section>
    <v-container class="author-info">
      {{ book.author_name }} {{ book.author_surname }}
    </v-container>
    <v-container class="book-title">
      {{ book.title }}
    </v-container>
    <v-chip label v-if="owned" color="green">Owned</v-chip>
    <v-chip label v-if="read" color="grey">Read</v-chip>

    <v-btn v-if="!owned" color="primary" @click="addAuthor">
      Add to library
    </v-btn>
    <v-btn v-if="!read" color="grey" @click="markAsRead">
      Mark as read
    </v-btn>
    <v-container>
      <!-- Your: -->
      <!-- <vue-stars v-model="value" name="demo" active-color="#ffdd00" inactive-color="#999999" shadow-color="#ffff00" hover-color="#dddd00" :max="5" :readonly="false" char="★" inactive-char="" class="" /> -->
    </v-container>
    <!-- Community -->
    <!-- <vue-stars name="demo" active-color="#ffdd00" inactive-color="#999999" shadow-color="#ffff00" hover-color="#dddd00" :max="5" :value=bookCommunityRating :readonly="bookOwned" char="★" inactive-char="" class="" /> -->
    <v-container class="description">
      {{ book.description }}
    </v-container>
  </section>
</template>

<script>
export default {
  props: {
    book: Object,
    owned: Boolean,
    read: Boolean,
    addAuthor: Function,
    markAsRead: Function
  }
};
</script>

<style>
.author-info {
  font-size: 2em;
  padding: 0%;
}

.book-title {
  font-size: 3em;
  padding: 0%;
}

.cover {
  width: 50%;
}

.description {
  font-size: 1.5em;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
  line-height: 1.5em;
}
</style>
