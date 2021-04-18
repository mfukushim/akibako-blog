<template>
<!--  <div>
    <p>{{params.year}}/{{params.month}}/{{params.day}}</p>
    <v-list >
        <v-list-item
          v-for="b in links" :key="b.slug"
        >
          <v-list-item-content>
            <PostItem :article="b"></PostItem>
          </v-list-item-content>
        </v-list-item>
    </v-list>
  </div>-->
  <div>
    <v-row class="ma-2">
      <v-col class="text-center text-h6">
        <v-btn small @click="prev"><v-icon>mdi-chevron-left</v-icon></v-btn>
        <nuxt-link :to="`/${params.year}`" class="pa-1">
          <v-chip >
            {{ params.year }}
          </v-chip>
        </nuxt-link>
        <nuxt-link :to="`/${params.year}/${params.month}`" class="pa-1">
          <v-chip >
        {{ params.month }}
          </v-chip>
        </nuxt-link>
        {{params.day}}
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
import { Common } from '~/services/Common'
import dayjs from 'dayjs'

@Component({
  name: 'dateIndex'
})
export default class dateIndex extends Vue {
  year?:string
  month?:string
  day?:string
  params?:any

  async asyncData ({
    $content,
    params
  }: Context) {
    const query = $content('posts' || 'index').where({
      date: { $eq :`${params.year}-${params.month}-${params.day}` }
    }).sortBy('date', 'desc')
    const posts = await query.fetch()
    const links = Common.getPostList(posts)
    const year = params.year
    const month = params.month
    const day = params.day
    return { links ,params,year,month,day}
  }
  back () {
    this.$router.back()
  }

  prev () {
    if (this.year && this.month) {
      const p = dayjs(`${this.year}-${this.month}-${this.day}`).subtract(1,'day')  //  timezone差を出さないため10
      this.$router.push(`/${p?.year()}/${p?.month()+1}/${( '00' + (p?.date())).slice( -2 )}`)
    }
  }

  next () {
    if (this.year && this.month) {
      console.log(this.day)
      const p = dayjs(`${this.year}-${this.month}-${this.day}`).add(1,'day')
      console.log(p)
      this.$router.push(`/${p?.year()}/${p?.month()+1}/${( '00' + (p?.date())).slice( -2 )}`)
    }
  }

}
</script>

<style scoped>

</style>
