import Api from '@/http/axios';

import config from '../../config';
import friend from '@/api/friends';

import * as types from '../mutations/friend';

import {
  FRIENDS_BOOKS
} from '../mutation-types';

const state = {
  foundUsers: [],
  friendsBook: [],
  friendship: false,
  pending_friendship: false,
  incoming: false,
  incoming_requests: []
};

const getters = {
  foundUsers: state => state.foundUsers,
  friendsBook: state => state.friendsBook,
  friendship: state => state.friendship,
  user_pending_friendship: state => state.pending_friendship,
  incoming: state => state.incoming,
  incoming_requests: state => state.incoming_requests
};

const actions = {
  async searchUsers (store, { query }) {
    const results = await friend.search(store, query);
    store.commit(types.SEARCH_USERS, { users: results.data.data });
  },
  async addFriend (store, { id }) {
    await friend.addFriend(store, id);
    store.commit(types.PENDING_FRIENDSHIP, { pending_friendship: true });
  },
  async checkUserFriendship (store, { id }) {
    const results = await friend.checkFriendship(store, id);
    return results;
  },
  async checkIncomingFriendship (store, { id }) {
    const incomingResults = await friend.checkIncoming(store, id);
    if (incomingResults.data.data.attributes.user_id) {
      store.commit(types.INCOMING_FRIEND_REQUEST, { incoming: true });
    }
    return incomingResults;
  },
  async setIncoming (store, { incoming }) {
    store.commit(types.INCOMING_FRIEND_REQUEST, { incoming: incoming });
  },
  async acceptFriend (store, { id }) {
    store.commit(types.INCOMING_FRIEND_REQUEST, { incoming: false });
    return friend.accept(store, id);
  },
  async checkPendingFriendships (store) {
    const friendshipRequests = await friend.pendingRequests(store);
    store.commit(types.FRIENDSHIP_REQUESTS, { requests: friendshipRequests.data.data });
  },
  fetchFriends (store) {
    return new Promise((resolve, reject) => {
      Api(store).get(config.API.FRIENDS.FETCH).then(response => {
        resolve(response.data.data);
      });
    });
  },
  showFriendsBooks (store, { bookID }) {
    return new Promise((resolve, reject) => {
      Api(store).get(`${config.API.FRIENDS.BOOKS}/${bookID}`).then(response => {
        store.commit(FRIENDS_BOOKS, {
          friends: response.data.data
        });
      });
    });
  }
};

const mutations = {
  [types.SEARCH_USERS] (store, {
    users
  }) {
    store.foundUsers = users;
  },
  [FRIENDS_BOOKS] (store, {
    friends
  }) {
    store.friendsBook = friends;
  },
  [types.CREATE_FRIENDSHIP] (store, { friendship }) {
    store.friendship = friendship;
  },
  [types.PENDING_FRIENDSHIP] (store, { pending_friendship: friendhsip }) {
    store.pending_friendship = friendhsip;
  },
  [types.INCOMING_FRIEND_REQUEST] (store, { incoming }) {
    store.incoming = incoming;
  },
  [types.FRIENDSHIP_REQUESTS] (store, { requests }) {
    store.incoming_requests = requests;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
