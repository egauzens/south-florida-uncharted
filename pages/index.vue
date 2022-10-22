<template>
  <div class="mt-16">   
    <el-row class="row" :gutter="10">
      <el-col :span="12" :xs="24">
        <img width="100%" :src="fields.mainImage.fields.file.url" />
      </el-col>
      <el-col :span="12" :xs="24">
        <el-col :span="11">
          <el-row>
            <img width="100%" :src="fields.gridImages[0].fields.file.url" />
          </el-row>
          <el-row>
            <img width="100%" :src="fields.gridImages[1].fields.file.url" />
          </el-row>
        </el-col>
        <el-col :span="13"><img width="100%" :src="fields.gridImages[2].fields.file.url" /></el-col>
      </el-col>
    </el-row>  
    <div class="heading2 mx-16">
      {{ fields.description }}
    </div>
  </div>
</template>

<script>
import createClient from '@/plugins/contentful.js'
const client = createClient()

export default {
  name: 'About',
  components: { 
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    const fields = await client.getEntry('4plAWEONnS5dpaOATPzVFV')
      .then(({ fields }) => {
        return fields
      })
      console.log("FIELDS = ", fields.gridImages)
    return {
      fields
    }
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.row {
  margin: 0 !important;
}
img {
  border-radius: 1rem;
}
</style>
