// asd
import axios from 'axios';
import config from '../../config';
import {
  USER_LOGOUT,
  USER_AUTH_SUCCESS,
  USER_PENDING_FRIENDSHIP
} from '../mutation-types';

const state = {
  token: sessionStorage.getItem('token') || '',
  user: JSON.parse(sessionStorage.getItem('user')) || {},
  is_admin: sessionStorage.getItem('admin') || false,
  pending_friendship: null
};

const getters = {
  isLogged: state => Boolean(state.token),
  user: state => state.user,
  token: state => state.token,
  is_admin: state => state.is_admin,
  pending_friendship: state => state.pending_friendship
};

const actions = {
  login (store, {email, password}) {
    return new Promise((resolve, reject) => {
      axios.post(config.API.LOGIN, {
        email,
        password
      }).then(({data}) => {
        if (data.success) {
          store.commit(USER_AUTH_SUCCESS, {user: data.user, token: data.token});
          resolve();
        } else {
          reject(data.message);
        }
      }).catch(() => {
        reject('Error sending request to server!');
      });
    });
  },
  register (store, {first_name, last_name, email, password, cpassword}) {
    return new Promise((resolve, reject) => {
      if (password !== cpassword) {
        reject(new Error('Passwords do not match'));
      }
      axios.post(config.API.REGISTER, {
        first_name,
        last_name,
        email,
        password,
        cpassword
      }).then(response => {
        if (response.status === 201) {
          resolve(response);
        } else {
          reject(response.message);
        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  logout (store) {
    store.commit(USER_LOGOUT);
  },
  getUserDetails (store, {id}) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:4000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${store.getters.token}`
        }
      }).then(response => {
        resolve(response.data.data);
      });
    });
  },
  checkUserFriendship (store, { friendId }) {
    return new Promise((resolve, reject) => {
      axios.post(`http://localhost:4000/api/friendship/check-friendship`, {
        friend_id: friendId
      }, {
        headers: {
          Authorization: `Bearer ${store.getters.token}`
        }
      }).then(response => {
        resolve(response);
      });
    });
  },
  checkPendingFriendships (store) {
    return new Promise((resolve, reject) => {
      axios.get(config.API.FRIENDSHIP.PENDING, {
        headers: {
          Authorization: `Bearer ${store.getters.token}`
        }
      }).then((response) => {
        store.commit(USER_PENDING_FRIENDSHIP, { pendingFriendship: response.data.data });
        resolve(response);
      });
    });
  }
};

const mutations = {
  [USER_AUTH_SUCCESS] (store, {user, token}) {
    console.log(user);
    store.user = user;
    store.error = '';
    store.token = token;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('admin', user.is_admin);
    sessionStorage.setItem('user', JSON.stringify(user));
  },
  [USER_LOGOUT] (store) {
    store.user = {};
    store.token = '';
    sessionStorage.clear();
  },
  [USER_PENDING_FRIENDSHIP] (store, { pendingFriendship }) {
    store.pending_friendship = pendingFriendship;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
