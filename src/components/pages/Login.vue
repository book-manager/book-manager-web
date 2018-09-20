<template>
  <el-form ref="form" :model="form" label-width="120px" class="login-form">
    <el-form-item label="Email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="pass">
      <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<!-- TODO: Validation -->
<script>
  export default {
    data: function () {
      return {
        form: {
          email: '',
          password: ''
        }
      };
    },
    methods: {
      login () {
        this.pending = true;
        this.$store.dispatch('login', this.form)
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
