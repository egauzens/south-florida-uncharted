import { pathOr } from 'ramda'

import createClient from '@/plugins/contentful.js'
const client = createClient()

export const state = () => ({
  cart: [],
  logoUrl: ''
})

export const mutations = {
  SET_CART(state, data) {
    state.cart = data
  },
  SET_LOGO_URL(state, data) {
    state.logoUrl = data
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    await client.getAsset('6cKi1Jrr7ppsLgRTOJWBiJ').then(({ fields }) => {
      commit('SET_LOGO_URL', pathOr('', ['file', 'url'], fields))
    })
  },
  emptyCart({ commit }) {
    commit('SET_CART', [])
  },
  addToCart({ commit, state }, data) {
    commit('SET_CART', [...state.cart, data])
  }
}

export const getters = {
  totalCost (state) {
    let cost = 0
    state.cart.forEach(item => {
      cost += item.price
    });
    return cost
  },
  totalItems (state) {
    let total = 0
    state.cart.forEach(item => {
      total += 1 + item.numAdditional;
    })
    return total
  }
}