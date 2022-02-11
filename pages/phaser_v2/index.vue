<template>
  <div>
<!--    <Practice3></Practice3>-->
  </div>
</template>
<script lang="ts">
// import { Context } from '@nuxt/types'
import {Component, Vue} from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import Practice3 from '~/components/phaser/Practice3.vue'
// import { BlogInfo, Common } from '~/services/Common'

dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

@Component({
  name: 'PhaserV2',
  components: {
    Practice3
  }
})
export default class PhaserV2 extends Vue {
}
</script>

<style scoped>

</style>
