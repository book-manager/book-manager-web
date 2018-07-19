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
      </v-form>
    </v-container>
  </section>
</template>

<script>
  export default {
    data: () => ({
      title: '',
      description: '',
      isbn: '',
      year: '',
      categories: [],
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
      form: {
        title: null,
        name: '',
        lastName: null,
        description: null,
        birthDate: null,
        author: '',
        tags: []
      },
      searchQuery: null,
      userSaved: false,
      sending: false,
      lastUser: null,
      authors: []
    }),
    methods: {
      getAuthors (searchTerm) {
        this.authors = new Promise((resolve, reject) => {
          this.$store.dispatch('searchAuthor', { query: searchTerm }).then((response) => {
            resolve(response.data.authors);
          });
        });
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName];

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset();
        this.form.firstName = null;
        this.form.lastName = null;
      },
      addBook (form) {
        this.sending = false;
        this.$store.dispatch('addBook', { form }).then((response) => {
          this.$router.push({ path: `/book/details/${response.data.id}` });
        })
      },
      validateUser () {
        this.$v.$touch()
        console.log('validate');
        this.addBook(this.form);
      }
    }
  };
</script>

<style scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .author-form {
    margin: 0 auto;
  }
</style>
