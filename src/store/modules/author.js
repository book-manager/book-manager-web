import axios from 'axios';
import config from '../../config';

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
  authorDetails: {
    data: {
      attributes: {
        name: '',
        surname: '',
        avatar_url: ''
      }
    },
    included: [{
      attributes: {
        surname: '',
        name: ''
      }
    }]
  },
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
  fetchAuthorDetails (store, { id }) {
    return new Promise((resolve, reject) => {
      store.dispatch('loading');
      Api(store).get(`${config.API.AUTHORS.ROOT}/${id}`).then(response => {
        console.log(response);
        store.commit(AUTHOR_DETAILS, { author: response.data });
        store.dispatch('checkOwned', { id: id }).then(() => {
          store.dispatch('loading');
        });
      }).catch(error => {
        reject(error);
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
  checkOwned (store, { id }) {
    return new Promise((resolve, reject) => {
      Api(store).get(`${config.API.AUTHOR_OWNERSHIP.ROOT}/${id}`).then(response => {
        store.commit(AUTHOR_OWNED, { owned: response.data.data.attributes.owned });
        resolve(response);
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
