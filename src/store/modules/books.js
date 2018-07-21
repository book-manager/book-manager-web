import axios from 'axios';

const state = {
};

const getters = {
};

const actions = {
  addBook (store, { title, isbn, description, author_id }) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:4100/api/book', {
        book: {
          title: title,
          isbn: isbn,
          description: description,
          author_id: author_id
        }
      }, {
        headers: {
          'Authorization': `Bearer: ${store.getters.token}`
        }
      }).then((response) => {
        console.log(response);
        resolve(response);
      })
    });
  }
};

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
};
