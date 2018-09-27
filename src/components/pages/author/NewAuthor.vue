<template>
 <el-form ref="form" :model="form" class="author-form">
  <el-alert
    v-if="error"
    :title="errorMsg"
    type="error">
  </el-alert>
  <el-form-item label="Name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="Surname">
    <el-input v-model="form.surname"></el-input>
  </el-form-item>
  <el-form-item label="Description">
    <el-input
    type="textarea"
    autosize
    placeholder="Description"
    v-model="form.description">
    </el-input>
  </el-form-item>
  <el-form-item>
    <el-upload
      class="upload-demo"
      drag
      :auto-upload="false"
      :on-change="handleUpload"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addAuthor">Add</el-button>
  </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          name: '',
          surname: '',
          description: '',
        },
        file: {},
        error: false,
        errorMsg: ''
      };
    },
    methods: {
      async addAuthor (form) {
        if (this.file === {}) {
          this.error = true;
          this.errorMsg = 'You need to upload authors avatar';
        }
        const reader = new FileReader();
        reader.readAsDataURL(this.file.raw);

        const authorCreated = await this.$store.dispatch('addAuthor', { form: this.form });
        await this.$store.dispatch('uploadAuthorAvatar', { file: reader.result, filename: this.file.name, authorID: authorCreated.data.id });

        this.$router.push({ path: `/author/${authorCreated.data.id}` });
      },
      handleUpload (file, fileList) {
        this.file = file;
      }
    }
  };
</script>

<style scoped>
  .author-form {
    padding: 1em;
  }
</style>
