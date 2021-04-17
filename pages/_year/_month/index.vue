<template>
  <div>
    <v-row>
      <v-col class="text-center">
        <nuxt-link :to="`/${params.year}`" class="pa-1">
          <v-chip small>
            {{ params.year }}
          </v-chip>
        </nuxt-link>
        {{ params.month }}</v-col>
      <v-col cols="1" class="text-right">
        <v-icon class="primary" @click="back">mdi-keyboard-return</v-icon>
      </v-col>
    </v-row>
    <v-list>
      <v-list-item
        v-for="b in links" :key="b.slug"
      >
        <v-list-item-title>
          <PostItem :article="b"></PostItem>
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <div class="text-center">
      <v-btn @click="prev"><v-icon>mdi-chevron-left</v-icon></v-btn><v-btn @click="next"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { BlogInfo, Common } from '~/services/Common'
import dayjs, { Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Tokyo")

@Component({
  name: 'dateIndex'
})
export default class dateIndex extends Vue {
  links?:BlogInfo[]
  params?:any
  currentMonth?:Dayjs

  async asyncData ({
    $content,
    params
  }: Context) {
    const query = $content('posts' || 'index').where({
      date: { $between: [`${params.year}-${params.month}-01`, `${params.year}-${params.month}-31`] }
    }).sortBy('date', 'desc')
    const posts = await query.fetch()
    const links = Common.getPostList(posts)
    const currentMonth = dayjs(`${params.year}-${params.month}-01`)
    return {
      links,
      params,
      currentMonth
    }
  }
  back () {
    this.$router.back()
  }

  prev () {
    if (this.currentMonth) {
      console.log(this.currentMonth)
      const p = this.currentMonth.subtract(1,'month')
      console.log(`/${p?.year()}/${( '00' + p?.month()).slice( -2 )}`)
      this.$router.push(`/${p?.year()}/${( '00' + p?.month()).slice( -2 )}`)
    }
  }

  next () {
    if (this.currentMonth) {
      console.log(this.currentMonth)
      const p = this.currentMonth.add(1,'month')
      console.log(`/${p?.year()}/${( '00' + p?.month()).slice( -2 )}`)
      this.$router.push(`/${p?.year()}/${( '00' + p?.month()).slice( -2 )}`)
    }
  }
}
</script>

<style scoped>

</style>
