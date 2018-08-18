import axios from 'axios';
import config from '../../config';

import Api from '@/http/axios';

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
      Api(store.getters.token, store).get(config.API.AUTHORS.ROOT).then(response => {
        store.commit(FETCH_AUTHORS, {authors: response.data.data});
      }).catch(error => {
        reject(error);
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
      axios.get(`${config.API.AUTHORS.SEARCH}/${query}`, {
        headers: {
          Authorization: `Bearer: ${store.getters.token}`
        }
      }).then(response => {
        resolve(response.data.data);
      });
    });
  },
  checkOwned (store, { id }) {
    return new Promise((resolve, reject) => {
      axios.get(`${config.API.AUTHORS.OWNED}/${id}`, {
        headers: {
          Authorization: `Bearer: ${store.getters.token}`
        }
      }).then(response => {
        resolve(response.data.owned);
      });
    });
  },
  createOwnership (store, { author_id }) {
    return new Promise((resolve, reject) => {
      axios.post(config.API.AUTHORS.OWNERSHIP, {
        author_id: author_id
      }, {
        headers: {
          Authorization: `Bearer: ${store.getters.token}`
        }
      }).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
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
