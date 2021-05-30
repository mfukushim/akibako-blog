<template>
  <v-app >
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="grey"
    >
      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          @click="afterLink"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="blue-grey lighten-1"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <nuxt-link to="/" class="h4" style="text-decoration: none;">
        <v-btn plain class="text-h4">{{ title }}</v-btn>
      </nuxt-link>
      <v-spacer/>
      <nuxt-link to="/search" class="h4" style="text-decoration: none;">
        <v-btn fab plain>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </nuxt-link>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container ref="mainFocus">
        <nuxt/>
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      width="290"
      temporary
      fixed
    >
      <v-list>
        <v-date-picker
          v-model="selectDate"
          type="month"
          @input="datePick"
        ></v-date-picker>
      </v-list>
      <mi-runner ></mi-runner>
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
import { Component, Vue } from 'nuxt-property-decorator'
import MiRunner from "~/components/MiRunner.vue";

@Component({
  name: 'index',
  components: {MiRunner}
})
export default class index extends Vue {
  clipped = false
  drawer = false
  fixed = true
  items = [
    {
      icon: 'mdi-apps',
      title: 'Home',
      to: '/'
    },
    {
      icon: 'mdi-content-save-all-outline',
      title: 'floppy-disk-cd-rom-label-collections',
      to: '/categories/floppy-disk-cd-rom-label-collections'
    },
    {
      icon: 'mdi-book-open-variant',
      title: 'old-books-of-computer',
      to: '/categories/old-books-of-computer'
    },
    {
      icon: 'mdi-dog',
      title: 'どうぶつの森',
      to: '/categories/どうぶつの森'
    },
    {
      icon: 'mdi-grid',
      title: '54文字',
      to: '/categories/54文字'
    },
    {
      icon: 'mdi-gift',
      title: '怪しい引き出物',
      to: '/categories/怪しい引き出物'
    },
    {
      icon: 'mdi-bicycle-penny-farthing',
      title: '古物写真',
      to: '/categories/古物写真'
    },
    {
      icon: 'mdi-sitemap',
      title: 'software',
      to: '/categories/software'
    },
    {
      icon: 'mdi-web',
      title: 'web-tips',
      to: '/categories/web-tips'
    },
    {
      icon: 'mdi-language-cpp',
      title: 'c-tips',
      to: '/categories/c-tips'
    },
    {
      icon: 'mdi-android',
      title: 'android/ios-tips',
      to: '/categories/androidios-tips'
    },
    {
      icon: 'mdi-language-java',
      title: 'java-tips-scala-tips',
      to: '/categories/java-tips-scala-tips'
    },
    {
      icon: 'mdi-language-java',
      title: 'java-tips',
      to: '/categories/java-tips'
    },
    {
      icon: 'mdi-book-open-variant',
      title: 'マイコン老年の今時のプログラム技術',
      to: '/categories/マイコン老年の今時のプログラム技術'
    },
    {
      icon: 'mdi-publish',
      title: 'publishsoft',
      to: '/categories/publishsoft'
    },
    {
      icon: 'mdi-chat',
      title: 'smalltalk',
      to: '/categories/smalltalk'
    },
    {
      icon: 'mdi-gamepad-variant',
      title: 'ゲーム',
      to: '/categories/ゲーム'
    },
    {
      icon: 'mdi-filmstrip-box-multiple',
      title: '映画',
      to: '/categories/映画'
    },
    {
      icon: 'mdi-lightbulb-on',
      title: 'オープンアイデア',
      to: '/categories/オープンアイデア'
    },
    {
      icon: 'mdi-account-details',
      title: 'ニューロエンジン',
      to: '/categories/ニューロエンジン'
    },
    {
      icon: 'mdi-message-bulleted',
      title: '言葉の欠片',
      to: '/categories/言葉の欠片'
    },
    {
      icon: 'mdi-note',
      title: '日々の適当な覚え書き',
      to: '/categories/日々の適当な覚え書き'
    },
    {
      icon: 'mdi-book-open-variant',
      title: 'easypost',
      to: '/categories/easypost'
    },
    {
      icon: 'mdi-account-hard-hat',
      title: '旧ログ-コード採掘場',
      to: '/categories/旧ログ-コード採掘場'
    },
    {
      icon: 'mdi-yahoo',
      title: 'yahooj-port',
      to: '/categories/yahooj-port'
    },
    {
      icon: 'mdi-leaf',
      title: '旧ログ-seasonal-leaf',
      to: '/categories/旧ログ-seasonal-leaf'
    },
    {
      icon: 'mdi-book-open-variant',
      title: '未分類',
      to: '/categories/未分類'
    },
    {
      icon: 'mdi-delete',
      title: '非説明非保証ログ',
      to: '/categories/非説明非保証ログ'
    },
  ]
  miniVariant = false
  right = true
  rightDrawer = false
  title = 'あきばこ工房'
  selectDate = ''
  menu2: string | boolean = ''

  queryText = ''

  mounted () {
    this.drawer = false
  }

  fullSearch () {
    this.$router.push(`/search/${this.queryText}`)
  }

  datePick () {
    this.$router.push(`/${this.selectDate.replaceAll('-', '/')}`)
    this.menu2 = false
  }

  afterLink () {
    this.drawer = false
    // console.log(this.$refs['mainFocus'] as Vue)
    // (this.$refs.mainFocus as any).focus()
  }
}
</script>
