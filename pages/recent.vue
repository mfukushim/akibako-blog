<template>
  <div>
    <p>Recent</p>
    <v-expansion-panels v-model="openedItem">
      <v-expansion-panel
        v-for="(b,index) in links" :key="b.slug"
      >
        <v-expansion-panel-header >
          <p v-if="index != openedItem">{{ b.title }}</p>
        </v-expansion-panel-header>
        <v-expansion-panel-content >
          <nuxt-content :document="b.post"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-pagination></v-pagination>
  </div>
</template>

<script lang="ts">
import jp from 'jsonpath'
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { BlogInfo } from '~/services/Common'
// import { BlogInfo } from '~/components/PostItem.vue'

@Component({
  name: 'PostExList'
})
export default class PostExList extends Vue {
  openedItem: number | null = null
  // postList:any[] = []

  /*
    clickPanel (item:BlogInfo) {
      this.postList.forEach((value:BlogInfo) => {
        if (item.open) {
          value.open = false
        }
      })
      item.open = !item.open
    }
  */
  async asyncData ({
    $content,
    params
  }: Context) {
    const query = $content('posts' || 'index').sortBy('date', 'desc').limit(5)
    const posts = await query.fetch()
    const reg = /\/posts\/(\d{4})-(\d{2})-(\d{2})-(.+)/
    const links = posts.reduce((p: BlogInfo[], c: any) => {
      const m = c.path.match(reg)
      if (m) {
        const pick = jp.query(c, '$.body..children[?(@.type=="text")]') as { value: string }[]
        const img = jp.query(c, '$.body..children[?(@.type=="element" && @.tag=="img")]') as { props: { src: string } }[]
        p.push({
          year: m[1],
          month: m[2],
          day: m[3],
          link: m[4],
          slug: `/${m[1]}/${m[2]}/${m[3]}/${m[4]}`,
          title: c.title,
          date: c.date,
          open: false,
          categories: [],
          summary: (pick && pick.length > 0) ? pick.map(value => value.value.trim()).join('').substring(0, 50) + '...' : '',
          image: (img && img.length > 0) ? img[0].props.src : undefined,
          post: c
        })
      }
      return p
    }, [])
    // this.postList = links
    return { links }
  }
}
</script>
