import axios from 'axios';
import config from '../../config';

import author from '@/api/author';
import types from '../mutations/author';

import Api from '@/http/axios';

import {
  FETCH_AUTHORS,
  AUTHOR_DETAILS,
  AUTHOR_OWNED,
  AUTHOR_BOOKS,
  AUTHOR_BOOKS_OWNED
} from '../mutation-types';

const state = {
  authors: [],
  authorDetails: {},
  owned: false,
  authorBooks: [],
  authorOwnedUser: []
};

const getters = {
  authors: state => state.authors,
  authorDetails: state => state.authorDetails,
  authorOwned: state => state.owned,
  authorBooks: state => state.authorBooks,
  authorOwnedUser: state => state.authorOwnedUser
};

const actions = {
  async fetchAuthorDetails (store, { id, author_owned }) {
    const results = await author.fetchDetails(store, id, author_owned);
    store.commit('AUTHOR_DETAILS', { author: results.data });

    const owned = await author.checkOwned(store, id);
    store.commit(types.OWNED, { owned: owned.data });
  },
  fetchAuthors (store) {
    return new Promise((resolve, reject) => {
      Api(store).get(config.API.AUTHORS.ROOT).then(response => {
        store.commit(FETCH_AUTHORS, {
          authors: response.data
        });
      }).catch(error => {
        reject(error);
      });
    });
  },
  addAuthor (store, { name, surname, description }) {
    return new Promise((resolve, reject) => {
      Api(store).post(config.API.AUTHORS.ROOT, {
        author: { name, surname, description }
      }).then(response => {
        resolve(response.data);
      });
    });
  },
  searchAuthor (store, { query }) {
    return new Promise((resolve, reject) => {
      axios.get(`${config.API.AUTHORS.SEARCH}/${query}`, {
        headers: {
          Authorization: `Bearer: ${store.getters.token}`
        }
      }).then(response => {
        store.commit(FETCH_AUTHORS, { authors: response.data.data });
        resolve(response.data.data);
      });
    });
  },
  createOwnership (store, { author_id }) {
    Api(store).post(config.API.AUTHOR_OWNERSHIP.ROOT, {
      author_id: author_id
    }).then(response => {
      store.commit(AUTHOR_OWNED, { owned: true });
    });
  },
  authorBooks (store, { id }) {
    return new Promise((resolve, reject) => {
      Api(store).get(`${config.API.AUTHORS.BOOKS}/${id}`).then(response => {
        store.commit(AUTHOR_BOOKS, {
          books: response.data.data
        });
        resolve(response);
      });
    });
  },
  userAuthorOwned (store, { id }) {
    return new Promise((resolve, reject) => {
      Api(store).get(`${config.API.AUTHORS.BOOKSAUTHOR}/${id}`).then(response => {
        store.commit(AUTHOR_BOOKS_OWNED, {
          books: response.data.data
        });
        resolve(response);
      });
    });
  }
};

const mutations = {
  [FETCH_AUTHORS] (store, {
    authors
  }) {
    store.authors = authors;
  },
  [AUTHOR_DETAILS] (store, {
    author
  }) {
    store.authorDetails = author;
  },
  [AUTHOR_OWNED] (store, {
    owned
  }) {
    store.owned = owned;
  },
  [AUTHOR_BOOKS] (store, {
    books
  }) {
    store.authorBooks = books;
  },
  [AUTHOR_BOOKS_OWNED] (store, {
    books
  }) {
    store.authorOwnedUser = books;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
