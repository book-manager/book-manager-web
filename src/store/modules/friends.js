import Api from '@/http/axios';

import config from '../../config';
import {
  SEARCH_USERS,
  FRIENDS_BOOKS
} from '../mutation-types';

const state = {
  foundUsers: [],
  friendsBook: []
};

const getters = {
  foundUsers: state => state.foundUsers,
  friendsBook: state => state.friendsBook
};

const actions = {
  searchUsers (store, {
    query
  }) {
    return new Promise((resolve, reject) => {
      Api(store).post(config.API.FRIENDS.SEARCH, {
        query
      }).then(response => {
        store.commit(SEARCH_USERS, {
          users: response.data.data
        });
      });
    });
  },
  addFriend (store, {
    id
  }) {
    return new Promise((resolve, reject) => {
      Api(store).post(config.API.FRIENDSHIP.ADD, {
        friend_id: id
      }).then(response => {
        console.log(response);
      });
    });
  },
  fetchFriends (store) {
    return new Promise((resolve, reject) => {
      Api(store).get(config.API.FRIENDS.FETCH).then(response => {
        resolve(response.data.data);
      });
    });
  },
  showFriendsBooks (store, {
    bookID
  }) {
    return new Promise((resolve, reject) => {
      console.log(bookID);
      Api(store).get(`${config.API.FRIENDS.BOOKS}/${bookID}`).then(response => {
        store.commit(FRIENDS_BOOKS, {
          friends: response.data.data
        });
      });
    });
  }
};

const mutations = {
  [SEARCH_USERS] (store, {
    users
  }) {
    store.foundUsers = users;
  },
  [FRIENDS_BOOKS] (store, {
    friends
  }) {
    store.friendsBook = friends;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
