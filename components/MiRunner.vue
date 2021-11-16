<template>
  <div>
    <client-only placeholder="Loading...">
      <div>今のMiさん</div>
      <div class="text-body-2">暇々にPCに走らせておく放置マスコット Mi-Runnerの最近の寄り道</div>
      <div
        v-for="(item,index) in history"
        :key="item.seq"
      >
        <v-card
          color="#73383d"
          dark
          class="ma-1"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-row>
              <v-col cols="10">
                <v-card-title
                  class="headline"
                  v-text="historyItemToLabel(item)"
                />
                <v-card-subtitle v-text="item.address"/>
              </v-col>
              <v-col cols="10">
                <v-img
                  max-height="160"
                  :src="getPict(item)"
                />
              </v-col>
              <v-col cols="10">
                <v-img
                  height="160"
                  :src="getPlaceMap(item)"
                />
              </v-col>
              <v-col v-if="index+1 === history.length" cols="10">
                <v-img
                  height="160"
                  :src="getCourseMap(item)"
                />
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
      <!--      <v-img max-width="400" max-height="400" :src="courseMapUrl"></v-img>-->
    </client-only>
  </div>
</template>

<script lang="ts">
/* eslint-disable space-before-function-paren */
import {Component, Vue} from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import serverService, {MiHistory} from '~/services/ServerService'

dayjs.extend(duration)

@Component({
  name: 'MiRunner'
})
export default class MiRunner extends Vue {
  private history: MiHistory[] = [];
  // departureLoc: { status: string; address: string; lat: number; lng: number } | undefined
  // destinationLoc: { status: string; address: string; lat: number; lng: number } | undefined
  courseMapUrl = ''

  testUrl = ''

  async mounted() {
    serverService.setServerBaseUrl(this.$config.blogServiceEndpoint)
    const tripList = await serverService.getTripList(100, 10)
    if (tripList) {
      const history = await serverService.getMiHistory(tripList.slice(-1)[0])
      this.history = history || []
      // const s = this.history.map((value) => {
      //   return `${value.lat},${value.lng}`
      // }).join('%7C')
      // this.courseMapUrl = `https://maps.googleapis.com/maps/api/staticmap?markers=size:tiny%7Ccolor:red%7C${s}&size=200x200&key=${this.$config.mapKey}`
    }
  }

  /** 履歴から表示ラベル生成 */
  historyItemToLabel(item: MiHistory) {
    const span = dayjs.duration(item.elapsed, 'seconds')
    return `${span.hours().toString().padStart(2, '0')}:${span.minutes().toString().padStart(2, '0')}`
  }

  /** 履歴取得 */
  private async getHistory(tripId: string) {
    const hist = await serverService.getMiHistory(tripId)
    console.log(`hist:${hist}`)
    this.history = hist || []
  }

  /** 出発地取得 */
  // async getDepartureLocation() {
  //   this.departureLoc = await this.getAddressToLocation(this.departureText)
  // }

  /** 目的値取得 */
  // async getDestinationLocation() {
  //   this.destinationLoc = await this.getAddressToLocation(this.destinationText)
  // }
  getPict(item: MiHistory) {
    // return item.lazy ? '' : serverService.baseURL + `/mi-runner/capture?tripId=${item.tripId}&seq=${item.seq}`
    return this.getPictWithType(item, 'image')
  }

  getPlaceMap(item: MiHistory) {
    return this.getPictWithType(item, 'placeMap')
  }

  getCourseMap(item: MiHistory) {
    return this.getPictWithType(item, 'courseMap')
  }

  getPictWithType(item: MiHistory, pictType: string) {
    return item.lazy ? '' : serverService.baseURL + `/mi-runner/capture?tripId=${item.tripId}&seq=${item.seq}&type=${pictType}`
  }
}
</script>

<style scoped>

</style>
