<template>
  <section class="bg">
      <Row :gutter="16">
        <Col :lg="12" :xs="24">
        <Alert v-if="error" class="error" type="error" closable>{{ errorMessage }}</Alert>
            <div class="login-title">
              <h1>BookManager - Take control over your library</h1>
            </div>
            <Form ref="form" :model="form" :rules="ruleInline" inline>
              <FormItem prop="email">
                <Input type="text" v-model="form.email" placeholder="Email">
                    <Icon type="mail" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" @click="login('form')">Signin</Button>
              </FormItem>
            </Form>
        </Col>
      </Row>
    <div class=credit>
      <a href="https://www.freepik.com/free-vector/group-of-people-reading-and-borrowing-books_3226177.htm">Designed by Rawpixel.com</a>
    </div>
  </section>
</template>

<!-- TODO: Validation -->
<script>
  export default {
    data: function () {
      return {
        form: {
          email: '',
          password: ''
        },
        ruleInline: {
          email: [
            { required: true, message: 'Please fill in the email', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 8 characters', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      login (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$store.dispatch('login', this.form)
            .then(() => {
              this.$router.push({name: 'home'});
            });
          };
        })
      }
    },
    computed: {
      valid () {
        return this.password.length >= 7;
      },
      errorMessage () {
        return this.$store.getters.errorMessage;
      },
      error () {
        return this.$store.getters.error;
      },
      disabled () {
        return false;
      }
    }
  };
</script>

<style scoped>
  .error {
    max-width: 70%;
    margin: auto;
  }
  .login-form {
    width: 30%;
    text-align: center;
    margin: auto;
  }

  .input {
    margin: 3px;
  }

  .credit {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .login-title {
    padding: 1em;
  }
</style>
