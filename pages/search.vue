<template>
  <div>
    <v-card class="ma-2">
      <v-card-text>
        全文検索は文字単位検索のようなので語はヒットしないみたい。あとキーストロークの検出が微妙なので最後にスペースを入れたほうがうまく当たるかも。
        <v-icon class="primary" @click="back">mdi-keyboard-return</v-icon>
      </v-card-text>
      <v-card-actions>
        <v-text-field
          label="Search"
          v-model="queryText"
          @keyup="query"
          prepend-icon="mdi-magnify" class="mt-8"
        ></v-text-field>
      </v-card-actions>
    </v-card>
<!--    <v-row>
      <v-col>
      </v-col>
      <v-col cols="11">
      </v-col>
      <v-col cols="1" class="text-right">
      </v-col>
    </v-row>-->
    <v-list>
      <v-list-item
        v-for="(b,index) in links" :key="b.slug"
      >
        <v-list-item-title >
          <v-divider v-if="index!==0"></v-divider>
          <PostItem :article="b"></PostItem>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>

</template>
<script lang="ts">
import { Context } from '@nuxt/types'
// import { $content } from '@nuxt/content'
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { BlogInfo, Common } from '~/services/Common'
// import { $content } from '../../content/packages/content'

@Component({
  name: 'Search'
})
export default class Search extends Vue {
  links?:BlogInfo[]
  params:any
  queryText:string = ""
  $content:any

  // @Watch("queryText")
  async query () {
    if (!this.queryText) {
      this.links = []
      return
    }
    //'QmXHFDwTgDALHWf5dvTvfKEGHALfE4ecqdYJJAMrEuA62L/'
    const posts = await this.$content('ipfs',{deep: true})
      // .only(['title', 'description'])
      .sortBy('date', 'desc')
      .limit(12)
      .search(this.queryText+" ")
      .fetch()
    // console.log(posts)
    this.links = Common.getPostList(posts)
  }

  /*
    async asyncData ({
      $content,
      params
    }: Context) {
      const query = $content('posts' || 'index').search(params.query)
        .sortBy('date', 'desc')
      const posts = await query.fetch()
      const links = Common.getPostList(posts)
      return { links,params }
    }
  */
  back () {
    this.$router.back()
  }

}
</script>

<style scoped>

</style>
