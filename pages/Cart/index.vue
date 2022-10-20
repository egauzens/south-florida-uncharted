<template>
  <div>
    <section class="header-section m-8">
      <div class="heading2"><em>Pay For Your Trip</em></div>
      <div class="heading1"><strong>Your Cart</strong></div>
      <div v-if="cart.length == 0" class="heading2" >
        You have no trips in your cart
      </div>
      <div v-else class="cart-items-container" >
        <div v-on:click="emptyCart" class="remove-trips-button mb-16"><i class="el-icon-delete mr-4" />
          Empty Cart
        </div>
        <div v-show="fishingTrips.length > 0">
          <cart-item class="mb-16" v-for="(trip, index) in fishingTrips" :key="index" :item="trip" />
          <div class="subtotal-text heading1">
            Subtotal: ${{ subtotal }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Cart',
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['fishingTrips', 'tours', 'subtotal'])
  },
  methods: {
    ...mapActions(['emptyCart'])
  }
}
</script>

<style lang="scss" scoped>
.subtotal-text {
  text-align: start;
}
.header-section {
  text-align: -webkit-center;
}
.cart-items-container {
  max-width: 600px;
}
.remove-trips-button {
  color: red;
  cursor: pointer;
}
.remove-trips-button:hover {
  text-decoration: underline;
}
</style>
