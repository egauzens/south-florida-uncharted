<template>
  <div>
    <div class="header-section m-8">
      <div class="heading2"><em>Pay For Your Trip</em></div>
      <div class="heading1"><strong>Your Cart</strong></div>
      <div v-if="cart.length == 0" class="heading2">
        You have no trips in your cart
      </div>
      <div v-else class="cart-items-container">
        <div v-on:click="emptyCart" class="remove-trips-button mb-16">
          <i class="el-icon-delete mr-4" />
          Empty Cart
        </div>
        <cart-item class="mb-16" v-for="(trip, index) in cart" :key="index" :item="trip" />
        <div class="payment-container">
          <label class="heading2"><input class="deposit-checkbox" v-on:change="depositChanged" :value="makeDeposit" type="checkbox">Make $100 deposit and pay the rest in cash*</input></label>
          <div class="heading3">* Cash payments can be made on the day of the trip before launch</div>
          <div class="heading1">
            Total: <strong>${{ total }}</strong>
          </div>
          <div>
            <span class="heading1 mr-16">Checkout:</span>
            <span class="paypal-container">
              <paypal-checkout 
                :amount="`${total}`" 
                :items="items"
                currency="USD"
                :client="credentials"
                :env="paypalEnv"
                :button-style="paypalButtonStyle"
                v-on:payment-completed="paymentCompleted"
                v-on:payment-cancelled="paymentCancelled"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pathOr, propOr } from 'ramda';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {
      credentials: {
        sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
        production: process.env.PAYPAL_CLIENT_ID_PRODUCTION
      },
      experienceOptions: {
        input_fields: {
          no_shipping: 1
        }
      },
      paypalButtonStyle: {
        size: 'large',
        layout: 'vertical',
        shape: 'pill',
        color: 'blue'
      },
      makeDeposit: false
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['subtotal']),
    total() {
      return this.makeDeposit ? 100 * this.cart.length : this.subtotal 
    },
    paypalEnv() {
      return process.env.PAYPAL_ENVIRONMENT
    },
    items() {
      let items = []
      this.cart.forEach(item => {
        const numAdditional = propOr(0, 'numAdditional', item)
        const itemPrice = this.makeDeposit ? 100 : (propOr(0, 'price', item) + numAdditional * propOr(0, 'additionalPeoplePrice', item))
        items.push({
          "name" : `${item.name}`,
          "description" : `${item.type}`,
          "quantity" : "1",
          "price" : `${itemPrice}`,
          "currency" : "USD"
        })
        if (numAdditional > 0) {
          items.push({
            "name" : `${item.name} - additional people`,
            "description" : `${item.type}`,
            "quantity" : `${numAdditional}`,
            "price" : "0",
            "currency" : "USD"
          })
        }
      })
      return items
    }
  },
  methods: {
    ...mapActions(['emptyCart', 'setPaymentInfo']),
    paymentCompleted(paymentInfo) {
      this.setPaymentInfo({
        payerInfo : pathOr(null, ['payer','payer_info'], paymentInfo),
        transaction : propOr(null, 'transactions', paymentInfo)[0],
        totalOwed : this.subtotal 
      })
      this.emptyCart()
      this.$router.push({path: '/payment-success'})
    },
    paymentCancelled() {
      this.$notify.error({
        title: 'Payment Error',
        message: 'Your payment was cancelled'
      });
    },
    depositChanged({ target }) {
      this.makeDeposit = propOr(false, 'checked', target)
    }
  },
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 615px) {
  .paypal-container {
    display: block;
    @supports (-moz-appearance:none) {
      text-align: -moz-center !important;
    }
    text-align: -webkit-center;
  }
}
@media only screen and (min-width: 615px) {
  .paypal-container {
    display: inline-flex;
    text-align: unset;
  }
}
.payment-container {
  @supports (-moz-appearance:none) {
    text-align: -moz-left !important;
  }
  text-align: -webkit-left;
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
.paypal-container {
  vertical-align: text-top;
}
.deposit-checkbox {
  margin-left: 0;
  margin-right: .5rem;
  width: 1.2rem;
  height: 1.2rem;
}
</style>
