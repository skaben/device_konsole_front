import Vue from 'vue'
import App from './App.vue'
import store from '../store'
import VueSSE from 'vue-sse'

const SSE_URL = ENV.VUE_APP_SSE_URL || 'http:/127.0.0.1:5000/event-source';

// OR specify custom defaults (described below)
Vue.use(VueSSE, {
  format: 'json',
  polyfill: true,
  url: SSE_URL,
  withCredentials: true,
});

new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})
