<template>
  <div>
    <no-ssr placeholder="Loading...">
      <v-stage :config="configKonva">
        <v-layer ref="layer">
          <v-image :config="img"></v-image>
          <v-text :config="{
                  x: 25,
                  y: 5,
                  text: 'abc',
                  fill: 'white'
                }"></v-text>
          <v-circle :config="configCircle"></v-circle>
        </v-layer>
      </v-stage>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

import VueKonva from 'vue-konva'
import Konva from 'konva'

Vue.use(VueKonva)

@Component({
  name: 'ImageStack'
})
export default class ImageStack extends Vue {
  configKonva = {
    width: 800,
    height: 600
  }
  configCircle = {
    x: 100,
    y: 100,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
  }
  img?: Konva.ImageConfig = {}

  mounted () {
    if (process.client) {
      this.configKonva.width = window.innerWidth

      const image = new window.Image()
      image.src = 'images/IMG_20191107_093158_3-1024x734.jpg'
      image.onload = () => {
        this.img = {
          x: 400,
          y: 0,
          width: 200,
          height: 200,
          rotation: 45,
          scale: 3,
          opacity: 0.5,
          // scale: scale,
          image: image
        }
      }
      const period = 50000

      console.log(this.$refs.layer)
      if (this.$refs.layer) {
        const layer = (this.$refs.layer as unknown as Konva.Transformer).getNode() as Konva.Layer  //  ここはどう書くのがよいのか
        console.log(layer)
        const anim = new Konva.Animation((frame) => {
          console.log(frame)
          if (frame) {
            layer.children.each(child => {
              child.x(this.configKonva.width * 0.4 + this.configKonva.width * 0.4 *
                Math.sin(child.attrs['orgX'] + (frame?.time * 2 * Math.PI) / period))
              // child.setX(this.configKonva.width * 0.4 + this.configKonva.width * 0.4 *
              //     Math.sin(child.attrs["orgX"] + (frame.time * 2 * Math.PI) / period))
            })
          }
        }, layer)
        anim.start()

      }

    }
  }
}
</script>

<style scoped>

</style>
