<template>
  <section>
    <v-container elevation-3>
      <v-form v-model="valid">
        <v-text-field
          v-model="title"
          :rules="titleRules"
          label="Title"
          required
        ></v-text-field>
        <v-text-field
          v-model="isbn"
          :rules="isbnRules"
          label="ISBN"
          required
        ></v-text-field>
        <v-textarea
          name="input-7-1"
          label="Description"
          value=""
          hint="Short book biography"
          v-model="description"
          :rules="descriptionRules"
        ></v-textarea>
        <b-autocomplete
            v-model="name"
            :data="authors"
            placeholder="e.g. Fight Club"
            field="full_name"
            :loading="isFetching"
            @input="getAsyncData"
            @select="option => selected = option">

            <template slot-scope="props">
                {{ props.option.name }} {{ props.option.surname }}
            </template>
        </b-autocomplete>
        <v-btn
              color="primary"
              @click="addBook"
            >
              Add
            </v-btn>
      </v-form>
    </v-container>
  </section>
</template>

<script>
  export default {
    data: () => ({
      name: '',
      selected: null,
      isFetching: false,
      title: '',
      description: '',
      isbn: '',
      valid: false,
      titleRules: [
        v => !!v || 'Title is required',
      ],
      descriptionRules: [
        v => !!v || 'Description is required',
      ],
      isbnRules: [
        v => !!v || 'ISBN is required',
        v => v.length === 13 || v.length === 10 || 'ISBN must be 10 or 13 characters'
      ],
      authors: [],
    }),
    methods: {
      getAsyncData () {
        this.authors = [];
        this.isFetching = true;
        this.$store.dispatch('searchAuthor', { query: this.name }).then((response) => {
          this.authors = response.data.authors;
        });
      },
      addBook () {
        this.$store.dispatch('addBook', { title: this.title, description: this.description, author_id: this.selected.id, isbn: this.isbn }).then((response) => {
          console.log(response.data);
          this.$router.push({ path: `/book/details/${response.data.data.id}` });
        })
      }
    }
  };
</script>

<style scoped>
</style>
