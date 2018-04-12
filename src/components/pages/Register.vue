<template>
  <section>
    <v-container grid-list-md text-xl-center
      align-center=true class="register-box .mx-auto " elevation-3
    >
      <v-layout>
        <v-flex xs12>
          <v-form v-model="formValid">
            <v-text-field
              label="First name"
              v-model="first_name"
              required
            ></v-text-field>
            <v-text-field
              label="Surname"
              v-model="last_name"
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="email"
              required
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              required
              min="8"
              type="password"
              counter
            ></v-text-field>
            <v-text-field
              label="Repeat password"
              v-model="cpassword"
              required
              min="8"
              type="password"
              counter
            ></v-text-field>
            <v-btn
                @click="register"
                :disabled="!valid"
              >
                Register
              </v-btn>
              <v-btn @click="clear">clear</v-btn>
            </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
  import Card from '../layout/Card.vue';

  export default {
    data: function () {
      return {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        cpassword: '',
        pending: false,
        error: '',
        formValid: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      };
    },
    methods: {
      register (e) {
        e.preventDefault();
        this.pending = true;
        this.$store.dispatch('register', this)
          .then((response) => {
            this.pending = false;
            this.$router.push({path: '/login'});
          })
          .catch(err => {
            this.error = err;
            this.pending = false;
          });
      },
      clear () {

      },
    },
    components: {
      'card': Card,
    },
    computed: {
      valid () {
        if (this.first_name !== '' &&
            this.last_name !== '' &&
            this.email !== '' &&
            this.password !== '' &&
            this.cpassword !== ''
        ) {
          return true;
        }

        return false;
      }
    }
  };
</script>

<style scoped>
  .register-box {
    min-width: 40%;
  }
</style>

