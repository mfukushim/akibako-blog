<template>
  <div>
    <MiSystem :fullMode="true"></MiSystem>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'

@Component({
  name: 'MiPage'
})
export default class MiPage extends Vue {

}
</script>
