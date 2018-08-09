import axios from 'axios';
import config from '../../config';

const state = {
};

const getters = {
};

const actions = {
  addBook (store, {title, isbn, description, author_id}) {
    return new Promise((resolve, reject) => {
      axios.post(config.API.BOOKS.ROOT, {
        book: {
          title,
          isbn,
          description,
          author_id
        }
      }, {
        headers: {
          Authorization: `Bearer: ${store.getters.token}`
        }
      }).then(response => {
        resolve(response);
      });
    });
  }
};

const mutations = {
};

export default {
  state,
  getters,
  actions,
  mutations
};
