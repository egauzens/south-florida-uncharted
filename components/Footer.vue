<template>
  <div class="footer">
    <img height="80" :src="logoUrl">
    <h5>Let's catch some fish!</h5>
    <h5>786-970-8686</h5>
    <h5>david@southfloridauncharted.com</h5>
    <a href="https://www.facebook.com/South-Florida-Uncharted-695389614144741/" style="color: black">
        <i class="fab fa-facebook-square mr-3"></i>
      </a>
      <a href="https://www.instagram.com/southfloridauncharted/" style="color: black">
        <i class="fab fa-instagram"></i>
      </a>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Footer',
  computed: {
    ...mapState(['logoUrl']),
  }
}
</script>

<style scoped>
.footer {
  text-align: center;
}
</style>
