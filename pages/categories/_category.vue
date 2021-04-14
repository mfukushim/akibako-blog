<template>
  <div>
    <p>Category : {{params.category}}</p>
    <div v-for="b in links" :key="b.slug">
      <PostItem :article="b"></PostItem>
    </div>
  </div>
</template>
<script lang="ts">
import jp from 'jsonpath'
import { Context } from '@nuxt/types'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { BlogInfo } from '~/components/PostItem.vue'

@Component({
  name: 'Category'
})
export default class Category extends Vue {
  async asyncData ({
    $content,
    params
  }: Context) {
console.log()
    const query = $content('posts' || 'index').where({
      categories: { $contains : params.category }
    })
      .sortBy('date', 'desc')
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
          image: (img && img.length > 0) ? img[0].props.src : undefined
        })
      }
      return p
    }, [])
    return { links,params }
  }
}
</script>

<style scoped>

</style>
