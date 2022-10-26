<template>
  <div>
    <div class="contact-info-header heading3 mb-4 px-16 py-4">
      <span>
        <i class="el-icon-phone mr-4" /><span class="mr-8">(786) 970-8686</span>
        <client-only>
          <a class="mr-8" href="https://www.instagram.com/southfloridauncharted/" target="_blank">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
          <a href="https://www.facebook.com/South-Florida-Uncharted-695389614144741/" target="_blank">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </a>
        </client-only>
      </span>
      <span>
        <i class="el-icon-message mr-4" />david@southfloridauncharted.com
      </span>
    </div>
    <div class="header pl-16 pr-24">
      <img v-on:click="logoClicked" class="logo mr-16" height="80" :src="logoUrl">
      <div class="expanded-navigation">
        <ul>
          <li
            v-for="link in links"
            :key="link.href"
            class="mx-12 heading2"
          >
            <nuxt-link
              :to="link.href"
              :class="{ active: activeLink(link.href) }"
              exact-active-class="active"
            >
              {{ link.displayTitle }}
            </nuxt-link>
          </li>
          <nuxt-link class="shopping-cart-link" :class="{ 'active-cart': activeLink('/cart') }" to="/cart">
            <el-button class="shopping-cart-button" icon="el-icon-shopping-cart-1">
              <span class="item-notification" v-show="totalItems > 0">
                {{totalItems}}
              </span>
            </el-button>
          </nuxt-link>
        </ul>
      </div>
      <div class="collapsed-navigation">
        <el-dropdown class="mr-16" trigger="click" @command="menuItemClicked">
          <span class="dropdown-link heading2 px-8">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item 
              v-for="link in links"
              :key="link.href"
              :command="link.href"
              class="heading2"
            >
              <a :class="{ active: activeLink(link.href) }">
                {{ link.displayTitle }}
              </a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <nuxt-link class="shopping-cart-link" :class="{ 'active-cart': activeLink('/cart') }" to="/cart">
          <el-button class="shopping-cart-button" icon="el-icon-shopping-cart-1">
            <span class="item-notification" v-show="totalItems > 0">{{totalItems}}</span>
          </el-button>
        </nuxt-link>
      </div>
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
  /*{
    title: 'contact',
    displayTitle: 'Contact Us',
    href: '/contact'
  },*/
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
    activeLink(href) {
      if (this.firstPath == href) {
        return true
      } else {
        return false
      }
    },
    menuItemClicked(href) {
      this.$router.push({path: href})
    },
    logoClicked() {
      this.$router.push("/#top")
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../css/variables.scss';

.contact-info-header {
  display: flex;
  justify-content: space-between;
  background-color: $blue;
  span, a {
    color: $yellow !important;
  }
}
@media only screen and (max-width: 495px) {
  .contact-info-header {
    text-align: center;
    flex-direction: column;
  }
}
@media only screen and (min-width: 495px) {
  .contact-info-header {
    text-align: unset;
    flex-direction: row;
  }
}
.header {
  display: flex;
  align-items: center;
  img {
    cursor: pointer;
  }
}

@media only screen and (max-width: 880px) {
  .logo {
    height: 60px;
  }
  .expanded-navigation {
    display: none;
  }
  .collapsed-navigation {
    display: flex;
  }
  .header {
    justify-content: space-between;
  }
  .item-notification {
    padding: 0 .35rem 0.05rem .4rem;
  }
}
@media only screen and (min-width: 880px) {
  .expanded-navigation {
    display: flex;
  }
  .collapsed-navigation {
    display: none;
  }
  .header {
    justify-content: start;
  }
  .item-notification {
    padding: 0 .4rem 0.05rem .28rem;
  }
}

.dropdown-link {
    cursor: pointer;
    border: 2px solid $blue;
    border-radius: 1rem;
  }
.expanded-navigation {
  ul {
    padding: 0;
    list-style-type: none;
    display: flex;
  }
}

a {
  text-decoration: none;
  color: $blue;
}

.active, a:hover, li:hover>a {
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

.item-notification {
  position: relative;
  left: -.3rem;
  top: -.3rem;
  margin: 0;
  vertical-align: top;
  color: white;
  line-height: 1;
  font-size: .75rem;
  font-weight: bold;
  border-radius:50%;
  background: red;
}

::v-deep i.el-icon-shopping-cart-1 {
  color: $blue;
  -webkit-text-stroke-width: .03rem;
}
::v-deep i.el-icon-shopping-cart-1:hover {
  color: $yellow;
}

::v-deep .el-dropdown-menu__item {
  background-color: transparent !important;
}
</style>
