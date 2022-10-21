<template>
  <div class="footer heading2 mt-16">
    <img height="80" :src="logoUrl">
    <div>Let's catch some fish!</div>
    <div>786-970-8686</div>
    <div>david@southfloridauncharted.com</div>
    <client-only>
      <a class="mr-8" href="https://www.instagram.com/southfloridauncharted/" target="_blank">
        <font-awesome-icon :icon="['fab', 'instagram']" />
      </a>
      <a href="https://www.facebook.com/South-Florida-Uncharted-695389614144741/" target="_blank">
        <font-awesome-icon :icon="['fab', 'facebook']" />
      </a>
    </client-only>
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

<style lang="scss" scoped>
@import '../css/variables.scss';

.footer {
  text-align: center;
  a {
    color: $blue;
  }
}
</style>
