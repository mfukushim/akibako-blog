<template>
  <div>
    <client-only>
      <v-parallax :src="setBackPict()" height="800">
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-col
            class="text-right black--text"
            cols="12"
            align-self="end"
          >
            <div class="text-h2 white--text font-weight-medium mb-4 ma-2">
              あきばこ工房
            </div>
            <div class="text-subtitle-1 brown--text text--lighten-1 font-weight-medium ma-2">
              <div>「バグのないソフトは時代遅れのソフトである」と若い頃本で読んだ。</div>
              <div>昔同僚に「あなたはPCとチャネリングしているようだ」とも言われた</div>
            </div>
          </v-col>
        </v-row>
      </v-parallax>
    </client-only>
    <!--    <ImageStack :storeUrl="$config.staticStore"></ImageStack>-->
    <v-row justify="center" align="center" class="ma-2">
      <v-col class="text-center">
        <v-chip class="ma-2" outlined href="mi-system">
          <v-icon left>
            mdi-tree
          </v-icon>
          Mi-System
        </v-chip>
        <v-chip class="ma-2" outlined href="mi-runner">
          <v-icon left>
            mdi-run
          </v-icon>
          Mi-Runner summary
        </v-chip>
<!--        <v-chip class="ma-2" outlined href="mi-desk">
          <v-icon left>
            mdi-desk
          </v-icon>
          Mi-Desk (Unity player PC)
        </v-chip>-->
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>2020年前後の欠落画像は暫定対策として以下にまとめて配置しました</v-card-title>
          <v-card-actions>
            <v-btn color="red" block class="white--text" @click="lostPict">
              欠落画像一覧/lost pictures
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <script async :src="gcseUrl"></script>
        <div class="gcse-search"></div>
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
                  <v-spacer></v-spacer>
                  <v-btn outlined target="_blank" small style="text-transform: none;font-size: xx-small"
                         :href="postUrl(b)">
                    <v-img width="24" height="24" src="ipfs-logo-vector-ice-text.svg"/>
                    {{ b.cid }}
                  </v-btn>
                </v-row>
              </v-col>
              <v-col cols="1">
                <nuxt-link :to="`/${b.year}/${b.month}/${b.day}/${b.link}`" style="text-decoration: none;">
                  <v-btn x-small color="gray">
                    <v-icon x-small dark left>
                      mdi-arrow-right
                    </v-icon>
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
    <v-row justify="center" align="center" class="ma-4">
      <nuxt-link :to="today" style="text-decoration: none;">
        <v-btn small color="gray" class="ma-3">
          This month
        </v-btn>
      </nuxt-link>
    </v-row>
    <!--    <ImageStack :storeUrl="$config.staticStore"></ImageStack>-->
    <v-container>
      <v-row>
        <v-col cols="1">
          <v-img contain width="24" height="24" src="ipfs-logo-vector-ice-text.svg"/>
        </v-col>
        <v-col cols="10" class="caption black--text">
          <div>{{ ipfsRoot }}</div>
          Current articles root (markdown)
          This cid is DAG node tree. Use IPFS Desktop inspect to view structure.
        </v-col>
      </v-row>
      <v-row>
        <v-btn
          icon
          href="https://twitter.com/coronahope"
          color="blue"
        >
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn
          icon
          href="https://github.com/mfukushim"
          color="blue"
        >
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-parallax src="back6.png" height="200">
    </v-parallax>
    <MiSystem></MiSystem>
  </div>
</template>

<script lang="ts">
import {Context} from '@nuxt/types'
import {Component, Vue} from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import {BlogInfo, Common} from '~/services/Common'
import MiSystem from '~/components/MiSystem.vue'

dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

@Component({
  name: 'index',
  components: {MiSystem}
})
export default class index extends Vue {
  openedItem: number | null = null
  links?: BlogInfo[]
  ipfsRoot?: string
  rootUrl?: string
  head?: any
  today?: string
  gcseUrl = process.env.GCSE_URL

  //  @ts-ignore
  async asyncData({$content, $config}: Context) {
    const headQuery = $content('ipfs', {deep: true}).where({
      categories: {$contains: 'head'}
    }).sortBy('date', 'desc').limit(1)
    const head = await headQuery.fetch()

    const query = $content('ipfs', {deep: true}).where({
      categories: {$containsNone: 'head'}
    }).sortBy('date', 'desc').limit(5)
    const posts = await query.fetch()
    const links = Common.getPostList(posts)

    const today = dayjs().format('/YYYY/MM')
    return {
      links,
      ipfsRoot: $config.ipfsRoot,
      rootUrl: `https://ipfs.io/ipfs/${$config.ipfsRoot}`,
      head,
      today
    }
  }

  lostPict() {
    this.$router.push('prevPicts')
  }

  postUrl(info: BlogInfo) {
    return `https://ipfs.io/ipfs/${info.cid}/index.md`
  }

  setBackPict() {
    const night = 'back_night.png'
    const midnight = 'back_midnight.png'
    const sunrise = 'back_sunrise.png'
    const morning = 'back_morning.png'
    const noon = 'back_noon.png'
    const afternoon = 'back_afternoon.png'
    const sunset = 'back_sunset.png'
    let nextSkybox = ''
    const nowHour = dayjs().hour()
    if (nowHour < 1 || nowHour >= 20) {
      nextSkybox = night
    } else if (nowHour < 6) {
      nextSkybox = midnight
    } else if (nowHour < 9) {
      nextSkybox = sunrise
    } else if (nowHour < 12) {
      nextSkybox = morning
    } else if (nowHour < 13) {
      nextSkybox = noon
    } else if (nowHour < 17) {
      nextSkybox = afternoon
    } else {
      nextSkybox = sunset
    }
    return nextSkybox
  }
}
</script>
