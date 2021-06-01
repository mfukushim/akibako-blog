<template>
  <div>
    <no-ssr placeholder="Loading...">
      <div
        v-for="item in history"
        :key="item.seq"
      >
        <v-card
          color="#73383d"
          dark class="ma-1"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-col cols="5">
              <v-card-title
                class="headline"
                v-text="historyItemToLabel(item)"
              ></v-card-title>

              <v-card-subtitle v-text="item.address"></v-card-subtitle>
            </v-col>
            <v-col cols="7">
              <v-img
                height="160"
                :src="getPict(item)"
              ></v-img>
            </v-col>
          </div>
        </v-card>
      </div>
      <div>今のMiさん</div>
      <v-img :src="testUrl"></v-img>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import VueKonva from 'vue-konva'
import Konva from 'konva'
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import NumberFormat = Intl.NumberFormat;
import axios from "axios";

Vue.use(VueKonva)
dayjs.extend(duration)

export interface MiHistory {
  tripId: number;
  seq: number;
  time: string;
  address: string;
  elapsed: number;
  lat: number;
  lng: number;
  lazy?: boolean;
}

@Component({
  name: 'MiRunner'
})
export default class MiRunner extends Vue {
  private history: MiHistory[] = [];
  format2 = NumberFormat("ja", {minimumIntegerDigits: 2})

  testUrl = ''

  mounted() {
    //  仮処置
    const now = dayjs()

    this.testUrl = `${this.$config.staticStore}/mi-runner/01.jpg?${now.unix()}`
    // this.testUrl = `${this.$config.staticStore}/mi-runner/1622365654.jpg`

    // axios.get(`${this.$config.staticStore}/mi-runner/log.txt`).then(value => {
    //   const data:string = value.data;
    //   const d = JSON.parse(data)
    //   this.history = d.history
    // })
  }
  /** 履歴から表示ラベル生成 */
  historyItemToLabel(item: MiHistory) {
    const span = dayjs.duration(item.elapsed, "seconds");
    return `${this.format2.format(span.hours())}:${this.format2.format(span.minutes())}`
      + ` ${item.time}`
  }

  getPict(item: MiHistory) {
    return `${this.$config.staticStore}/mi-runner/${item.seq}.jpg`
  }

}
</script>

<style scoped>

</style>
