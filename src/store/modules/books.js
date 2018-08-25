import config from '../../config';

import Api from '@/http/axios';

import {
  FETCH_BOOK,
  BOOK_OWNED,
  BOOK_READ,
  FETCH_BOOKS
} from '../mutation-types';

const state = {
  book: {
    data: {
      attributes: {
        cover_url: '',
        title: '',
        description: ''
      }
    },
    included: [{
      name: '',
      surname: ''
    }]
  },
  books: [
    {
      data: {
        attributes: {
          cover_url: '',
          title: '',
          description: '',
          id: ''
        }
      },
      included: [{
        name: '',
        surname: ''
      }]
    }
  ],
  owned: false,
  bookRead: false
};

const getters = {
  book: state => state.book,
  bookOwned: state => state.owned,
  bookRead: state => state.bookRead,
  books: state => state.books
};

const actions = {
  addBook (store, {
    title,
    isbn,
    description,
    author_id,
    imgData,
    imageName
  }) {
    return new Promise((resolve, reject) => {
      Api(store).post(config.API.BOOKS.ROOT, {
        book: {
          title,
          isbn,
          description,
          author_id,
          imgData,
          imageName
        }
      }).then(response => {
        resolve(response);
      });
    });
  },
  fetchBookDetails (store, { id }) {
    store.dispatch('loading');
    return new Promise((resolve, reject) => {
      Api(store).get(`${config.API.BOOKS.ROOT}/${id}`).then(response => {
        store.commit(FETCH_BOOK, {
          book: response.data
        });
        store.dispatch('checkOwned', { id }).then(() => {
          store.dispatch('loading');
        });
      });
    });
  },
  checkOwned (store, { id }) {
    return new Promise((resolve, reject) => {
      Api(store).get(`${config.API.BOOKS.OWNED}/${id}`).then(response => {
        store.commit(BOOK_OWNED, {
          owned: response.data.data.attributes.owned
        });
        store.commit(BOOK_READ, {
          read: response.data.data.attributes.read
        });
        resolve(response);
      });
    });
  },
  addBookToCollecation (store, {
    bookID
  }) {
    store.dispatch('loading');
    return new Promise((resolve, reject) => {
      Api(store).post(config.API.BOOKS.ADD_OWNERSHIP, {
        book_id: bookID
      }).then(response => {
        store.commit(BOOK_OWNED, {
          owned: true
        });
        store.dispatch('loading');
        resolve(response);
      });
    });
  },
  markAsRead (store, {
    bookID
  }) {
    store.dispatch('loading');
    return new Promise((resolve, reject) => {
      Api(store).post(config.API.BOOKS_OWNERSHIP.READ, {
        id: bookID,
        book_ownership: {
          read: true
        }
      }).then(response => {
        store.dispatch('loading');
        store.commit(BOOK_READ, {
          read: true
        });
        resolve(response);
      });
    });
  },
  fetchBooks (store) {
    store.dispatch('loading');
    return new Promise((resolve, reject) => {
      Api(store).get(config.API.BOOKS.ROOT).then(response => {
        console.log(response);
        store.commit(FETCH_BOOKS, {
          books: response.data.data
        });
        store.dispatch('loading');
      });
    });
  }
};

const mutations = {
  [FETCH_BOOK] (store, {
    book
  }) {
    store.book = book;
  },
  [BOOK_OWNED] (store, {
    owned
  }) {
    store.owned = owned;
  },
  [BOOK_READ] (store, {
    read
  }) {
    store.bookRead = read;
  },
  [FETCH_BOOKS] (store, {
    books
  }) {
    store.books = books;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
