import user from '@/api/user';

import * as types from '../mutations/user';

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
  async login (store, { email, password }) {
    const results = await user.login(store, email, password);
    store.commit(types.USER_AUTH_SUCCESS, results);
  },
  async register (store, {first_name, last_name, email, password, cpassword}) {
    await user.register(store, first_name, last_name, email, password, cpassword);
    this.$router.push({path: '/login'});
  },
  logout (store) {
    store.commit(types.USER_LOGOUT);
  },
  async getUserDetails (store, { id }) {
    return user.details(store, id);
  }
};

const mutations = {
  [types.USER_AUTH_SUCCESS] (store, { user, token }) {
    store.user = user;
    store.error = '';
    store.token = token;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('admin', user.is_admin);
    sessionStorage.setItem('user', JSON.stringify(user));
  },
  [types.USER_LOGOUT] (store) {
    store.user = {};
    store.token = '';
    sessionStorage.clear();
  },
  [types.USER_PENDING_FRIENDSHIP] (store, { pendingFriendship }) {
    store.pending_friendship = pendingFriendship;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
