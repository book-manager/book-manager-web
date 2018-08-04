const root = 'http://localhost:4000/';
export default {
  API: {
    LOGIN: root + 'login',
    REGISTER: root + 'register',
    FRIENDSHIP: {
      PENDING: root + 'api/friendship/pending',
      ADD: root + 'api/friendship'
    },
    FRIENDS: {
      FETCH: root + 'api/friends/',
      SEARCH: root + 'api/friends/search',
    },
    AUTHORS: {
      ROOT: root + 'api/authors',
    }
  }
};
