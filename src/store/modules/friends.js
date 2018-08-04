import axios from 'axios';

import config from '../../config';
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
      axios.post(config.API.FRIENDS.SEARCH, {
        query
      }, {
        headers: {
          Authorization: `Bearer ${store.getters.token}`
        }
      }).then(response => {
        console.log(response.data.data);
        store.commit(SEARCH_USERS, {users: response.data.data});
      });
    });
  },
  addFriend (store, { id }) {
    return new Promise((resolve, reject) => {
      axios.post(config.API.FRIENDSHIP.ADD, {
        friend_id: id,
      }, {
        headers: {
          Authorization: `Bearer ${store.getters.token}`
        }
      }).then(response => {
        console.log(response);
      });
    });
  },
  fetchFriends (store) {
    return new Promise((resolve, reject) => {
      axios.get(config.API.FRIENDS.FETCH, {
        headers: {
          Authorization: `Bearer ${store.getters.token}`
        }
      }).then(response => {
        resolve(response.data.data);
      });
    });
  }
};

const mutations = {
  [SEARCH_USERS] (store, {users}) {
    store.foundUsers = users;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
