<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="text-caption">
          {{ article.title }}
          <v-spacer></v-spacer>
          {{ article.date }}
        </v-card-title>
        <v-card-text class="text-sm-caption">
          {{ article.summary }}
          <nuxt-link :to="`/${article.year}/${article.month}/${article.day}/${article.link}`">続き</nuxt-link>
        </v-card-text>
      </div>
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
import { Context } from '@nuxt/types'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export interface BlogInfo {
  title: string;
  slug: string;
  date: string;
  categories: string[];
  open: boolean;
  // toc: string[];
  // body: any;
  summary:string;
  year: string;
  month:string;
  day:string;
  link: string;
  image: string | undefined;
}

@Component({
  name: 'PostItem'
})
export default class PostItem extends Vue {
  @Prop()
  article:BlogInfo | undefined
}
</script>

<style scoped>

</style>
