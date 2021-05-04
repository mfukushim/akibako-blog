<template>
  <div>
    <v-row class="ma-2">
      <v-col class="text-center text-h6">
        <v-btn small @click="prev"><v-icon>mdi-chevron-left</v-icon></v-btn>
        <nuxt-link :to="`/${params.year}`" class="pa-1">
          <v-chip >
            {{ params.year }}
          </v-chip>
        </nuxt-link>
        {{ params.month }}
        <v-btn small @click="next"><v-icon>mdi-chevron-right</v-icon></v-btn>
      </v-col>
      <v-col cols="1" class="text-right">
        <v-icon class="primary" @click="back">mdi-keyboard-return</v-icon>
      </v-col>
    </v-row>
    <v-list>
      <v-list-item
        v-for="b in links" :key="b.slug"
      >
        <v-list-item-title>
          <PostItem :article="b" ></PostItem>
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <div class="text-center">
    </div>
  </div>
</template>
<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { BlogInfo, Common } from '~/services/Common'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Tokyo")

@Component({
  name: 'dateIndex'
})
export default class dateIndex extends Vue {
  links?:BlogInfo[]
  params?:any
  year?:string
  month?:string

  async asyncData ({
    $content,
    params
  }: Context) {
    // const post = await $content('QmXHFDwTgDALHWf5dvTvfKEGHALfE4ecqdYJJAMrEuA62L/'+ `${params.year}-${params.month}-${params.day}-${params.slug}`+'/index').fetch()
    const query = $content('QmXHFDwTgDALHWf5dvTvfKEGHALfE4ecqdYJJAMrEuA62L',{deep: true}).where({
      date: { $between: [`${params.year}-${params.month}-01`, `${params.year}-${params.month}-31`] }
    }).sortBy('date', 'asc')
    const posts = await query.fetch()
    const links = Common.getPostList(posts)
    const year = params.year
    const month = params.month
    return {
      links,
      params,
      year,
      month
    }
  }
  back () {
    this.$router.back()
  }

  prev () {
    if (this.year && this.month) {
      const p = dayjs(`${this.year}-${this.month}-10`).subtract(1,'month')  //  timezone差を出さないため10
      this.$router.push(`/${p?.year()}/${( '00' + (p?.month()+1)).slice( -2 )}`)
    }
  }

  next () {
    if (this.year && this.month) {
      const p = dayjs(`${this.year}-${this.month}-10`).add(1,'month')
      this.$router.push(`/${p?.year()}/${( '00' + (p?.month()+1)).slice( -2 )}`)
    }
  }
}
</script>

<style scoped>

</style>
