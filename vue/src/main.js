import Vue from 'vue'
import App from './App.vue'
import store from '../store'
import VueSocketIO from 'vue-socket.io'
import VueTyperPlugin from 'vue-typer'

Vue.use(VueTyperPlugin)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://127.0.0.1:5000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: "/ws" } //Optional options
}))


new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})