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
        <v-expansion-panels accordion>
          <v-expansion-panel
            v-for="b in links" :key="b.slug">
            <v-expansion-panel-header>
              <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="text-caption">
                      {{ b.title }}
                      <v-spacer></v-spacer>
                      {{ b.date }}
                    </v-card-title>
                    <v-card-text class="text-sm-caption">
                      {{ b.summary }}
                      <nuxt-link :to="`/${b.year}/${b.month}/${b.day}/${b.link}`">続き</nuxt-link>
                    </v-card-text>
                  </div>
                  <v-avatar
                    class="ma-3"
                    size="96"
                    tile v-if="b.image"
                  >
                    <v-img :src="b.image"></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
<!--        <v-card v-for="b in links" :key="b.slug">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-caption">
                {{ b.title }}
                <v-spacer></v-spacer>
                {{ b.date }}
              </v-card-title>
              <v-card-text class="text-sm-caption">
                {{ b.summary }}
                <nuxt-link :to="`/${b.year}/${b.month}/${b.day}/${b.link}`">続き</nuxt-link>
              </v-card-text>
            </div>
            <v-avatar
              class="ma-3"
              size="96"
              tile v-if="b.image"
            >
              <v-img :src="b.image"></v-img>
            </v-avatar>
          </div>
        </v-card>-->
        <v-pagination></v-pagination>

      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import jp from 'jsonpath'

// export default {
//   components: {
//     Logo,
//     VuetifyLogo
//   },
//   data: () => ({
//     model: 0,
//     colors: [
//       'primary',
//       'secondary',
//       'yellow darken-2',
//       'red',
//       'orange',
//     ],
//   }),
import {Context} from '@nuxt/types';
import {Component, Vue} from 'nuxt-property-decorator';

@Component({
  name: "index"
})
export default class index extends Vue {
  async asyncData({$content, params}: Context) {
    const query = $content('posts' || 'index').sortBy("date", "desc").limit(5)
    const posts = await query.fetch()
    const allCategories:string[] = []
    const reg = /\/posts\/(\d{4})-(\d{2})-(\d{2})-(.+)/
    const links = posts.reduce((p: any[], c: any) => {
      const m = c.path.match(reg)
      if (m) {
        const pick = jp.query(c, '$.body..children[?(@.type=="text")]') as { value: string }[]
        const img = jp.query(c, '$.body..children[?(@.type=="element" && @.tag=="img")]') as { props: {src:string} }[]

        if(c && c.date && !allCategories.includes(c.date)){
          allCategories.push(c.date)
        }
        p.push({
          year: m[1],
          month: m[2],
          day: m[3],
          link: m[4],
          slug: `/${m[1]}/${m[2]}/${m[3]}/${m[4]}`,
          title: c.title,
          date: c.date,
          summary: (pick && pick.length > 0) ? pick.map(value => value.value.trim()).join("").substring(0, 50) + "..." : "",
          image: (img && img.length > 0) ? img[0].props.src : null
        })  //  `/${m[1]}/${m[2]}/${m[3]}/${m[4]}`
      }
      return p
    }, [])
    console.log(allCategories)

    return {links}
  }
}
</script>
