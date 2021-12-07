<template>
  <article v-if="show">
    <div class="d-flex flex-no-wrap  flex-column">
      <div class="d-flex flex-row">
        <div class="text-h4 ma-1">
          {{ body.title }}
        </div>
        <div class="d-flex ml-auto">
          <v-btn fab small dark color="blue" @click="back">
            <v-icon>mdi-keyboard-return</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="d-flex flex-row">
        <div class="ma-2">
          <DateView :article="article" />
        </div>
        <div class="ma-2">
          <CategoryChipView :body="body" />
        </div>
        <v-spacer />
        <v-btn outlined target="_blank" style="text-transform: none" small :href="postUrl(body.parentCid)">
          <v-img width="24" height="24" :src="base('ipfs-logo-vector-ice-text.svg')" />
          {{ body.parentCid }}
        </v-btn>
      </div>
    </div>
    <v-btn class="white--text ma-2" color="pink" href="/prevPicts">
      あるはずの画像が表示されない場合 / When you can't find an image that should be there
    </v-btn>
    <nuxt-content :document="body" />
    <div>
      <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false"><v-icon>mdi-twitter</v-icon></a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
    </div>
  </article>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
// import {base64} from 'multiformats/bases/base64'
import {CID} from 'multiformats'
import {BlogInfo} from '~/services/Common'

@Component({
  name: 'PostView'
})
export default class PostView extends Vue {
  @Prop()
  body: any

  @Prop()
  article?: BlogInfo
  show = true

  back() {
    this.$router.back()
  }

  postUrl(cid: string) {
    return `https://ipfs.io/ipfs/${cid}/index.md`
  }

  base(subPath: string) {
    const a = '../'.repeat(this.$route.path.substr(1).split('/').length - 1)
    return a + subPath
  }
}
</script>

<style scoped>

</style>
