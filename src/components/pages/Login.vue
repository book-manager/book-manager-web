<template>
  <section>
    <div class="login-form">
      <el-form ref="loginForm" :model="loginForm" label-width="120px">
        <el-form-item label="Email">
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<!-- TODO: Validation -->
<script>
  export default {
    data: function () {
      return {
        loginForm: {
          email: '',
          password: ''
        },
        loginRules: {
          email: [
              { required: true, message: 'Please fill in the email', trigger: 'blur' }
          ],
          password: [
              { required: true, message: 'Please fill in the password.', trigger: 'blur' },
              { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      login () {
        this.pending = true;
        this.$store.dispatch('login', this.loginForm)
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
    width: 20%;
    text-align: center;
    margin: auto;
  }
</style>
