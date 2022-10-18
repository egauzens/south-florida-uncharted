import { pathOr } from 'ramda'

import createClient from '@/plugins/contentful.js'
const client = createClient()

export const state = () => ({
  cart: [],
  logoUrl: '',
  // We must create our own unique id's to keep track of trips that are added to the cart
  id: 0,
})

export const mutations = {
  SET_CART(state, data) {
    state.cart = data
  },
  SET_LOGO_URL(state, data) {
    state.logoUrl = data
  },
  RESET_ID(state) {
    state.id = 0
  },
  INCREASE_ID(state) {
    state.id++
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
    commit('RESET_ID')
  },
  addToCart({ commit, state }, data) {
    commit('SET_CART', [...state.cart, { ...data, 'id': state.id }])
    commit('INCREASE_ID')
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
      total = total + 1 + item.numAdditional;
    })
    return total
  },
  fishingTrips (state) {
    return state.cart.filter(item => {
      return item.type == 'Fishing'
    })
  },
  tours (state) {
    return state.cart.filter(item => {
      return item.type == 'Tour'
    })
  }
}