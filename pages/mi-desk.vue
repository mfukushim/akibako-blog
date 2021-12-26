<template>
  <div>
    <v-card>
      <v-card-title>Mi-Desk</v-card-title>
      <client-only placeholder="Loading...">
        <v-sheet v-if="ready && !isSmartPhone()" height="600">
          <Unity :unity="unityView" width="1000px" height="600px"/>
        </v-sheet>
      </client-only>
    </v-card>
    <div class="text-caption">Unity player content(アセット最適化してないので読込遅いです)</div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
//  @ts-ignore
import UnityWebgl, {VueUnity} from 'unity-webgl'
import serverService from '~/services/ServerService'

@Component({
  name: 'index',
  components: {
    Unity: VueUnity
  }
})
export default class MiDesk extends Vue {
  unityView?: any;// = unityPlayer
  ready = false

  mounted() {
    serverService.setServerBaseUrl(this.$config.blogServiceEndpoint)
    this.unityView = new UnityWebgl({
      loaderUrl: '/avatar/Build/avatar.loader.js',
      dataUrl: '/avatar/Build/avatar.data.unityweb',
      frameworkUrl: '/avatar/Build/avatar.framework.js.unityweb',
      codeUrl: '/avatar/Build/avatar.wasm.unityweb',
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'mfuku',
      productName: 'mi-avatarTest',
      productVersion: '0.1'
    })
    this.ready = true
  }

  // historyItemToLabel(item: MiHistory) {
  //   const span = dayjs.duration(item.elapsed, 'seconds')
  //   return `${span.hours().toString().padStart(2, '0')}:${span.minutes().toString().padStart(2, '0')}`
  // }

  // getPict(item: MiHistory) {
  //   return this.getPictWithType(item, 'image')
  // }
  //
  // getPlaceMap(item: MiHistory) {
  //   return this.getPictWithType(item, 'placeMap')
  // }
  //
  // getCourseMap(item: MiHistory) {
  //   return this.getPictWithType(item, 'courseMap')
  // }
  //
  // getPictWithType(item: MiHistory, pictType: string) {
  //   return item.lazy ? '' : serverService.baseURL + `/mi-runner/capture?tripId=${item.tripId}&seq=${item.seq}&type=${pictType}`
  // }
  isSmartPhone() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      return true
    } else {
      return false
    }
  }
}
</script>
