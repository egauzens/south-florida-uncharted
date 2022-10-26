<template>
  <div>
    <div v-if="cart.payerEmail != ''" class="header-section m-8">
      <div class="heading2"><em>Payment Confirmation</em></div>
      <div class="heading1"><strong>Thank You</strong></div>
      <div class="heading2">
        Your payment was successfully completed and a confirmation email was sent to {{ payerEmail }}
      </div>
    </div>
    <div v-else-if="cart.length > 0">
      Please navigate to your cart to complete submit your payment
    </div>
    <div v-else>
      Your cart is empty and no payment is required at this time
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Payment-Success',
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['cart']),
  },
}
</script>

<style lang="scss" scoped>

</style>
