<template>
  <article v-if="show">
    <div class="d-flex flex-no-wrap  flex-column">
      <div class="d-flex flex-row">
        <div class="text-h4 ma-1">{{ body.title }}</div>
        <div class="d-flex ml-auto"><v-icon class="primary" @click="back">mdi-keyboard-return</v-icon></div>
      </div>
      <div class="d-flex flex-row">
      <div class="ma-2"><DateView :article="article"></DateView></div>
      <div class="ma-2"><CategoryChipView :body="body"></CategoryChipView>
      </div>
        <v-spacer></v-spacer>
        <v-btn outlined target="_blank" style="text-transform: none" small :href="postUrl(body.parentCid)"><v-img width="24" height="24" :src="base('ipfs-logo-vector-ice-text.svg')"></v-img>{{body.parentCid}}</v-btn>
      </div>

    </div>
    <nuxt-content :document="body"/>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { BlogInfo } from '~/services/Common'

@Component({
  name: 'PostView'
})
export default class PostView extends Vue {
  @Prop()
  body:any

  @Prop()
  article:BlogInfo | undefined
  show = true //false

  back () {
    this.$router.back()
  }
  postUrl (cid: string) {
    // console.log(this.$route)
    return `https://ipfs.io/ipfs/${cid}/index.md`
  }

  base (subPath: string) {
    const a = '../'.repeat(this.$route.path.substr(1).split('/').length-1)
    // console.log(a)
    // return a+subPath
    return a+subPath
  }

}
</script>

<style scoped>

</style>
