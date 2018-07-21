import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import author from './modules/author';
import books from './modules/books';
import friends from './modules/friends';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    author,
    friends,
    books
  },
});
