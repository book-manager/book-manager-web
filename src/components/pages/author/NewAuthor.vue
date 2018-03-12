<template>
  <section>
    <div class="login-form">
      <el-form ref="authorForm" :model="authorForm" label-width="120px">
        <el-form-item label="Name">
          <el-input v-model="authorForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Surname">
          <el-input v-model="authorForm.surname"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="authorForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="addAuthor">Add</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      authorForm: {
        name: '',
        surname: '',
        description: ''
      }
    };
  },
  methods: {
    addAuthor () {
      this.$store.dispatch('addAuthor', this);
    }
  }
};
</script>

<style scoped>
</style>
