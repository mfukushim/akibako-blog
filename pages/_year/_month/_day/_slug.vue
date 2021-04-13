<template>
  <PostView :body="post"></PostView>
</template>
<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'slug'
})
export default class slug extends Vue {
  // post = {title:"",date:"",body:{}}

  async asyncData ({
    $content,
    params
  }: Context) {
    // console.log(content)

    const post = await $content('posts', `${params.year}-${params.month}-${params.day}-${params.slug}` || 'index').fetch()
    // const post = await $content('posts', params.year, params.month, params.day, params.slug || 'index').fetch()
    // const post = await $content('posts', {deep: true}).fetch()
    console.log(post)
    // this.post = post
    return { post }
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
