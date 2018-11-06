<template>
  <Form ref="form" :model="form" class="author-form">
    <FormItem prop="surname">
      <Input type="text" v-model="form.name" placeholder="Name" />
    </FormItem>
    <FormItem prop="surname">
      <Input type="text" v-model="form.surname" placeholder="Surname" />
    </FormItem>
    <FormItem prop="description">
      <Input type="textarea" v-model="form.description" placeholder="Description" />
    </FormItem>

    <FormItem>
      <Upload
        :before-upload="handleUpload"
        action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline">{{ this.buttonName }}</Button>
      </Upload>
    </FormItem>
    <FormItem>
        <Button type="primary" ghost @click="addAuthor">Signin</Button>
    </FormItem>
  </Form>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          name: '',
          surname: '',
          description: '',
          avatar_url: ''
        },
        file: null,
        buttonName: 'Upload image',
        error: false,
        errorMsg: ''
      };
    },
    methods: {
      async addAuthor (form) {
        if (this.file === null) {
          this.$store.dispatch('addAuthor', { form: this.form, image: '' }).then(response => {
            this.$router.push({ path: `/author/${response.data.id}` });
          })
        } else {
          this.getBase64(this.file).then(data => {
            this.$store.dispatch('addAuthor', { form: this.form, image: data }).then(response => {
              this.$router.push({ path: `/author/${response.data.id}` });
            })
          });
        }
      },
      handleUpload (file) {
        this.file = file;
        return false;
      },
      getBase64 (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
    }
  };
</script>

<style scoped>
  .author-form {
    padding: 1em;
    max-width: 70%;
    margin: auto;
  }
</style>
