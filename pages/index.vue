<template>
  <div>
    <v-parallax src="back1.png" height="800">
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
          <div class="text-h2 grey--text text--darken-1 font-weight-medium mb-4 ma-2">
            あきばこ工房
          </div>
          <div class="text-subtitle-1 brown--text text--lighten-1 font-weight-medium ma-2">
            <div>「バグのないソフトは時代遅れのソフトである」と若い頃本で読んだ。</div>
            <div>昔同僚に「あなたはPCとチャネリングしているようだ」とも言われた</div>
          </div>
        </v-col>
      </v-row>
    </v-parallax>
<!--    <ImageStack :storeUrl="$config.staticStore"></ImageStack>-->

    <!--    <v-carousel cycle dark hide-delimiters interval="20000">-->
    <!--      <v-carousel-item-->
    <!--        v-for="(item,i) in items"-->
    <!--        :key="i"-->
    <!--        :src="item"-->
    <!--        reverse-transition="fade-transition"-->
    <!--        transition="fade-transition"-->
    <!--      >-->
    <!--      </v-carousel-item>-->
    <!--    </v-carousel>-->
    <v-row justify="center" align="center" class="ma-2">
      <v-col class="text-center" cols="12">
        <v-chip
          class="ma-2"
          color="success"
          outlined
          href="mi-runner"
        >
          <v-icon left>
            mdi-run
          </v-icon>
          Mi-Runner summary
        </v-chip>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>2020年前後の欠落画像は暫定対策として以下にまとめて配置しました</v-card-title>
          <v-card-actions ><v-btn color="red" block class="white--text" @click="lostPict">欠落画像一覧/lost pictures</v-btn></v-card-actions>
        </v-card>
<!--        <nuxt-content :document="head[0]"/>-->
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
    <v-row justify="center" align="center" class="ma-4">
      <nuxt-link :to="today" style="text-decoration: none;">
        <v-btn small color="gray" class="ma-3">
          This month
        </v-btn>
      </nuxt-link>
    </v-row>
<!--    <ImageStack :storeUrl="$config.staticStore"></ImageStack>-->
    <v-parallax src="back6.png" height="200">
      <v-container  >
        <v-row
        >
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
    </v-parallax>
    <v-row class="pa-3">
    </v-row>
    <v-card>
      <v-card-title><span class="h1 ma-2">Mi</span> <span class="subtitle-1">private aid information system</span>
      </v-card-title>
      <h2>2021/11/19</h2>
      <v-img src="https://ipfs.io/ipfs/QmUBjiaKtMNNj1zuj6FQyzqU2oG3oyKFcpywSz5b6vi4St"></v-img>
      <v-card-text class="d-flex flex-wrap">
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Server</div>
          <div class="body-2">Information core server</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Front</div>
          <div class="body-2">Basic information front end</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Task</div>
          <div class="body-2">Private task note/editor/viewer</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Monitor</div>
          <div class="body-2">Private activity monitor on PC</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Receiver</div>
          <div class="body-2">Cloud service receive gateway</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Runner</div>
          <div class="body-2">Mascot for Business rest time</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Space</div>
          <div class="body-2">Room power management front end</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Billboard</div>
          <div class="body-2">Enhanced task and private information ticker</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Cam</div>
          <div class="body-2">InHouse body camera capture</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Sense</div>
          <div class="body-2">Scene/Life environment detect analysis service</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-MonitorCs/Mi-MonitorUwp</div>
          <div class="body-2">Headset connector transmitter/Keyboard,Mouse action detect</div>
        </div>
      </v-card-text>
    </v-card>
<!--    <adsbygoogle :ad-slot="ad"/>-->
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
    //  @ts-ignore
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

  lostPict() {
    this.$router.push('prevPicts')
  }

  postUrl(info: BlogInfo) {
    return `https://ipfs.io/ipfs/${info.cid}/index.md`
  }
}
</script>
