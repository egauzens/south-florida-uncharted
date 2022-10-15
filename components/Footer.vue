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
import { pathOr } from 'ramda'

import createClient from '@/plugins/contentful.js'
const client = createClient()

export default {
  name: 'Footer',
  data() {
    return {
      logoUrl: ''
    }
  },
  async mounted() {
    let url = ''
    await client.getAsset('6cKi1Jrr7ppsLgRTOJWBiJ').then(({ fields }) => {
      url = pathOr('', ['file', 'url'], fields)
    })
    this.logoUrl = url
  }
}
</script>

<style scoped>
.footer {
  text-align: center;
}
</style>
