// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { sync } from 'vuex-router-sync';
import store from './store';
import './main.scss';

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import Vuetify from 'vuetify';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

Vue.use(Vuetify);
Vue.use(VueMaterial)

Vue.config.productionTip = false;

sync(store, router);

/* eslint-disable no-new */
window.a = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
// unsync();
