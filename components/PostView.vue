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
      </div>

    </div>
    <nuxt-content :document="body"/>
    <v-pagination></v-pagination>
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

}
</script>

<style scoped>

</style>
