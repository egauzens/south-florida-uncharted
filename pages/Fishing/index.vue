<template>
  <div>
    <section class="header-section mb-16">
      <div class="heading2"><em>Let's catch some fish!</em></div>
      <div class="heading1"><strong>Kayak Fishing Trips</strong></div>
    </section>
    <VueSlickCarousel v-bind="settings">
      <el-card v-for="card in cards" :key="card.name" shadow="hover" :body-style="{ padding: '0px'}">
        <div :style="{ height: '20rem', width: '100%', 'background-size': 'cover', 'background-image': `url(${card.image.fields.file.url})` }" />
        <div class="card-body m-16">
          <div class="heading2">
            <strong> {{card.name}} </strong>
          </div>
          <div class="heading2">${{ card.price }} single person</div>
          <div v-show="card.additionalPeoplePrice != 0" class="heading3">${{ card.additionalPeoplePrice }} per addional person</div>
          <el-button class="mt-8">
            <a :href="`mailto:david@southfloridauncharted.com?subject=${card.name}%20Fishing%20Trip&body=Hi!%20I%20would%20like%20to%20book%20a%20${card.name}%20Fishing%20Trip%20on%20<insert%20date%20of%20booking>%20for%20<insert%20number%20of%20people>%20person(s).`">
              <strong>Book Now!</strong>
            </a>
          </el-button>
          <el-button v-on:click="addToCartClicked(card)" class="mt-8">
            <strong>Add to cart</strong>
          </el-button>
        </div>
      </el-card>
    </VueSlickCarousel>

    <div class="m-16">
      <div class="heading1 mb-8">Included: 
        <span class="heading2">Hobie Mirage drive kayak, Rods and reels, PFD, Bait, Tackle, VHF radio, transportation back to launch site, GoPro rental available for additional charge.</span>
      </div>
      <div class="heading1 mb-8">What to bring: 
        <span class="heading2">Sunscreen, Hat, Sunglasses (polarized recommended), Water, Snacks, Clothes that are able to get wet.</span>
      </div>
      <div class="heading1 mb-8">
        <strong>*</strong><span class="heading2"> Anglers will need a Florida Saltwater fishing license, for license regulations visit <a href="https://myfwc.com/license/">myfwc.com</a></span>
      </div>
    </div>
    
    <el-row class="parallax-row">
      <el-col class="parallax-column">
        <span v-observe-visibility="{callback: visibilityChanged, once: true}" class="parallaxHeading1"><animated-number class="parallaxHeading1 inline" :number="numberFishCaught" /></span>
        <div class="heading2">Fish Caught Yesterday</div>
      </el-col>
      <el-col class="parallax-column">
        <span class="parallaxHeading1"><animated-number class="parallaxHeading1 inline" :number="numberYearsExperience" />+</span>
        <div class="heading2">Years of Experience</div>
      </el-col>
      <el-col class="parallax-column">
        <span class="parallaxHeading1"><animated-number class="parallaxHeading1 inline" :number="numberTournamentsWon" /></span>
        <div class="heading2">Tournaments Won</div>
      </el-col>
      <el-col class="parallax-column">
        <span class="parallaxHeading1"><animated-number class="parallaxHeading1 inline" :number="numberHappyCustomers" />%</span>
        <div class="heading2">Happy Customers</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { pluck } from 'ramda'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { mapActions } from 'vuex'

import AnimatedNumber from '../../components/AnimatedNumber.vue'
import createClient from '@/plugins/contentful.js'
const client = createClient()

export default {
  name: 'Fishing',
  components: { 
    AnimatedNumber, 
    VueSlickCarousel 
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    const cards = await client.getEntries({
        content_type: 'product',
        'fields.type': 'Fishing'
      })
      .then(({ items }) => {
        return pluck('fields', items)
      })
    return {
      cards
    }
  },
  mounted() {
    this.settings.slidesToShow = this.cards.length
  },
  data() {
    return {
      numberFishCaught: 0,
      numberTournamentsWon: 0,
      numberHappyCustomers: 0,
      numberYearsExperience: 0,
      settings: {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        swipe: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 880,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    visibilityChanged (isVisible, entry) {
      if (isVisible) {
        this.numberFishCaught = 30
        this.numberYearsExperience = 20
        this.numberTournamentsWon = 6
        this.numberHappyCustomers = 100
      }
    },
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
.inline {
  display: inline-block;
}
.parallax-row {
  background-image: url('../../assets/fishing-parallax.jpg');
  display: flex;
  align-items: center;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}
.parallax-column {
  text-align: center;
  div, span {
    color: white !important;
  }
}
@media only screen and (max-width: 880px) {
  .card-column {
    width: 100%;
  }
  .card-row {
    flex-direction: column;
  }
}
@media only screen and (min-width: 880px) {
  .card-column {
    width: 32%;
  }
  .card-row {
    flex-direction: row;
  }
}
@media only screen and (max-width: 665px) {
  .parallax-row {
    height: 500px;
    flex-direction: column;
  }
}
@media only screen and (min-width: 665px) {
  .parallax-row {
    height: 300px;
    flex-direction: row;
  }
}
.card-row {
  display: flex;
  justify-content: space-between;
}
.header-section {
  text-align: center;
}
.card-image {
  width: 100%;
}
.card-body {
  text-align: center;
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

::v-deep {
  .slick-dots li button:before {
    color: $yellow;
    font-size: .75rem;
  }
  .slick-prev {
    z-index: 1;
    left: 20px;
  }
  .slick-next {
    z-index: 1;
    right: 20px;
  }
  .slick-next:before {
    font-size: 30px;
    color: $yellow;
  }
  .slick-prev:before {
    font-size: 30px;
    color: $yellow;
  }
}

</style>
