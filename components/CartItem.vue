<template>
  <div class="item-container m-16">
    <img class="cart-image" width="240px" :src="imageSrc"/>
    <div class="cart-text p-16">
      <div class="heading2">{{ item.name }}</div>
      <el-button type="success" plain circle size="medium" icon="el-icon-plus" />
      <span class="mx-8">Additional People</span>
      <el-button type="danger" plain circle size="medium" icon="el-icon-minus"/>
      <div class="heading2">Total <i class="el-icon-user-solid" />: {{ totalPeople }}</div>
      <div class="heading2">Cost: ${{ itemCost }}</div>
    </div>
  </div>
</template>

<script>
import { pathOr, propOr } from 'ramda';


export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {

    }
  },
  computed: {
    imageSrc() {
      return pathOr('', ['image', 'fields', 'file', 'url'], this.item)
    },
    itemCost() {
      return propOr(0, 'price', this.item) + propOr(0, 'numAdditional', this.item) * propOr(0, 'additionalPeoplePrice', this.item)
    },
    totalPeople() {
      return 1 + propOr(0, 'numAdditional', this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/variables.scss';

.cart-image {

}
.cart-text {
  width: 100%;
}
.item-container {
  display: flex;
  max-width: 600px;
  outline: 1px solid $blue;
}
::v-deep .el-button {
  margin: 0;
}
@media only screen and (max-width: 665px) {
  .cart-image {
    display: none;
  }
}
</style>