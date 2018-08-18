import {
  LOADING
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
  }
};

const mutations = {
  [LOADING] (store) {
    store.loading = !store.loading;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
