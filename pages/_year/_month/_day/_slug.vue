<template>
  <PostView :body="post" :article="params"></PostView>
</template>
<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import {Common} from "~/services/Common";

@Component({
  name: 'slug'
})
export default class slug extends Vue {
  params?: any
  post?:any

  async asyncData ({
    //  @ts-ignore
    $content,
    params
  }: Context) {
    const post = await $content('ipfs/'+ `${params.year}-${params.month}-${params.day}-${params.slug}`+'/index').fetch()
    return { post,params }
  }

  head() {
    const pick = Common.pickBody(this.post);
    return {
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.post.title },
        { hid: 'og:description', property: 'og:description', content: pick.summary },
        { hid: 'og:image', property: 'og:image', content: pick.image || "" },
      ]
    }
  }



}
/*
export default {
  async asyncData ({
    $content,
    params
  }) {
    const post = await $content('posts', `${params.year}-${params.month}-${params.day}-${params.slug}` || 'index').fetch()
    // const post = await $content('posts', params.year, params.month, params.day, params.slug || 'index').fetch()
    // const post = await $content('posts', {deep: true}).fetch()
    console.log(post)
    return { post }
  }
}
*/
</script>

<style scoped>

</style>
