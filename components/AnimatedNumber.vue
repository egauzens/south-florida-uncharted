<template>
  <span>{{ displayNumber }}</span>
</template>
<script>

export default {
  name: 'AnimatedNumber',
  props: {
    number: {
      type: Number,
      default: 0
    },
    timeout: {
      type: Number,
      default: 150
    }
  },
  data() {
    return {
      displayNumber: 0,
      interval: false
    }
  },
  watch: {
    number() {
      clearInterval(this.interval);

      if(this.number == this.displayNumber) {
        return;
      }

      this.interval = window.setInterval(() => {
        if(this.displayNumber != this.number) {
          var change = (this.number - this.displayNumber) / 10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.displayNumber = this.displayNumber + change;
        }
      }, this.timeout);
    }
  }
}
</script>