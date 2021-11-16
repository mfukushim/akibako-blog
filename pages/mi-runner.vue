<template>
  <div>
<!--    <v-carousel cycle dark hide-delimiters interval="20000">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-col
            class="text-right black&#45;&#45;text"
            cols="12"
            align-self="end"
          >
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>-->
    <h1 class="display-1 font-weight-thin mb-4 ma-2">
      Mi-Runner簡易ヒストリ
    </h1>
    <div class="text-body-2">
      暇々にPCに走らせておく放置マスコット Mi-Runnerの旅行記録の抜粋
    </div>
<!--    <client-only placeholder="Loading...">-->
      <div
        v-for="(hItem,index) in history"
        :key="index"
      >
        <v-card class="indigo">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-col cols="5">
              <v-card-title
                class="headline"
              >
              Trip at {{ hItem[0].time }}
              </v-card-title>
              <v-card-text>
                                  <div>Departure: {{ hItem[0].address }}</div>
                                  <div>Destination: {{ hItem[hItem.length-1].address }}</div>
              </v-card-text>
            </v-col>
            <v-col cols="7">
                              <v-img
                                height="160"
                                :src="getCourseMap(hItem[hItem.length-1])"
                              />
            </v-col>
          </div>
        </v-card>
        <div
          v-for="(item,index) in hItem"
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
                <v-col cols="7">
                  <v-img
                    max-height="240"
                    :src="getPict(item)"
                  />
                </v-col>
                <v-col cols="4">
                  <v-img
                    height="240"
                    :src="getPlaceMap(item)"
                  />
                </v-col>
              </v-row>
            </div>
          </v-card>
        </div>

      </div>
<!--    </client-only>-->
    <v-card>
      <v-card-title><span class="h1 ma-2">Mi</span> <span class="subtitle-1">private aid information system</span>
      </v-card-title>
      <h2></h2>
      <v-img src="https://ipfs.io/ipfs/QmbQL11ocGXoSFJZ7zZfMVviUCi7WpxkCDSvuvRk8Cdoh4/images/mi.png"></v-img>
      <v-card-text class="d-flex flex-wrap">
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Server</div>
          <div class="body-2">Information core server</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Front</div>
          <div class="body-2">Basic information front end</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Task</div>
          <div class="body-2">Private task note/editor/viewer</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Monitor</div>
          <div class="body-2">Private activity monitor on PC</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Receiver</div>
          <div class="body-2">Cloud service receive gateway</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Runner</div>
          <div class="body-2">Mascot for Business rest time</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Space</div>
          <div class="body-2">Room power management front end</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Billboard</div>
          <div class="body-2">Enhanced task and private information ticker</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Cam</div>
          <div class="body-2">InHouse body camera capture</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-Sense</div>
          <div class="body-2">Scene/Life environment detect analysis service</div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">Mi-MonitorCs/Mi-MonitorUwp</div>
          <div class="body-2">Headset connector transmitter/Keyboard,Mouse action detect</div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import serverService, {MiHistory, MiStatus} from '~/services/ServerService'

@Component({
  name: 'index'
})
export default class MiRunnerHistory extends Vue {
  // startTime = {start: "", epoch: 0, tripId: 0, status: "", tilEndEpoch: 0, from: "", to: "", duration: ""}
  // start = ''
  private history: MiHistory[][] = [];
  // private history: MiHistory[] = [];
  courseMapUrl = ''

  testUrl = ''

  async mounted() {
    console.log(this.$config.blogServiceEndpoint)
    serverService.setServerBaseUrl(this.$config.blogServiceEndpoint)
    // const startTime = await serverService.getRunnerStartTime();
    // if (typeof startTime !== "string") {
    //   this.start = startTime.start
    //   //this.startTime = startTime
    // }

    const tripList = await serverService.getTripList(100, 10);
    // console.info(`tripList:${tripList}`)
    if (tripList && tripList.length > 6) {
      const map = await Promise.all(tripList.slice(-5,-1).map(value => serverService.getMiHistory(value)));
      // console.log(map)
      this.history = map.filter<MiHistory[]>((value):value is MiHistory[] => value != undefined)
      // console.log(this.history)
      // console.debug(this.history)
    }
  }

  /** 履歴から表示ラベル生成 */
  historyItemToLabel(item: MiHistory) {
    const span = dayjs.duration(item.elapsed, 'seconds')
    return `${span.hours().toString().padStart(2, '0')}:${span.minutes().toString().padStart(2, '0')}`
  }

  /** 履歴取得 */
  // private async getHistory(tripId: string) {
  //   const hist = await serverService.getMiHistory(tripId)
  //   console.log(`hist:${hist}`)
  //   this.history = hist || []
  // }

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
