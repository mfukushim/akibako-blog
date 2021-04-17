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
          <h4 class="text-subtitle-1">
            <div>「バグのないソフトは時代遅れのソフトである」と若い頃本で読んだ。</div>
            <div>昔同僚に「あなたはPCとチャネリングしているようだ」とも言われた</div>
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="10">
        <v-card>
          <v-card-title class="h2">
            ipfs, vuetify+Nuxt/content, static blog 評価中
          </v-card-title>
          <v-card-text>
          </v-card-text>
          <v-card-actions>
          </v-card-actions>
        </v-card>
<!--        <div v-for="b in links" :key="b.slug">
          <PostItem :article="b"></PostItem>
        </div>-->
        <div class="text-center">Recent</div>
        <v-expansion-panels v-model="openedItem">
          <v-expansion-panel
            v-for="(b,index) in links" :key="b.slug"
          >
            <v-expansion-panel-header >
              <PostItem v-if="index != openedItem" :article="b"></PostItem>
              <v-row v-else>
                <v-col cols="10"><v-row class="h2 pa-1">{{ b.title }}</v-row>
                  <v-row>
                    <nuxt-link :to="b.year" class="h5 pa-1">
                    <v-chip>
                    {{b.year}}
                    </v-chip>
                    </nuxt-link>
                    <nuxt-link :to="`/${b.year}/${b.month}`" class="h5 pa-1">
                    <v-chip>
                    {{b.month}}- {{b.day}}
                    </v-chip>
                    </nuxt-link>
                  </v-row>
                </v-col>
                <v-col cols="2">
                <nuxt-link :to="`/${b.year}/${b.month}/${b.day}/${b.link}`" class="h4">
                  <v-btn small color="orange darken-2" dark>
                    <v-icon small dark left>
                      mdi-arrow-right
                    </v-icon>
                    Detail
                  </v-btn>
                </nuxt-link>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content >
<!--              <PostView :body="b.post"></PostView>-->
              <nuxt-content :document="b.post"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-pagination></v-pagination>

      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { Common } from '~/services/Common'

@Component({
  name: 'index'
})
export default class index extends Vue {
  openedItem:number | null = null
  async asyncData ({
    $content,
    params
  }: Context) {
    const query = $content('posts' || 'index').sortBy('date', 'desc').limit(5)
    const posts = await query.fetch()
    const links = Common.getPostList(posts)
    // this.postList = links
    return { links }
  }
}
</script>
