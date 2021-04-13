<template>
  <div>
    <v-parallax
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <h1 class="display-1 font-weight-thin mb-4">
            あきばこ工房
          </h1>
          <h4 class="subheading">
            Build your application today!
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="10">
        <v-card>
          <v-card-title class="headline">
            あきばこ工房
          </v-card-title>
          <v-card-text>
            <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower
              developers to create amazing applications.</p>
          </v-card-text>
          <v-card-actions>
          </v-card-actions>
        </v-card>
        <div v-for="b in links" :key="b.slug">
          <PostItem :article="b"></PostItem>
        </div>
<!--        <v-expansion-panels v-model="openedItem" >
          <v-expansion-panel
            v-for="b in links" :key="b.slug"
          >
            <v-expansion-panel-header @click="clickPanel(b)">
              <PostItem v-if="!b.open" :article="b"></PostItem>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <post-view v-if="b.open" :article="b"></post-view>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>-->
        <v-pagination></v-pagination>

      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import jp from 'jsonpath'
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { BlogInfo } from '~/components/PostItem.vue'

@Component({
  name: 'index'
})
export default class index extends Vue {
  openedItem:number | null = null
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
          image: (img && img.length > 0) ? img[0].props.src : undefined
        })
      }
      return p
    }, [])
    // this.postList = links
    return { links }
  }
}
</script>
