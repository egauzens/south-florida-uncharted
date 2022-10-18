<template>
  <div class="header">
    <img class="mr-16" height="80" :src="logoUrl">
      <div>
        <ul>
          <li
            v-for="link in links"
            :key="link.href"
            class="mx-12 heading2"
            style="z-index: 100;"
          >
            <nuxt-link
              :to="link.href"
              :class="{ active: activeLink(link.href) }"
              exact-active-class="active"
            >
              {{ link.displayTitle }}
            </nuxt-link>
          </li>
          <nuxt-link class="shopping-cart-link" :class="{ 'active-cart': activeLink('/cart') }" to="/cart"><el-button class="shopping-cart-button" icon="el-icon-shopping-cart-1"><template v-if="totalItems > 0">{{totalItems}}</template></el-button></nuxt-link>
        </ul>
      </div>


  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

const links = [
  {
    title: 'about',
    displayTitle: 'About Us',
    href: '/'
  },
  {
    title: 'fishing',
    displayTitle: 'Fishing Trips',
    href: '/fishing'
  },
  {
    title: 'tours',
    displayTitle: 'Eco Tours',
    href: `/tours`
  },
  {
    title: 'contact',
    displayTitle: 'Contact Us',
    href: '/contact'
  },
]

export default {
  name: 'Header',
  data() {
    return {
      links
    }
  },
  computed: {
    ...mapState(['logoUrl']),
    ...mapGetters(['totalItems']),
    firstPath: function() {
      const path = this.$nuxt.$route.path
      // ignore the first backslash
      const endIndex = path.indexOf('/', 1)
      if (endIndex == -1) {
        return path.substring(0)
      }
      return path.substring(0, endIndex)
    }
  },
  methods: {
    activeLink: function(href) {
      if (this.firstPath == href) {
        return true
      } else {
        return false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../css/variables.scss';

.header {
  display: flex;
  align-items: center;
}

ul {
  padding: 0;
  list-style-type: none;
  display: flex;
}

a {
  text-decoration: none;
  color: $blue;
}

.active, a:hover {
  color: $yellow;
  text-decoration: underline;
  text-underline-offset: .5rem;
}

.active-cart {
  ::v-deep i.el-icon-shopping-cart-1 {
    color: $yellow
  }
}

.shopping-cart-button {
  font-size: 1.5rem;
  padding: 0;
  width: 2rem;
  border: none;
  background-color: transparent !important;
}

.shopping-cart-link {
  align-self: end;
}

::v-deep .el-button {
  span {
    margin: 0;
    vertical-align: text-top;
    color: white;
    line-height: 1;
    font-size: .75rem;
    font-weight: bold;
    border-radius:50%;
    background: red;
    padding: 0 .4rem .05rem .4375rem;
  }
}

::v-deep i.el-icon-shopping-cart-1 {
  color: $blue;
  -webkit-text-stroke-width: .03rem
  
}
::v-deep i.el-icon-shopping-cart-1:hover {
  color: $yellow;
}
</style>
