<template>
  <div class="card">
    <div @click="showBookDetails(collection.id)" class="card-content">
      <img :src="collection.thumbnail_url" :alt="collection.title">
      <h4 class="card-title">{{ collection.title }}</h4>
      <!-- <p>{{ collection.author.name }} {{ collection.author.surname }}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collection: Object,
    showBookDetails: Function
  },
  name: 'card'
};
</script>

<style scoped>
.card {
   background: rgba(#f5f5f5, 0.47);
   padding: 3px;
   margin: 1em 0 1em;
   cursor: pointer;
   transition: all 100ms ease-in-out;
   display: inline-block;
   text-align: center;
   width: 250px;
 }

 .card:hover {
   transform: translateY(-0.5em);
   background: #EBEBEB;
 }

 .covers {
   overflow: scroll;
 }

 img {
   display: block;
   margin: auto;
 }
</style>