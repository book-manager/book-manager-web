<template>
  <section>
    <div>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="author-form md-layout-item md-small-size-100 md-size-50">
          <md-card-header>
            <div class="md-title">Add new author</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('firstName')">
                  <label for="first-name">First Name</label>
                  <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                  <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Last Name</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
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
              <md-field :class="getValidationClass('birthDate')">
                  <label for="birthDate">Birth date</label>
                <md-datepicker name="birthDate" id="birthDate" v-model="form.birthDate" />
                <span class="md-error" v-if="!$v.form.birthDate.required">The description is required</span>
                <span class="md-error" v-else-if="!$v.form.birthDate.minlength">Invalid description</span>
              </md-field>
            </div>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
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
        firstName: null,
        lastName: null,
        description: null,
        birthDate: null
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
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
          console.log(response);
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
