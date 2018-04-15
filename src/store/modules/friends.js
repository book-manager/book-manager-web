import axios from 'axios';

import { SEARCH_USERS } from '../mutation-types';

const state = {
  foundUsers: []
};

const getters = {
  foundUsers: state => state.foundUsers
};

const actions = {
  searchUsers (store, { query }) {
    return new Promise((resolve, reject) => {
      console.log(query);
      axios.post('http://localhost:4000/friends/search', {
        query
      }, {
        headers: {
          'Authorization': `Bearer ${store.getters.token}`
        }
      }).then((response) => {
        console.log(response.data);
        store.commit(SEARCH_USERS, { users: response.data.data });
      });
    });
  }
};

const mutations = {
  [SEARCH_USERS] (store, { users }) {
    store.foundUsers = users;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
