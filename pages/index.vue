<template>
  <div>
<!--    <ImageStack></ImageStack>-->
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
          <h4 class="text-subtitle-1"></h4>
          <div>「バグのないソフトは時代遅れのソフトである」と若い頃本で読んだ。</div>
          <div>昔同僚に「あなたはPCとチャネリングしているようだ」とも言われた</div>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="10">
        <v-card>
          <v-card-title class="text-body-1">
            ブログ改装 評価中
          </v-card-title>
          <v-card-text>
            ipfsだと近くにコンテンツが来ていないとかなり重いみたい。その場合、画像が出なかったりページが出なかったりするみたいなので、今のところはそこは仕方が無いということで。リロードより長時間待つほうが効果があるかも(長く待ったらリロードは必要なのだが。。。)
          </v-card-text>
          <v-card-actions>
          </v-card-actions>
        </v-card>
        <div class="text-center text-h4 ma-2">Recent</div>
        <v-expansion-panels v-model="openedItem">
          <v-expansion-panel
            v-for="(b,index) in links" :key="b.slug"
          >
            <v-expansion-panel-header>
<!--              <PostItem v-if="index !== openedItem" :article="b" :no-link="true"></PostItem>-->
              <v-card v-if="index !== openedItem">
                <div class="d-flex flex-no-wrap  flex-row">
                  <div class="d-flex flex-column">
                    <div class="text-subtitle-2 ma-2">{{ b.title }}</div>
                    <div class="text-body-2 ma-1">{{ b.summary }}</div>
                  </div>
                  <div class="d-flex ml-auto ma-2">{{ b.date }}</div>
                  <v-avatar
                    class="ma-3"
                    size="96"
                    tile
                    v-if="b.image"
                  >
                    <v-img :src="b.image"></v-img>
                  </v-avatar>
                </div>
              </v-card>

              <v-row v-else>
                <v-col cols="10">
                  <v-row class="h2 pa-1">{{ b.title }}</v-row>
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
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <nuxt-link :to="`/${b.year}/${b.month}/${b.day}/${b.link}`" style="text-decoration: none;">
                    <v-btn small color="gray" >
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
        <adsbygoogle />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { BlogInfo, Common } from '~/services/Common'

@Component({
  name: 'index'
})
export default class index extends Vue {
  openedItem: number | null = null
  links?: BlogInfo[]

  async asyncData ({
    $content
  }: Context) {
    const query = $content('posts' || 'index').sortBy('date', 'desc').limit(5)
    const posts = await query.fetch()
    const links = Common.getPostList(posts)
    return { links }
  }
}
</script>
