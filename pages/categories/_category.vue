<template>
  <div>
    <v-row>
      <v-col class="text-center">
        Category : {{ params.category }}
      </v-col>
      <v-col cols="1" class="text-right">
        <v-icon class="primary" @click="back">mdi-keyboard-return</v-icon>
      </v-col>
    </v-row>
    <v-list>
      <v-list-item
        v-for="b in links" :key="b.slug"
      >
        <v-list-item-title>
          <PostItem :article="b"></PostItem>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>
<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { BlogInfo, Common } from '~/services/Common'

@Component({
  name: 'Category'
})
export default class Category extends Vue {
  links?: BlogInfo[]
  params?: any
  title?=""

  async asyncData ({
    $content,
    params
  }: Context) {
    console.log()
    const query = $content('posts' || 'index').where({
      categories: { $contains: params.category }
    })
      .sortBy('date', 'desc')
    const posts = await query.fetch()
    const title = `Category : ${params.category}`
    const links = Common.getPostList(posts)
    return {
      links,
      params,
      title
    }
  }
  back () {
    this.$router.back()
  }
}
</script>

<style scoped>

</style>
