import axios from 'axios';
import config from '../../config';

import {
  FETCH_BOOK,
  OWNED
} from '../mutation-types';

const state = {
  book: [],
  owned: false
};

const getters = {
  book: state => state.book,
  owned: state => state.owned
};

const actions = {
  addBook (store, {title, isbn, description, author_id, imgData, imageName}) {
    return new Promise((resolve, reject) => {
      axios.post(config.API.BOOKS.ROOT, {
        book: {
          title,
          isbn,
          description,
          author_id,
          imgData,
          imageName
        }
      }, {
        headers: {
          Authorization: `Bearer: ${store.getters.token}`
        }
      }).then(response => {
        resolve(response);
      });
    });
  },
  fetchBookDetails (store, { id }) {
    return new Promise((resolve, reject) => {
      axios.get(`${config.API.BOOKS.ROOT}/${id}`, {
        headers: {
          Authorization: `Bearer: ${store.getters.token}`
        }
      }).then(response => {
        store.commit(FETCH_BOOK, {book: response.data.data});
        axios.get(`${config.API.BOOKS.OWNED}/${id}`, {
          headers: {
            Authorization: `Bearer: ${store.getters.token}`
          }
        }).then(response => {
          store.commit(OWNED, {owned: response.data.owned});
        });
      }).catch(error => {
        reject({msg: error});
      });
    });
  }
};

const mutations = {
  [FETCH_BOOK] (store, { book }) {
    store.book = book;
  },
  [OWNED] (store, { owned }) {
    store.owned = owned;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
