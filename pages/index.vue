<template>
  <div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState(['cart'])
  }
}
</script>
