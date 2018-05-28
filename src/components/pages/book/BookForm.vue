<template>
  <section>
    <div>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="author-form md-layout-item md-small-size-100 md-size-50">
          <md-card-header>
            <div class="md-title">Add new book</div>
          </md-card-header>

          <md-card-content>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('title')">
                <label for="title">Title</label>
                <md-input name="title" id="first-name" v-model="form.title" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.title.required">The title is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('author')">
                <md-autocomplete v-model="form.author.name" :md-options="authors" @md-changed="getAuthors" @md-opened="getAuthors">
                  <label>Author</label>
                  <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }} {{ item.surname }}</template>
                </md-autocomplete>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('description')">
                <label for="description">Description</label>
                <md-textarea name="description" id="description" v-model="form.description" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.description.required">The description is required</span>
                <span class="md-error" v-else-if="!$v.form.description.minlength">Invalid description</span>
              </md-field>
            </div>
            
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('tags')">
                <md-chips v-model="form.tags" md-placeholder="Add tags"></md-chips>
              </md-field>
            </div>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="sending">Create book</md-button>
          </md-card-actions>
        </md-card>
        <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
      </form>
    </div>
  </section>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
  } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    data: () => ({
      form: {
        title: null,
        name: '',
        lastName: null,
        description: null,
        birthDate: null,
        author: {
          name: ''
        },
        tags: []
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      authors: []
    }),
    validations: {
      form: {
        title: {
          required,
        },
        name: {
          required
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        description: {
          required,
          minLength: minLength(30)
        },
        birthDate: {
          required,
        },
      }
    },
    methods: {
      getAuthors (searchTerm) {
        this.authors = new Promise((resolve, reject) => {
          this.$store.dispatch('searchAuthor', { query: searchTerm }).then((response) => {
            resolve(response.data.authors)
          });
        });
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
      },
      addAuthor (form) {
        this.sending = true
        this.$store.dispatch('addAuthor', { form }).then((response) => {
          this.sending = false;
          this.$router.push({ path: `/author/details/${response.data.id}` });
        })
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.addAuthor(this.form)
        }
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
