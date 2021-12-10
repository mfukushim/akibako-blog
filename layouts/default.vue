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
<!--      <nuxt-link to="/search" class="h4" style="text-decoration: none;">
        <v-btn fab plain>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </nuxt-link>-->
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
import MiRunner from '~/components/MiRunner.vue'

@Component({
  name: 'index',
  components: { MiRunner }
})
export default class index extends Vue {
  clipped = false
  drawer = false
  fixed = true
  items = []
  miniVariant = false
  right = true
  rightDrawer = false
  title = 'あきばこ工房'
  selectDate = ''
  menu2: string | boolean = ''

  queryText = ''

  mounted () {
    this.drawer = false
    this.items = this.$config.categories
  }

/*
  fullSearch () {
    this.$router.push(`/search/${this.queryText}`)
  }
*/

  datePick () {
    this.$router.push(`/${this.selectDate.replaceAll('-', '/')}`)
    this.menu2 = false
  }

  afterLink () {
    this.drawer = false
  }
}
</script>
