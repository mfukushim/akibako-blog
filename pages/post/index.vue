<template>
  <div>
    <div v-for="b in posts" :key="b.slug">
      <nuxt-link :to="'/post/'+ b.slug">{{b.title}} {{b.date}}</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData ({ $content, params }) {
    const query = await $content('posts' || 'index').limit(10)
    const posts = await query.fetch()
    return { posts }
  }
}
</script>

<style scoped>

</style>
