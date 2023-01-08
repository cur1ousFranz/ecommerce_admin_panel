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
    categories : {
      mainCategory : null,
      subCategory : null,
      attribute : null,
    },
    products : {
      data : null,
      loading : false,
    },

  },
  getters: {},
  actions: {
    // ADMIN
    async getAllProducts({commit}, formData) {
      commit('setProductLoading', true)
      const res = await axiosClient.get(`/product`);
      commit('setProductLoading', false)
      commit('setProductData', res.data)
      return res
    },
    async createProduct({commit}, formData) {
        const res = await axiosClient.post(`/product`, formData);
        commit('setProductData', res.data)
        return res
    },
    async createValue({commit}, formData) {
        const res = await axiosClient.post(`/attribute`, formData);
        commit('setAttribute', res.data)
        return res
    },
    async getAttribute({commit}, id) {
        const res = await axiosClient.get(`/category/${id}/attribute`);
        commit('setAttribute', res.data)
        return res
    },
    async getSubCategory({commit}, id) {
        const res = await axiosClient.get(`/category/${id}`);
        commit('setSubCategory', res.data)
        return res
    },
    async getMainCategory({commit}) {
        const res = await axiosClient.get(`/category`);
        commit('setMainCategory', res.data)
        return res
    },

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
    // PRODUCTS
    setProductLoading : (state, loading) => {
      state.products.loading = loading
    },
    setProductData : (state, product) => {
      state.products.data = product.data
    },
    // ADMIN
    setAttribute : (state, attribute) => {
      state.categories.attribute = attribute.data
    },
    setSubCategory : (state, categories) => {
      state.categories.subCategory = categories.data
    },
    setMainCategory : (state, categories) => {
      state.categories.mainCategory = categories.data
    },
    // AUTH
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
