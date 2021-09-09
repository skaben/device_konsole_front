import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = ENV.VUE_APP_API_URL || 'http:/127.0.0.1:5000'
const EVENTS_API = `http://127.0.0.1/api/eventlog/?search=console`
const ACCESS_API = `http://127.0.0.1/api/eventlog/?search=access_log`
const ENERGY_API = `http://127.0.0.1/api/energystate`
const TIMEOUT = 10000;

const api = axios.create({
  baseURL: `${API_URL}`,
  timeout: TIMEOUT,
  //headers: {'Authorization': `Bearer: ${TOKEN}`}
});


const state = {
  config: {},
  eventList: [],
  accessList: [],
  toggle: false,
  energyState: {}
}

const getters = {
  checkState: state => {
    if (!state.config.powered) {
      return 'off'
    } else if (state.config.blocked) {
      return "blocked"
    } else {
      return state.config.shape
    }
  },
}

const actions = {

  getConsoleData({ dispatch }) {
    dispatch('getConsoleEvents');
    dispatch('getEnergyState');
  },

  getEnergyState({ commit }) {
    axios.get(ENERGY_API).then(
        response => {
          commit('SET_ENERGY', response.data[0])
        }
    )
  },

  getAccessEvents({ commit }) {
    axios.get(ACCESS_API).then(
        response => {
          const events = response.data
              .map(elem => {if (elem.message) {
                elem.message["time"] = elem.human_time
                return elem.message
              }})
              .filter(elem => elem !== undefined)
          commit('SET_ACCESS', events)
        }
    )
  },

  getConsoleEvents({ commit }) {
    axios.get(EVENTS_API).then(
        response => {
          const events = response.data
              .map(elem => {if (elem.message && elem.message.type === 'console') {
                elem.message["time"] = elem.human_time
                return elem.message
              }})
              .filter(elem => elem !== undefined)
          commit('SET_EVENTS', events)
        }
    )
  },

  getConfig({ commit }) {
    api.get('/main').then(
      response => {
        commit('SET_CONFIG', response.data)
      }
    )
  },

  getGame({ commit }) {
    api.get('/hack').then(
        response => {
          commit('SET_GAME', response.data)
        }
    )
  },

  getMenu({ commit }) {
    api.get('/menu').then(
        response => {
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
  },

  SET_EVENTS(state, data) {
    state.eventList = data
  },

  SET_ENERGY(state, data) {
    state.energyState = data
  },

  SET_ACCESS(state, data) {
    state.accessList = data
  }

}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})