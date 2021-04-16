<template>
  <div>
    <p>{{params.year}}/{{params.month}}/{{params.day}}</p>
    <div v-for="b in links" :key="b.slug">
      <PostItem :article="b"></PostItem>
    </div>
  </div>
</template>
<script lang="ts">
import jp from 'jsonpath'
import { Context } from '@nuxt/types'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Common } from '~/services/Common'
// import { BlogInfo } from '~/components/PostItem.vue'

@Component({
  name: 'dateIndex'
})
export default class dateIndex extends Vue {
  async asyncData ({
    $content,
    params
  }: Context) {
console.log()
    const query = $content('posts' || 'index').where({
      date: { $eq :`${params.year}-${params.month}-${params.day}` }

      // date: { $between :[this.top || '2020-12-30', this.end || '2020-12-31'] }
      // date: { $between :['2020-12-30','2020-12-31'] }
      // date: { $between :[Date.parse(this.top || '2000/01/01'),Date.parse(this.end || dayjs().toISOString())] },
    })
      .sortBy('date', 'desc')
    const posts = await query.fetch()
    const links = Common.getPostList(posts)

/*
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
*/
    return { links ,params}
  }
}
</script>

<style scoped>

</style>
