<template>
  <span>
    <span v-for="cat in body.categories">
        <nuxt-link :to="`/Categories/${cat}`" class="pa-1">
          <v-chip small>{{ cat }}</v-chip>
        </nuxt-link>
    </span>
  </span>
</template>

<script>
export default {
  name: 'CategoryView',
  props: {
    body: null
  },
}
</script>

<style scoped>

</style>
