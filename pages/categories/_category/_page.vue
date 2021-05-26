<template>
  <div>
    <v-row>
      <v-col class="text-center">
        Category : {{ params.category }}
      </v-col>
      <v-col cols="1" class="text-right">
        <v-btn @click="back" fab dark color="blue">
          <v-icon >mdi-keyboard-return</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-list dense>
      <v-list-item
        v-for="b in links" :key="b.slug"
      >
        <v-list-item-content>
          <PostItem :article="b"></PostItem>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-pagination
      v-model="page"
      :length="maxPage"
      @input="inputPage"
      @previous="prevPage"
      @next="nextPage"
    ></v-pagination>
  </div>
</template>
<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { BlogInfo, Common } from '~/services/Common'

@Component({
  name: 'Category'
})
export default class Category extends Vue {
  links?: BlogInfo[]
  params?: any
  title? = ''
  maxPage? = 0
  page? = 1

  async asyncData ({
                     $content,
                     params
                   }: Context) {
    const pageMax = 20
    const page = Number.parseInt(params.page);
    const query = $content('ipfs', { deep: true }).where({
      categories: { $contains: params.category }
    }).sortBy('date', 'desc')
    const posts = await query.fetch()
    const title = `Category : ${params.category}`
    let count: number;
    if (Array.isArray(posts)) {
      count = posts.length;
      const maxPage = Math.floor(count/pageMax) +1
      const links = Common.getPostList(posts.slice((page-1)*pageMax,page*pageMax))
      return {
        links,
        params,
        title,
        maxPage,
        page
      }
    } else {
      return {
        links: [],
        params,
        title,
        maxPage: 0,
        page
      }
    }
  }

  inputPage(num:number) {
    this.$router.push(`${num}`)
  }

  prevPage() {
    if (this.page) {
      const next = this.page--;
      if (next >= 1) {
        this.inputPage(next)
      }
    }
  }
  nextPage() {
    if (this.page) {
      const next = this.page++;
      if (next <= this.maxPage) {
        this.inputPage(next)
      }
    }
  }

  back () {
    this.$router.back()
  }
}
</script>

<style scoped>

</style>
