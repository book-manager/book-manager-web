const root = process.env.ROOT_API + '/api/';
export default {
  API: {
    LOGIN: 'login',
    REGISTER: 'register',
    FRIENDSHIP: {
      PENDING: 'friendship/pending',
      ADD: 'friendship',
      CHECK: 'friendship/check-friendship',
      INCOMING: 'friendship/check-incoming',
      ACCEPT: 'friendship/accept'
    },
    FRIENDS: {
      FETCH: 'friends/',
      SEARCH: root + 'api/friends/search',
      BOOKS: 'api/friends/book'
    },
    AUTHORS: {
      ROOT: 'api/authors',
      BOOKS: 'api/authors/books',
      BOOKSAUTHOR: 'api/authors/owned/books',
      SEARCH: root + 'api/authors/search',
      OWNED: root + 'api/authors/owned',
      OWNERSHIP: root + '/api/authors/ownership',
      AVATAR: root + '/api/authors/cover'
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
    },
    USERS: {
      ROOT: 'api/users'
    }
  }
};
