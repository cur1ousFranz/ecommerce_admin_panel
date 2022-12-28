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
    // AUTH
    async signInUser({commit}, formData) {
        commit('setAuthLoadStatus', true)
        const res = await axiosClient.post(`/signin`, formData);
        commit('setAuthLoadStatus', false)
        commit('setUser', res.data)
        return res
    },
    async signInAdminUser({commit}, formData) {
        commit('setAuthLoadStatus', true)
        const res = await axiosClient.post(`/admin/signin`, formData);
        commit('setAuthLoadStatus', false)
        commit('setUser', res.data)
        return res
    },
    async signOutUser({commit}) {
      await axiosClient.get(`/signout`);
      commit('unsetUser')
    },
  },
  mutations: {
    setUser : (state, data) => {
      localStorage.removeItem('USER_ID')
      localStorage.setItem('TOKEN', data.token)
    },
    setAuthLoadStatus : (state, loading) => {
      state.authLoadStatus.loadStatus = loading
    },
    unsetUser : (state) => {
      localStorage.removeItem('TOKEN')
      state.user.token = null
    },
  },
  modules: {},
  
})

export default store
