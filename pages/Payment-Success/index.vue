<template>
  <div>
    <div v-if="confirmationNumber != ''" class="header-section m-8">
      <div class="heading2"><em>Payment Confirmation</em></div>
      <div class="heading1"><strong>Thank You {{ payerName }}</strong></div>
      <div class="heading2">
        Your payment was successfully completed and your confirmation number is: <strong>{{ confirmationNumber }}</strong>
        <div class="heading2" v-if="totalStillOwed > 0">
          Please remember that <strong>${{ totalStillOwed }}</strong> is still due on or before the day of the trip.
        </div>
        <div class="heading3"><strong>Save or print this page for your records.</strong></div>
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
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Payment-Success',
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['confirmationNumber','totalStillOwed', 'payerName'])
  },
}
</script>

<style lang="scss" scoped>

</style>
