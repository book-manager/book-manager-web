const root = 'http://localhost:4000/';
export default {
  API: {
    LOGIN: root + 'login',
    REGISTER: root + 'register',
    FRIENDSHIP: {
      PENDING: 'api/friendship/pending',
      ADD: 'api/friendship'
    },
    FRIENDS: {
      FETCH: 'api/friends/',
      SEARCH: root + 'api/friends/search',
      BOOKS: 'api/friends/book'
    },
    AUTHORS: {
      ROOT: 'api/authors',
      BOOKS: 'api/authors/books',
      BOOKSAUTHOR: 'api/authors/owned/books',
      SEARCH: root + 'api/authors/search',
      OWNED: root + 'api/authors/owned',
      OWNERSHIP: root + '/api/authors/ownership'
    },
    BOOKS: {
      ROOT: 'api/books',
      OWNED: 'api/books/owned',
      ADD_OWNERSHIP: 'api/books/ownership',
      READ: 'api/books/read',
    },
    BOOKS_OWNERSHIP: {
      ROOT: 'api/books_ownership',
      READ: '/api/books_ownership/read'
    },
    AUTHOR_OWNERSHIP: {
      ROOT: 'api/ownership'
    }
  }
};
