<template>
  <section class="login-form">
    <form>
      <at-input v-model="email" placeholder="Email" class="input"></at-input>
      <at-input v-model="password" placeholder="Password" type="password" class="input">Password</at-input>
      <at-button type="primary" hollow @click="login">Login</at-button>
    </form>
  </section>
</template>

<!-- TODO: Validation -->
<script>
  export default {
    data: function () {
      return {
        email: '',
        password: '',
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
