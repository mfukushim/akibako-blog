<template>
  <div>
    <no-ssr placeholder="Loading...">
      <v-stage :config="configKonva">
        <v-layer ref="layer">
          <!--          <v-image :config="img"></v-image>-->
          <v-text :config="{
                  x: 25,
                  y: 5,
                  text: 'abc',
                  fill: 'black'
                }"></v-text>
          <!--          <v-circle :config="configCircle"></v-circle>-->
        </v-layer>
      </v-stage>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import {Context} from '@nuxt/types'
import {Component, Prop, Vue} from 'nuxt-property-decorator'

import VueKonva from 'vue-konva'
import Konva from 'konva'
import {Node} from "konva/types/Node";

Vue.use(VueKonva)

@Component({
  name: 'ImageStack'
})
export default class ImageStack extends Vue {
  @Prop()
  storeUrl?: string

  configKonva = {
    width: 800,
    height: 600
  };
  img: Konva.ImageConfig = {} as Konva.ImageConfig
  imgObj?: Konva.Image
  imgTween?: Konva.Tween
  imageList: HTMLImageElement[] = []

  mounted() {
    if (process.client) {
      this.configKonva.width = window.innerWidth

      Promise.all(Array.from(new Array(7).keys()).map(value => {
        return new Promise<HTMLImageElement>(resolve => {
          const image = new window.Image()
          image.src = `${this.storeUrl}/${value.toString().padStart(2,'0')}.jpg`
          return resolve(image)
        })
      })).then(value => {
        this.imageList = value
        this.add(7)
      })
      if (this.$refs.layer) {
        const layer = (this.$refs.layer as unknown as Konva.Transformer).getNode() as Konva.Layer  //  ここはどう書くのがよいのか
        layer.clear()
      }
      /*
            const image = new window.Image()
            image.src = `${this.storeUrl}/00.jpg`
            image.onload = () => {
              this.img = {
                x: 400,
                y: 400,
                width: 200,
                height: 200,
                rotation: 45,
                scale: {x: 3, y: 3},
                opacity: 0,
                // scale: scale,
                image: image,
                offset: {x: 100, y: 100}
              }
              // if (this.$refs.layer) {
              const layer = (this.$refs.layer as unknown as Konva.Transformer).getNode() as Konva.Layer  //  ここはどう書くのがよいのか
              this.imgObj = new Konva.Image(this.img)
              layer.add(this.imgObj)
              this.imgTween = new Konva.Tween({
                node: this.imgObj,
                duration: 10,
                scaleX: 1,
                scaleY: 1,
                easing: Konva.Easings.EaseIn,
                onUpdate: () => {
                },
                onFinish: () => {
                  this.add()
                },
                rotation: Math.PI * 2,
                opacity: 1
              })
              this.imgTween.play()
              // ig.rotation(50)
              // }
            }
            const period = 50000
      */


    }
  }

  add(imgNo:number) {
    if (imgNo <= 0) {
      return
    }
    const currentNo = imgNo-1;
    const layer = (this.$refs.layer as unknown as Konva.Transformer).getNode() as Konva.Layer  //  ここはどう書くのがよいのか
    const offsetX = (Math.random()-1)*150
    const imgOrigin = {
      x: this.configKonva.width/2+offsetX,
      y: 400,
      width: 200,
      height: 200,
      rotation: 0,
      scale: {x: 10, y: 10},
      opacity: 0,
      // scale: scale,
      image: this.imageList[currentNo],
      offset: {x: 100+offsetX, y: 100}
    }
    const io = new Konva.Image(imgOrigin)
    layer.add(io)
    const tw1 = new Konva.Tween({
      node: io,
      duration: 10,
      scaleX: 1,
      scaleY: 1,
      easing: Konva.Easings.EaseOut,
      onUpdate: () => {
      },
      onFinish: () => {
        this.add(currentNo)
      },
      opacity: 1
    })
    const tw2 = new Konva.Tween({
      node: io,
      duration: 10,
      // offset: {x: (Math.random()-1)*150, y: (Math.random()-1)*150},
      // offsetX: (Math.random()-1)*150,
      easing: Konva.Easings.Linear,
      onUpdate: () => {
      },
      onFinish: () => {
      },
      rotation: 360 * 2+Math.random()*360,
    })
    tw1.play()
    tw2.play()
  }
}
</script>

<style scoped>

</style>
