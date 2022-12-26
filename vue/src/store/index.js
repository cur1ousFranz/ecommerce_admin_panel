import { createStore } from 'vuex'
import axiosClient from '../axios'

const store = createStore({
  state: {
    /** AUTHENTICATION */
    user: {
      loading : false,
      role: null,
      token: localStorage.getItem('TOKEN')
    },
    authLoadStatus : {
      loadStatus : false
    },

  },
  getters: {},
  actions: {
    async getData({commit}) {

    },

  },
  mutations: {

  },
  modules: {},

})

export default store
