<template>
  <div>
    <p>{{params.year}}/{{params.month}}/{{params.day}}</p>
    <v-list >
        <v-list-item
          v-for="b in links" :key="b.slug"
        >
          <v-list-item-content>
            <PostItem :article="b"></PostItem>
          </v-list-item-content>
        </v-list-item>
    </v-list>
  </div>
</template>
<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { Common } from '~/services/Common'

@Component({
  name: 'dateIndex'
})
export default class dateIndex extends Vue {
  async asyncData ({
    $content,
    params
  }: Context) {
    const query = $content('posts' || 'index').where({
      date: { $eq :`${params.year}-${params.month}-${params.day}` }
    }).sortBy('date', 'desc')
    const posts = await query.fetch()
    const links = Common.getPostList(posts)
    return { links ,params}
  }
}
</script>

<style scoped>

</style>
