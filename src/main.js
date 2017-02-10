import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';

import {routes} from './routes/routes';
import {store} from './store/store';

Vue.use(VueResource);
Vue.use(VueRouter);

let databaseURI = require('./config.json');
Vue.http.options.root = databaseURI.firebaseURI;

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});

Vue.filter('currency', (value) => {
  return `$ ${value.toLocaleString()}`;
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
