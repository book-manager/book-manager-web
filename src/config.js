const root = 'http://localhost:4000/';
export default {
  API: {
    LOGIN: root + 'login',
    REGISTER: root + 'register',
    FRIENDSHIP: {
      PENDING: 'api/friendship/pending',
      ADD: root + 'api/friendship'
    },
    FRIENDS: {
      FETCH: root + 'api/friends/',
      SEARCH: root + 'api/friends/search',
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
      ROOT: root + 'api/books',
      OWNED: root + 'api/books/owned'
    }
  }
};
