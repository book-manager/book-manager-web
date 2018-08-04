const root = 'http://localhost:4000/';
export default {
  API: {
    LOGIN: root + 'login',
    REGISTER: root + 'register',
    FRIENDSHIP: {
      PENDING: root + 'api/friendship/pending'
    }
  }
};
