import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = ENV.VUE_APP_API_URL || 'http:/127.0.0.1:5000';
const TIMEOUT = 5000;

const api = axios.create({
  baseURL: `${API_URL}`,
  timeout: TIMEOUT,
  //headers: {'Authorization': `Bearer: ${TOKEN}`}
});


const state = {
  config: {}
}

const getters = {}

const actions = {

  getConfig({ commit }) {
    api.get('/main').then(
      response => {
        console.log(response.data)
        commit('SET_CONFIG', response.data)
      }
    )
  },

  getGame({ commit }) {
    api.get('/hack').then(
        response => {
          console.log(response.data)
          commit('SET_GAME', response.data)
        }
    )
  },

  getMenu({ commit }) {
    api.get('/menu').then(
        response => {
          console.log(response.data)
          commit('SET_MENU', response.data)
        }
    )
  }

}
const mutations = {

  SET_CONFIG(state, config) {
    state.config = config
  },

  SET_GAME(state, config) {
    state.game = config
  },

  SET_MENU(state, config) {
    state.menu = config
  }

}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})