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
      axios.post('http://localhost:4100/api/friends/search', {
        query
      }, {
        headers: {
          'Authorization': `Bearer ${store.getters.token}`
        }
      }).then((response) => {
        console.log(response.data);
        store.commit(SEARCH_USERS, { users: response.data.data.data });
      });
    });
  },
  addFriend (store, { id }) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:4100/api/friends', {
        friend_id: id
      }, {
        headers: {
          'Authorization': `Bearer ${store.getters.token}`
        }
      }).then((response) => {
        console.log(response);
      });
    });
  },
  fetchFriends (store) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:4100/api/friends`, {
        headers: {
          'Authorization': `Bearer ${store.getters.token}`
        }
      }).then((response) => {
        resolve(response.data.data.data)
      })
    })
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
