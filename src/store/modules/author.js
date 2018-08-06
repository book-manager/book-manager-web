import axios from 'axios';
import config from '../../config';

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
      axios.get(config.API.AUTHORS.ROOT, {
        headers: {
          Authorization: `Bearer: ${store.getters.token}`
        }
      }).then((response) => {
        store.commit(FETCH_AUTHORS, {authors: response.data.data});
      });
    });
  },
  addAuthor (store, {name, surname, description}) {
    return new Promise((resolve, reject) => {
      axios.post(config.API.AUTHORS.ROOT, {
        author: {
          name,
          surname,
          description
        }
      }, {
        headers: {
          Authorization: `Bearer: ${store.getters.token}`
        }
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        switch (error.response.status) {
          case 422:
            reject(error.response.data.errors);
            break;
          default:
            break;
        }
      });
    });
  },
  fetchAuthorDetails (store, {id}) {
    return new Promise((resolve, reject) => {
      axios.get(`${config.API.AUTHORS.ROOT}/${id}`, {
        headers: {
          Authorization: `Bearer: ${store.getters.token}`
        }
      }).then(response => {
        resolve(response.data);
      });
    });
  },
  searchAuthor (store, {query}) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:4100/api/author/search?query=${query}`, {
        headers: {
          Authorization: `Bearer: ${store.getters.token}`
        }
      }).then(response => {
        resolve(response.data);
      });
    });
  }
};

const mutations = {
  [FETCH_AUTHORS] (store, {authors}) {
    store.authors = authors;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
