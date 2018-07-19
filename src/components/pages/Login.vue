<template>
    <v-container xs-6 text-md-center elevation-3>
     <v-layout align-center justify-center row fill-height>
       <v-flex>
          <v-form>
            <v-text-field
            label="Email"
            v-model="email"
            required
            :rules="emailRules">
            </v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              required
              min="8"
              type="password"
              counter
            ></v-text-field>
            <v-btn
              color="primary"
              flat
              @click="login"
              :disabled="!valid"
            >
              Login
            </v-btn>
          </v-form>
       </v-flex>
      </v-layout> 
    </v-container>
</template>

<!-- TODO: Validation -->
<script>
  export default {
    data: function () {
      return {
        email: '',
        password: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      };
    },
    methods: {
      login () {
        this.pending = true;
        this.$store.dispatch('login', this)
          .then(() => {
            this.pending = false;
            this.$router.push({name: 'home'});
          })
          .catch(err => {
            this.pending = false;
            this.error = err;
          });
      },
    },
    computed: {
      valid () {
        return this.password.length >= 7;
      }
    }
  };
</script>

<!-- TODO: Make it vertically center -->
<style scoped>
  .login-form {
    width: 30%;
    text-align: center;
    margin: auto;
  }

  .input {
    margin: 3px;
  }
</style>
