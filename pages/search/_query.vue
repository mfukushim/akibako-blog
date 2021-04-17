<template>
  <div>
    <p class="text-center">Search : {{params.query}}</p>
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
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Common } from '~/services/Common'

@Component({
  name: 'Search'
})
export default class Search extends Vue {
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
}
</script>

<style scoped>

</style>
