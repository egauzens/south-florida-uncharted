import { pathOr, propOr } from 'ramda'

import createClient from '@/plugins/contentful.js'
const client = createClient()

export const state = () => ({
  cart: [],
  paymentInfo: null,
  logoUrl: '',
  // We must create our own unique id's to keep track of trips that are added to the cart
  id: 0,
})

export const mutations = {
  SET_CART(state, data) {
    state.cart = data
  },
  SET_PAYMENT_INFO(state, data) {
    state.paymentInfo = data
  },
  SET_LOGO_URL(state, data) {
    state.logoUrl = data
  },
  RESET_ID(state) {
    state.id = 0
  },
  INCREASE_ID(state) {
    state.id++
  },
  ADD_ADDITIONAL(state, id) {
    state.cart.forEach(item => {
      if (item.id == id) {
        item.numAdditional++
      }
    })
  },
  REMOVE_ADDITIONAL(state, id) {
    state.cart.forEach(item => {
      if (item.id == id) {
        if (item.numAdditional > 0) {
          item.numAdditional--
        }
      }
    })
  },
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
  setPaymentInfo({ commit }, data) {
    commit('SET_PAYMENT_INFO', data)
  },
  clearPaymentInfo({ commit }) {
    commit('SET_PAYMENT_INFO', null)
  },
  addToCart({ commit, state }, data) {
    commit('SET_CART', [...state.cart, { ...data, 'id': state.id }])
    commit('INCREASE_ID')
  },
  addAdditional({ commit}, data) {
    const id = propOr('', 'id', data)
    commit('ADD_ADDITIONAL', id)
  },
  removeAdditional({ commit}, data) {
    const id = propOr('', 'id', data)
    commit('REMOVE_ADDITIONAL', id)
  }
}

export const getters = {
  subtotal (state) {
    let subtotal = 0
    state.cart.forEach(item => {
      const additionalPerPerson = propOr(0, 'additionalPeoplePrice', item)
      const numAdditional = propOr(0, 'numAdditional', item)
      const itemPrice = propOr(0, 'price', item)
      subtotal = subtotal + itemPrice + additionalPerPerson * numAdditional
    })

    return subtotal
  },
  totalItems (state) {
    return state.cart.length
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