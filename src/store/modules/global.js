import {
  LOADING,
  SHOW_ERROR
} from '../mutation-types';

const state = {
  loading: false,
  error: false,
  errorMessage: ''
};

const getters = {
  loading: state => state.loading,
  error: state => state.error,
  errorMessage: state => state.errorMessage
};

const actions = {
  loading (store) {
    return new Promise((resolve, reject) => {
      store.commit(LOADING);
    });
  },
  showError (store, { message }) {
    store.commit(SHOW_ERROR, { message: message });
  }
};

const mutations = {
  [LOADING] (store) {
    store.loading = !store.loading;
  },
  [SHOW_ERROR] (store, { message }) {
    store.error = true;
    store.errorMessage = message;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
