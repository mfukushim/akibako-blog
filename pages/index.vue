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
            <p>「バグのないソフトは時代遅れのソフトである」と若い頃本で読んだ。昔同僚に「あなたはPCとチャネリングしているようだ」とも言われた</p>
          </v-card-text>
          <v-card-actions>
          </v-card-actions>
        </v-card>
<!--        <div v-for="b in links" :key="b.slug">
          <PostItem :article="b"></PostItem>
        </div>-->
        <v-expansion-panels v-model="openedItem">
          <v-expansion-panel
            v-for="(b,index) in links" :key="b.slug"
          >
            <v-expansion-panel-header >
              <PostItem v-if="index != openedItem" :article="b"></PostItem>
              <p v-else>{{ b.title }}</p>
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
    const links = Common.getPostList(posts)
    // this.postList = links
    return { links }
  }
}
</script>
