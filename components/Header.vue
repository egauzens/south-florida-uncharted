<template>
  <div class="header">
    <img height="80" :src="logoUrl">

      <div>
        <ul>
          <li
            v-for="link in links"
            :key="link.href"
            class="mx-16 heading2"
            style="z-index: 100;"
          >
            <nuxt-link
              :to="link.href"
              :class="{active: activeLink(link.href) }"
              exact-active-class="active"
            >
              {{ link.displayTitle }}
            </nuxt-link>
          </li>
        </ul>
      </div>


  </div>
</template>

<script>
import { mapState } from 'vuex'

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
    title: 'gallery',
    displayTitle: 'Gallery',
    href: '/gallery'
  },
  {
    title: 'contact',
    displayTitle: 'Contact Us',
    href: '/contact'
  },
]

export default{
  name: 'Header',
  data() {
    return {
      links
    }
  },
  computed: {
    ...mapState(['logoUrl']),
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

<style scoped>
.header {
  display: flex;
  align-items: center;
}

ul {
  list-style-type: none;
  display: flex;
}

a {
  text-decoration: none;
}

.active, a:hover {
  color: red;
  text-decoration: underline;
  text-underline-offset: .5rem;
}
</style>
