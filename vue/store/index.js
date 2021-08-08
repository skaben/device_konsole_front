import Vuex from 'vuex'
import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL || 'http:/127.0.0.1:5000';
const TIMEOUT = 5000;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: TIMEOUT,
  //headers: {'Authorization': `Bearer: ${TOKEN}`}
});


const state = {
  config: {}
}

const getters = {}

const actions = {

  getConfig({ commit }) {
    api.get('/config').then(
      response => {
        commit('SET_CONFIG', response.data)
      }
    )
  }

}
const mutations = {

  SET_CONFIG(state, config) {
    state.config = config
  }

}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})