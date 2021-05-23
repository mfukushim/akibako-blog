<template>
<!--  <PostList :links="links" :title="`Search : ${params.query}`"></PostList>-->
  <div>
    <v-row>
      <v-col class="text-center">
        {{title}}
      </v-col>
      <v-col cols="1" class="text-right">
        <v-btn @click="back" fab small dark color="blue">
          <v-icon >mdi-keyboard-return</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!--    <p class="text-center">Search : {{params.query}}</p>-->
    <v-list dense>
      <v-list-item
        v-for="(b,index) in links" :key="b.slug"
      >
        <v-list-item-content >
          <v-divider v-if="index!==0"></v-divider>
          <PostItem :article="b"></PostItem>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>

</template>
<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { BlogInfo, Common } from '~/services/Common'

@Component({
  name: 'Search'
})
export default class Search extends Vue {
  links?:BlogInfo[]
  params:any

  async asyncData ({
    $content,
    params
  }: Context) {
    //  'QmXHFDwTgDALHWf5dvTvfKEGHALfE4ecqdYJJAMrEuA62L/'
    const query = $content('ipfs',{deep: true}).search(params.query)
      .sortBy('date', 'desc')
    const posts = await query.fetch()
    const links = Common.getPostList(posts)
    return { links,params }
  }
  back () {
    this.$router.back()
  }

}
</script>

<style scoped>

</style>
