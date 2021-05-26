<template>
  <div>
  </div>
</template>
<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { BlogInfo, Common } from '~/services/Common'

@Component({
  name: 'Category'
})
export default class Category0 extends Vue {

  fetch({ redirect,params }) {
    redirect(301, `/categories/${params.category}/1`)
  }

  back () {
    this.$router.back()
  }
}
</script>

<style scoped>

</style>
