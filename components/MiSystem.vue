<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="h1 ma-2">Mi</span> <span class="subtitle-1">private aid information system</span>
      </v-card-title>
      <v-card-subtitle>2021/12/18</v-card-subtitle>
      <v-card-text class="d-flex flex-wrap">
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">
            Mi-Server
          </div>
          <div class="body-2">
            Information core server
          </div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">
            Mi-Front
          </div>
          <div class="body-2">
            Basic information front end
          </div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">
            Mi-Task
          </div>
          <div class="body-2">
            Private task note/editor/viewer
          </div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">
            Mi-Monitor
          </div>
          <div class="body-2">
            Private activity monitor on PC
          </div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">
            Mi-Receiver
          </div>
          <div class="body-2">
            Cloud service receive gateway
          </div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">
            Mi-Runner
          </div>
          <div class="body-2">
            Mascot for Business rest time
          </div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">
            Mi-Space
          </div>
          <div class="body-2">
            Room power management front end
          </div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">
            Mi-Billboard
          </div>
          <div class="body-2">
            Enhanced task and private information ticker
          </div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">
            Mi-Cam
          </div>
          <div class="body-2">
            InHouse body camera capture
          </div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">
            Mi-Sense
          </div>
          <div class="body-2">
            Scene/Life environment detect analysis service
          </div>
        </div>
        <div class="col-6">
          <div class="subtitle-1 font-weight-bold">
            Mi-MonitorCs/Mi-MonitorUwp
          </div>
          <div class="body-2">
            Headset connector transmitter/Keyboard,Mouse action detect
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-expansion-panels v-if="fullMode">
      <v-expansion-panel>
        <v-expansion-panel-header>
          2021/11/19
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-img src="https://ipfs.io/ipfs/QmUBjiaKtMNNj1zuj6FQyzqU2oG3oyKFcpywSz5b6vi4St"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

@Component({
  name: 'MiSystem'
})
export default class MiSystem extends Vue {
  @Prop()
  fullMode: any
}
</script>

<style scoped>

</style>
