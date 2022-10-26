<template>
  <div class="mt-16">   
    <el-row class="row" :gutter="10">
      <el-col :span="12" :xs="24">
        <img v-on:click="imageClicked" width="100%" :src="fields.mainImage.fields.file.url" />
      </el-col>
      <el-col :span="12" :xs="24">
        <el-col :span="11">
          <el-row>
            <img v-on:click="imageClicked" width="100%" :src="fields.gridImages[0].fields.file.url" />
          </el-row>
          <el-row>
            <img v-on:click="imageClicked" width="100%" :src="fields.gridImages[1].fields.file.url" />
          </el-row>
        </el-col>
        <el-col :span="13"><img v-on:click="imageClicked" width="100%" :src="fields.gridImages[2].fields.file.url" /></el-col>
      </el-col>
    </el-row>
    <div class="mx-16" v-html="parseMarkdown(fields.description)" />
  </div>
</template>

<script>
import createClient from '@/plugins/contentful.js'
const client = createClient()

import marked from '@/mixins/marked.js'

export default {
  name: 'About',
  mixins: [marked],
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    const fields = await client.getEntry('4plAWEONnS5dpaOATPzVFV')
      .then(({ fields }) => {
        return fields
      })
    return {
      fields
    }
  },
  methods: {
    imageClicked() {
      this.$router.push({path: '/fishing'})
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  margin: 0 !important;
}
img {
  border-radius: 1rem;
  cursor: pointer;
}

// needed to override imported markdown
::v-deep p {
  font-size:1.5rem;
  font-weight:500;
  line-height:2.25rem;
}
</style>
