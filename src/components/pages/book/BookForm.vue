<template>
  <section>
    <v-container elevation-3>
      <v-form v-model="valid">
        <v-text-field
          v-model="title"
          :rules="titleRules"
          label="Title"
        ></v-text-field>
        <v-text-field
          v-model="isbn"
          :rules="isbnRules"
          label="ISBN"
        ></v-text-field>
        <v-textarea
          name="input-7-1"
          label="Description"
          value=""
          hint="Short book description"
          v-model="description"
        ></v-textarea>
        <v-autocomplete
          v-model="author"
          :items="authors"
          persistent-hint
          prepend-icon="perm_identity"
        >
          <template
            slot="item"
            slot-scope="{ item, tile }"
          >
            {{ item.attributes.name }} {{ item.attributes.surname }} 
          </template>
          <template
            slot="selection"
            slot-scope="{ item, title }"
         >
            {{ item.attributes.name }} {{ item.attributes.surname }} 
          </template>
        </v-autocomplete>
        <!-- <v-container class="file-upload">
          <upload-btn :title="buttonName" :fileChangedCallback="f => handleFile(f)"></upload-btn>
          {{ fileName }}
        </v-container> -->
        <img-inputer id="file" v-model="file" theme="light" size="medium" no-mask ref="img"/>
        <v-btn
              color="primary"
              @click="addBook"
            >
              Add
            </v-btn>
      </v-form>
    </v-container>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import UploadButton from 'vuetify-upload-button';

  export default {
    components: {
      'upload-btn': UploadButton
    },
    data () {
      return {
        title: '',
        description: '',
        isbn: '',
        valid: false,
        titleRules: [
          v => !!v || 'Title is required',
        ],
        descriptionRules: [
          v => !!v || 'Description is required',
        ],
        isbnRules: [
          v => !!v || 'ISBN is required',
          v => v.length === 13 || v.length === 10 || 'ISBN must be 10 or 13 characters'
        ],
        author: null,
        fileName: '',
        buttonName: 'Upload cover photo',
        file: null
      };
    },
    created () {
      this.$store.dispatch('fetchAuthors');
    },
    methods: {
      addBook () {
        this.$store.dispatch('addBook', { title: this.title, description: this.description, author_id: 1, isbn: this.isbn, imgData: this.$refs.img.dataUrl, imageName: this.file.name }).then((response) => {
          this.$router.push({ path: `/book/details/${response.data.data.id}` });
        });
      },
    },
    computed: mapGetters(['authors']),
  };
</script>

<style scoped>
  .file-upload {
    display: flex;
    align-items: center;
  }
</style>
