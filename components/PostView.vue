<template>
  <article v-if="show">
    <v-row>
      <v-col class="text-h4">
        {{ body.title }}
      </v-col>
      <v-spacer></v-spacer><v-icon @click="back">mdi-keyboard-return</v-icon>
    </v-row>
    {{ body.date }}
    <nuxt-content :document="body"/>
    <v-pagination></v-pagination>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { BlogInfo } from '~/components/PostItem'
import { IContentDocument } from '@nuxt/content/types/content'

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

/*
  async mounted () {
    if (this.article) {
      console.log(this.article.slug)
      const b = await this.$content('posts', `${this.article.year}-${this.article.month}-${this.article.day}-${this.article.link}`).fetch()
      console.log(b)
      this.body = b
      this.show = true
    }
  }
*/
}
</script>

<style scoped>

</style>
