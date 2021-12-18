<template>
  <span>
  <nuxt-link :to="`/${article.year}`" class="pa-1">
    <v-chip small>
      {{ article.year }}
    </v-chip>
  </nuxt-link>
  <nuxt-link :to="`/${article.year}/${article.month}`" class="pa-1">
    <v-chip small>
      {{ article.month }}- {{ article.day }}
    </v-chip>
  </nuxt-link>
  </span>
</template>

<script>
export default {
  name: 'DateView',
  props: {
    article: null
  }
}
</script>

<style scoped>

</style>
