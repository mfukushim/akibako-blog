<template>
  <div>
    <no-ssr placeholder="Loading...">
      <div>今のMiさん</div>
<!--      <v-img :src="testUrl" />-->
      <div
        v-for="item in history"
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

              <v-card-subtitle v-text="item.address" />
            </v-col>
            <v-col cols="10">
              <v-img
                height="160"
                :src="getPict(item)"
              />
            </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
    </no-ssr>
  </div>
</template>

<script lang="ts">
/* eslint-disable space-before-function-paren */
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import serverService, { MiHistory } from '~/services/ServerService'

dayjs.extend(duration)

@Component({
  name: 'MiRunner'
})
export default class MiRunner extends Vue {
  private history: MiHistory[] = [];
  // departureLoc: { status: string; address: string; lat: number; lng: number } | undefined
  // destinationLoc: { status: string; address: string; lat: number; lng: number } | undefined

  testUrl = ''

  async mounted() {
    //  仮処置
    const now = dayjs()
    this.testUrl = `${this.$config.staticStore}/mi-runner/01.jpg?${now.unix()}`

    serverService.setServerBaseUrl(this.$config.blogServiceEndpoint)
    console.log(this.$config.blogServiceEndpoint)
    const tripList = await serverService.getTripList(1)
    console.log(`tripList:${tripList}`)
    if (tripList) {
      const history = await serverService.getMiHistory(tripList.slice(-1)[0])
      console.log(`history:${history}`)
      this.history = history || []
    }
    // this.testUrl = `${this.$config.staticStore}/mi-runner/1622365654.jpg`

    // axios.get(`${this.$config.staticStore}/mi-runner/log.txt`).then(value => {
    //   const data:string = value.data;
    //   const d = JSON.parse(data)
    //   this.history = d.history
    // })
    // await this.getHistory()
  }

  // activated() {
  //   //  仮処置
  //   const now = dayjs()
  //
  //   this.testUrl = `${this.$config.staticStore}/mi-runner/01.jpg?${now.unix()}`
  // }

  /** 履歴から表示ラベル生成 */
  historyItemToLabel(item: MiHistory) {
    const span = dayjs.duration(item.elapsed, 'seconds')
    return `${span.hours().toString().padStart(2, '0')}:${span.minutes().toString().padStart(2, '0')}`
      // +
      // ` ${item.time}`
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
    return item.lazy ? '' : serverService.baseURL + `/mi-runner/capture?tripId=${item.tripId}&seq=${item.seq}`
  }
}
</script>

<style scoped>

</style>
