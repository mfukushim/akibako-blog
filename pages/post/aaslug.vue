<template>
  <article>
    <h1>{{post.title}}</h1>
    <p>{{post.date}}</p>
    <nuxt-content :document="post" />
  </article>
</template>
<script>
export default {
  async asyncData ({ $content, params }) {
    const post = await $content('posts', {deep: true}).fetch()
    // const post = await $content('posts', params.slug || 'index').fetch()
    return { post }
  }
}
</script>

<style scoped>

</style>
