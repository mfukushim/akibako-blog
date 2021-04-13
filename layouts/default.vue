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
      <v-btn
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
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
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

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {icon: 'mdi-book-open-variant',title: 'floppy-disk-cd-rom-label-collections',to: '/category/floppy-disk-cd-rom-label-collections'},
        {icon: 'mdi-book-open-variant',title: 'old-books-of-computer',to: '/category/old-books-of-computer'},
        {icon: 'mdi-book-open-variant',title: 'どうぶつの森',to: '/category/どうぶつの森'},
        {icon: 'mdi-book-open-variant',title: '54文字',to: '/category/54文字'},
        {icon: 'mdi-book-open-variant',title: '怪しい引き出物',to: '/category/怪しい引き出物'},
        {icon: 'mdi-book-open-variant',title: '古物写真',to: '/category/古物写真'},
        {icon: 'mdi-book-open-variant',title: 'software',to: '/category/software'},
        {icon: 'mdi-book-open-variant',title: 'web-tips',to: '/category/web-tips'},
        {icon: 'mdi-book-open-variant',title: 'c-tips',to: '/category/c-tips'},
        {icon: 'mdi-book-open-variant',title: 'androidios-tips',to: '/category/androidios-tips'},
        {icon: 'mdi-book-open-variant',title: 'java-tips-scala-tips',to: '/category/java-tips-scala-tips'},
        {icon: 'mdi-book-open-variant',title: 'java-tips',to: '/category/java-tips'},
        {icon: 'mdi-book-open-variant',title: 'マイコン老年の今時のプログラム技術',to: '/category/マイコン老年の今時のプログラム技術'},
        {icon: 'mdi-book-open-variant',title: 'publishsoft',to: '/category/publishsoft'},
        {icon: 'mdi-book-open-variant',title: 'smalltalk',to: '/category/smalltalk'},
        {icon: 'mdi-book-open-variant',title: 'ゲーム',to: '/category/ゲーム'},
        {icon: 'mdi-book-open-variant',title: '映画',to: '/category/映画'},
        {icon: 'mdi-book-open-variant',title: 'オープンアイデア',to: '/category/オープンアイデア'},
        {icon: 'mdi-book-open-variant',title: 'ニューロエンジン',to: '/category/ニューロエンジン'},
        {icon: 'mdi-book-open-variant',title: '言葉の欠片',to: '/category/言葉の欠片'},
        {icon: 'mdi-book-open-variant',title: '日々の適当な覚え書き',to: '/category/日々の適当な覚え書き'},
        {icon: 'mdi-book-open-variant',title: 'easypost',to: '/category/easypost'},
        {icon: 'mdi-book-open-variant',title: '旧ログ-コード採掘場',to: '/category/旧ログ-コード採掘場'},
        {icon: 'mdi-book-open-variant',title: 'yahooj-port',to: '/category/yahooj-port'},
        {icon: 'mdi-book-open-variant',title: '旧ログ-seasonal-leaf',to: '/category/旧ログ-seasonal-leaf'},
        {icon: 'mdi-book-open-variant',title: '未分類',to: '/category/未分類'},
        {icon: 'mdi-book-open-variant',title: '非説明非保証ログ',to: '/category/非説明非保証ログ'},

        {
          icon: 'mdi-book-open-variant',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'あきばこ工房',
      selectDate: '',
      menu2: ''
    }
  }
}
</script>
