<template>
  <div>
    <section class="header-section mb-16">
      <div class="heading2"><em>Pay For Your Trip</em></div>
      <div class="heading1"><strong>Your Cart</strong></div>
      <div class="heading2" v-if="cart.length == 0">
        You have no trips in your cart
      </div>
      <div class="cart-items-container" v-else>
        <div v-on:click="emptyCart" class="remove-trips-button"><i class="el-icon-delete mr-4" />
          Empty Cart
        </div>
        <div v-if="fishingTrips.length > 0">
          <cart-item v-for="trip in fishingTrips" :key="trip.id" :item="trip" />
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
    ...mapGetters(['fishingTrips', 'tours'])
  },
  methods: {
    ...mapActions(['emptyCart'])
  }
}
</script>

<style lang="scss" scoped>

.header-section {
  text-align: center;
}
.cart-items-container {
  text-align: -webkit-center;
}
.remove-trips-button {
  color: red;
  cursor: pointer;
}
.remove-trips-button:hover {
  text-decoration: underline;
}
</style>
