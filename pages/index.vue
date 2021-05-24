<template>
  <div>
    <!--    <ImageStack></ImageStack>-->
    <v-carousel cycle dark hide-delimiters interval="20000">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-col
            class="text-right white--text"
            cols="12"
            align-self="end"
          >
            <h1 class="display-1 font-weight-thin mb-4 ma-2">
              あきばこ工房
            </h1>
            <h4 class="text-subtitle-2 ma-2">
              <div>「バグのないソフトは時代遅れのソフトである」と若い頃本で読んだ。</div>
              <div>昔同僚に「あなたはPCとチャネリングしているようだ」とも言われた</div>
            </h4>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-row justify="center" align="center" class="ma-2">
      <v-col>
        <nuxt-content :document="head[0]"/>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <div class="text-center text-h4 ma-2">
        Recent
      </div>
      <v-expansion-panels v-model="openedItem" class="ma-3">
        <v-expansion-panel
          v-for="(b,index) in links"
          :key="b.slug"
        >
          <v-expansion-panel-header>
            <div v-if="index !== openedItem">
              <div class="d-flex flex-no-wrap  flex-row">
                <div class="d-flex flex-column">
                  <div class="text-subtitle-1 ma-2 font-weight-bold">
                    {{ b.title }}
                  </div>
                  <div class="text-body-2 ma-1">
                    {{ b.summary }}
                  </div>
                </div>
                <div class="d-flex ml-auto ma-2">
                  {{ b.date }}
                </div>
                <v-avatar
                  v-if="b.image"
                  class="ma-3"
                  size="96"
                  tile
                >
                  <v-img :src="b.image"/>
                </v-avatar>
              </div>
            </div>
            <v-row v-else>
              <v-col cols="10">
                <v-row class="h2 pa-1 font-weight-bold">
                  {{ b.title }}
                </v-row>
                <v-row>
                  <nuxt-link :to="b.year" class="h5 pa-1">
                    <v-chip>
                      {{ b.year }}
                    </v-chip>
                  </nuxt-link>
                  <nuxt-link :to="`/${b.year}/${b.month}`" class="h5 pa-1">
                    <v-chip>
                      {{ b.month }}- {{ b.day }}
                    </v-chip>
                  </nuxt-link>
                  <v-spacer/>
                  <v-btn outlined target="_blank" small style="text-transform: none" :href="postUrl(b)">
                    <v-img width="24" height="24" src="ipfs-logo-vector-ice-text.svg"/>
                    {{ b.cid }}
                  </v-btn>
                </v-row>
              </v-col>
              <v-col cols="2">
                <nuxt-link :to="`/${b.year}/${b.month}/${b.day}/${b.link}`" style="text-decoration: none;">
                  <v-btn small color="gray">
                    <v-icon small dark left>
                      mdi-arrow-right
                    </v-icon>
                    Detail
                  </v-btn>
                </nuxt-link>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <nuxt-content :document="b.post"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-row justify="center" align="center">
      <nuxt-link :to="today" style="text-decoration: none;">
        <v-btn small color="gray" class="ma-3">
          This month
        </v-btn>
      </nuxt-link>
    </v-row>
    <v-row>
      <v-col cols="1">
        <v-img contain width="24" height="24" src="ipfs-logo-vector-ice-text.svg"/>
      </v-col>
      <v-col cols="10" class="caption">
        <div>{{ ipfsRoot }}</div>
        Current articles root (markdown)
        This cid is DAG node tree. Use IPFS Desktop inspect to view structure.
      </v-col>
    </v-row>
    <v-row class="pa-3">
      <v-card class="ma-1">
        <v-card-actions>
          <v-btn
            icon
            href="https://twitter.com/coronahope"
            color="grey"
          >
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <adsbygoogle :ad-slot="ad"/>
  </div>
</template>

<script lang="ts">
import {Context} from '@nuxt/types'
import {Component, Vue} from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import {BlogInfo, Common} from '~/services/Common'

dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

@Component({
  name: 'index'
})
export default class index extends Vue {
  openedItem: number | null = null
  links?: BlogInfo[]
  ipfsRoot?: string
  rootUrl?: string
  head?: any
  today?: string
  ad?: string

  items: string[] = [...new Array(7).keys()].map(value => `${this.$config.staticStore}/${value.toString().padStart(2, '0')}.jpg`)

  async asyncData({
                    $content,
                    $config
                  }: Context) {
    const headQuery = $content('ipfs', {deep: true}).where({
      categories: {$contains: 'head'}
    }).sortBy('date', 'desc').limit(1)
    const head = await headQuery.fetch()

    const query = $content('ipfs', {deep: true}).where({
      categories: {$containsNone: 'head'}
    }).sortBy('date', 'desc').limit(5)
    const posts = await query.fetch()
    const links = Common.getPostList(posts)
    const ad = process.env.AD_SLOT

    const today = dayjs().format('/YYYY/MM')
    return {
      links,
      ipfsRoot: $config.ipfsRoot,
      rootUrl: `https://ipfs.io/ipfs/${$config.ipfsRoot}`,
      head,
      ad,
      today
    }
  }

  postUrl(info: BlogInfo) {
    return `https://ipfs.io/ipfs/${info.cid}/index.md`
  }

  mounted() {
    // const a = [...new Array(7).keys()].map(value => `${this.$config.staticStore}/${value.toString().padStart(2, '0')}.jpg`)
    // console.log('mounted:'+a)
    // this.items = a
  }
}
</script>
