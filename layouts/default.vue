<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          @click="drawer = false"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
<!--      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>-->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-text-field
        label="Search"
        v-model="queryText"
        @change="fullSearch"
        prepend-icon="mdi-magnify" class="mt-8"
      ></v-text-field>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-left="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="selectDate"
              label="Picker without buttons"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="selectDate"
            type="month"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>

      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} mfuku</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import jp from 'jsonpath'
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
// import { BlogInfo } from '~/components/PostItem.vue'

@Component({
  name: 'index'
})
export default class index extends Vue {
  clipped = false
  drawer= false
  fixed= false
  items = [
    {
      icon: 'mdi-apps',
      title: 'Home',
      to: '/'
    },
    {icon: 'mdi-book-open-variant',title: 'floppy-disk-cd-rom-label-collections',to: '/categories/floppy-disk-cd-rom-label-collections'},
    {icon: 'mdi-book-open-variant',title: 'old-books-of-computer',to: '/categories/old-books-of-computer'},
    {icon: 'mdi-book-open-variant',title: 'どうぶつの森',to: '/categories/どうぶつの森'},
    {icon: 'mdi-book-open-variant',title: '54文字',to: '/categories/54文字'},
    {icon: 'mdi-book-open-variant',title: '怪しい引き出物',to: '/categories/怪しい引き出物'},
    {icon: 'mdi-book-open-variant',title: '古物写真',to: '/categories/古物写真'},
    {icon: 'mdi-book-open-variant',title: 'software',to: '/categories/software'},
    {icon: 'mdi-book-open-variant',title: 'web-tips',to: '/categories/web-tips'},
    {icon: 'mdi-book-open-variant',title: 'c-tips',to: '/categories/c-tips'},
    {icon: 'mdi-book-open-variant',title: 'androidios-tips',to: '/categories/androidios-tips'},
    {icon: 'mdi-book-open-variant',title: 'java-tips-scala-tips',to: '/categories/java-tips-scala-tips'},
    {icon: 'mdi-book-open-variant',title: 'java-tips',to: '/categories/java-tips'},
    {icon: 'mdi-book-open-variant',title: 'マイコン老年の今時のプログラム技術',to: '/categories/マイコン老年の今時のプログラム技術'},
    {icon: 'mdi-book-open-variant',title: 'publishsoft',to: '/categories/publishsoft'},
    {icon: 'mdi-book-open-variant',title: 'smalltalk',to: '/categories/smalltalk'},
    {icon: 'mdi-book-open-variant',title: 'ゲーム',to: '/categories/ゲーム'},
    {icon: 'mdi-book-open-variant',title: '映画',to: '/categories/映画'},
    {icon: 'mdi-book-open-variant',title: 'オープンアイデア',to: '/categories/オープンアイデア'},
    {icon: 'mdi-book-open-variant',title: 'ニューロエンジン',to: '/categories/ニューロエンジン'},
    {icon: 'mdi-book-open-variant',title: '言葉の欠片',to: '/categories/言葉の欠片'},
    {icon: 'mdi-book-open-variant',title: '日々の適当な覚え書き',to: '/categories/日々の適当な覚え書き'},
    {icon: 'mdi-book-open-variant',title: 'easypost',to: '/categories/easypost'},
    {icon: 'mdi-book-open-variant',title: '旧ログ-コード採掘場',to: '/categories/旧ログ-コード採掘場'},
    {icon: 'mdi-book-open-variant',title: 'yahooj-port',to: '/categories/yahooj-port'},
    {icon: 'mdi-book-open-variant',title: '旧ログ-seasonal-leaf',to: '/categories/旧ログ-seasonal-leaf'},
    {icon: 'mdi-book-open-variant',title: '未分類',to: '/categories/未分類'},
    {icon: 'mdi-book-open-variant',title: '非説明非保証ログ',to: '/categories/非説明非保証ログ'},

    {
      icon: 'mdi-book-open-variant',
      title: 'Inspire',
      to: '/inspire'
    }
  ]
  miniVariant= false
  right= true
  rightDrawer= false
  title= 'あきばこ工房'
  selectDate= ''
  menu2= ''

  queryText= ""

  mounted () {
    this.drawer = false
  }

  fullSearch () {
    this.$router.push(`/search/${this.queryText}`)
  }
}
</script>
