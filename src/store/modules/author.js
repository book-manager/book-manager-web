import axios from 'axios';
import {
  FETCH_AUTHORS
} from '../mutation-types';

const state = {
  authors: []
};

const getters = {
  authors: state => state.authors
};

const actions = {
  fetchAuthors (store) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/author', {
        headers: {
          'Authorization': `Bearer: ${store.getters.token}`
        }
      }).then((response) => {
        console.log(response);
        store.commit(FETCH_AUTHORS, { authors: response.data });
      });
    });
  },
  addAuthor (store, { form }) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:4100/api/author', {
        author: {
          name: form.firstName,
          surname: form.lastName,
          description: form.description,
          birthDate: form.birthDate
        }
      }, {
        headers: {
          'Authorization': `Bearer: ${store.getters.token}`
        }
      }).then((response) => {
        resolve(response.data)
      });
    });
  },
  fetchAuthorDetails (store, { id }) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:4100/api/author/${id}`, {
        headers: {
          'Authorization': `Bearer: ${store.getters.token}`
        }
      }).then((response) => {
        resolve(response.data);
      });
    });
  },
  searchAuthor (store, { query }) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:4100/api/author/search?query=${query}`, {
        headers: {
          'Authorization': `Bearer: ${store.getters.token}`
        }
      }).then((response) => {
        resolve(response.data);
      });
    });
  }
};

const mutations = {
  [FETCH_AUTHORS] (store, { authors }) {
    store.authors = authors;
  }
}
export default {
  state,
  getters,
  actions,
  mutations
};
