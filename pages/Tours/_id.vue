<template>
  <div class="body">
    <section class="header-section mb-16">
      <div class="heading2"><em>Tour details</em></div>
      <div class="heading1"><strong>{{ card.name }}</strong></div>
    </section>
    <el-row class="row mb-16">
      <el-col class="image-column mr-16">
        <img class="card-image" :src="card.image.fields.file.url" />
      </el-col>
      <el-col class="text-column">
        <div class="heading2">${{ card.price }} single person</div>
        <div v-show="card.additionalPeoplePrice != 0" class="heading3">${{ card.additionalPeoplePrice }} per addional person</div>
        <el-button class="mt-8">
          <a :href="`mailto:david@southfloridauncharted.com?subject=${card.name}&body=Hi!%20I%20would%20like%20to%20book%20a%20${card.name}%20on%20<insert%20date%20of%20booking>%20for%20<insert%20number%20of%20people>%20person(s).`">
            <strong>Book Now!</strong>
          </a>
        </el-button>
        <el-button v-on:click="addToCartClicked(card)" class="mt-8">
          <strong>Add to cart</strong>
        </el-button>
      </el-col>
    </el-row>
    <div v-html="parseMarkdown(card.description)" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { pluck } from 'ramda'

import marked from '@/mixins/marked.js'
import createClient from '@/plugins/contentful.js'
const client = createClient()

export default {
  name: 'Tours',
  mixins: [marked],
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    const cards = await client.getEntries({
        content_type: 'product',
        'fields.type': 'Tour',
        'fields.name': params.id
      })
      .then(({ items }) => {
        return pluck('fields', items)
      })
    return {
      card: cards[0]
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    addToCartClicked(card) {
      this.addToCart({
        ...card, 
        numAdditional: 0
      })
      this.$router.push({path: '/cart'})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../css/variables.scss';
.card-image {
  width: 100%;
  border-radius: 5%;
}
.row {
  display: flex;
}
.text-column {
  text-align: center;
  margin: auto;
}
.el-button {
  a {
    text-decoration: none;
    color: $blue;
  }
  background-color: $yellow;
}
::v-deep .el-button:hover {
  a, span {
    color: $yellow;
  }
  background-color: $blue;
}
@media only screen and (max-width: 630px) {
  .image-column {
    display: none;
  }
  .body {
    padding-left: 5%;
    padding-right: 5%;
  }
}
@media only screen and (min-width: 630px) {
  .image-column {
    display: block;
  }
  .body {
    padding-left: 10%;
    padding-right: 10%;
  }
}

// needed to override imported markdown
::v-deep p {
  font-size:1.5rem;
  font-weight:500;
  line-height:2.25rem;
}
</style>