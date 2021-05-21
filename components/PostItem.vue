<template>
  <v-card @click="jumpPage" >
    <div class="d-flex flex-no-wrap  flex-row">
      <div class="d-flex flex-column">
        <div class="text-subtitle-2 ma-2">{{ article.title }}</div>
        <div class="text-body-2 ma-1">{{ article.summary }}</div>
      </div>
      <div class="d-flex ml-auto ma-2">{{ article.date }}</div>
        <v-avatar
          class="ma-3"
          size="96"
          tile
          v-if="article.image"
        >
          <v-img :src="article.image"></v-img>
        </v-avatar>
      </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { BlogInfo } from '~/services/Common'
// import DateIndex from '~/pages/_year/_month/_day/index.vue'

@Component({
  name: 'PostItem',
  // components: { DateIndex }
})
export default class PostItem extends Vue {
  @Prop()
  article: BlogInfo | undefined
  // @Prop()
  // noLink=false

  jumpPage () {
    // if (this.noLink) {
    //   return
    // }
    if (this.article) {
      this.$router.push(`/${this.article.year}/${this.article.month}/${this.article.day}/${this.article.link}`)
    }
  }

  // imageUrl (info: BlogInfo) {
  //   return `https://ipfs.io/ipfs/${info.cid}/${info.image}`
  // }
}
</script>

<style scoped>

</style>
