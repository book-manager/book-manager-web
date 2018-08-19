// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { sync } from 'vuex-router-sync';
import store from './store';
import './main.scss';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import ImgInputer from 'vue-img-inputer';
import 'vue-img-inputer/dist/index.css';

import VueElementLoading from 'vue-element-loading';

import VueStars from 'vue-stars';
Vue.component('vue-stars', VueStars);
Vue.component('VueElementLoading', VueElementLoading);

Vue.component('ImgInputer', ImgInputer);
Vue.use(Vuetify);

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
