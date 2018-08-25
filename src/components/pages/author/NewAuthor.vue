<template>
  <section>

    <v-container elevation-3>
      <v-alert
        :value="error"
        type="error"
      >
        {{ errorMessage }}
      </v-alert>
      <v-form v-model="valid">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="surname"
          :rules="surnameRules"
          label="Surname"
          required
        ></v-text-field>
        <v-textarea
          name="input-7-1"
          label="Description"
          value=""
          hint="Short author biography"
          v-model="description"
          :rules="descriptionRules"
        ></v-textarea>

        <v-btn
          :disabled="!valid"
          @click="addAuthor"
        >
          Add author
        </v-btn>
      </v-form>
    </v-container>
  </section>
</template>

<script>
  export default {
    data: () => ({
      error: false,
      errorMessage: '',
      valid: false,
      name: '',
      surname: '',
      description: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      surnameRules: [
        v => !!v || 'Surname is required',
      ],
      descriptionRules: [
        v => !!v || 'Description is required',
      ]
    }),
    methods: {
      addAuthor (form) {
        this.$store.dispatch('addAuthor', { name: this.name, surname: this.surname, description: this.description }).then(response => {
          this.$router.push({ path: `/author/${response.data.id}` });
        }).catch((error) => {
          this.error = true;
          this.errorMessage = error;
        });
      }
    }
  };
</script>

<style scoped>
</style>
