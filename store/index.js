export const state = () => ({
  cart: [],
})

export const mutations = {
  SET_CART(state, data){
    state.cart = data
  },
}

export const actions = {
  emptyCart({commit}) {
    commit('SET_CART', [])
  },
}

export const getters = {
  totalCost (state) {
    let cost = 0
    state.cart.forEach(item => {
      cost += item.price
    });
    return cost
  }
}