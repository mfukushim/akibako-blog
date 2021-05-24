<template>
  <div>
    <v-row class="ma-2">
      <v-col class="text-center text-h6">
        <v-btn small @click="prev">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        {{ params.year }}
        <v-btn small @click="next">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="1" class="text-right">
        <v-btn @click="back" fab small dark color="blue">
          <v-icon>mdi-keyboard-return</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-list dense v-if="links.length>0">
      <v-list-item
        v-for="bw in links" :key="bw.b ? bw.b.slug : bw.m"
      >
        <v-list-item-content>
          <PostItem v-if="bw.b" :article="bw.b"></PostItem>
          <div v-else>
            <nuxt-link :to="`/${year}/${bw.m}`">
              <v-chip>{{ year }} - {{ bw.m }}</v-chip>
            </nuxt-link>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div v-else>Nothing</div>
  </div>
</template>
<script lang="ts">
import {Context} from '@nuxt/types'
import {Component, Vue} from 'nuxt-property-decorator'
import {BlogInfo, Common} from '~/services/Common'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

@Component({
  name: 'dateIndex'
})
export default class dateIndex extends Vue {
  links?: { m?: string, b?: BlogInfo }[]
  params?: any
  year?: string

  async asyncData({
                    $content,
                    params
                  }: Context) {
    const query = $content('ipfs', {deep: true}).where({
      $and: [
        {date: {$between: [`${params.year}-01-01`, `${params.year}-12-31`]}}
        , {categories: {$containsNone: 'head'}}
      ]
    }).sortBy('date', 'asc')
    const posts = await query.fetch()
    const links = Common.getPostList(posts).reduce((p: { m?: string, b?: BlogInfo }[], c: BlogInfo) => {
      if (p.length == 0 || p[p.length - 1].m != c.month) {
        p.push({
          m: c.month
        })
      }
      p.push({
        m: c.month,
        b: c
      })
      return p
    }, [] as { m?: string, b?: BlogInfo }[])
    const year = params.year
    return {
      links,
      params,
      year
    }
  }

  back() {
    this.$router.back()
  }

  prev() {
    if (this.year) {
      const p = dayjs(`${this.year}-01-10`).subtract(1, 'year')  //  timezone差を出さないため10
      this.$router.push(`/${p?.year()}`)
    }
  }

  next() {
    if (this.year) {
      const p = dayjs(`${this.year}-01-10`).add(1, 'year')
      this.$router.push(`/${p?.year()}`)
    }
  }
}
</script>

<style scoped>

</style>
