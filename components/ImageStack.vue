<template>
  <div>
    <no-ssr placeholder="Loading...">
      <v-stage :config="configKonva">
        <v-layer ref="layer" />
        <v-layer />
      </v-stage>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import VueKonva from 'vue-konva'
import Konva from 'konva'
import serverService from '~/services/ServerService'

Vue.use(VueKonva)

@Component({
  name: 'ImageStack'
})
export default class ImageStack extends Vue {
  @Prop()
  storeUrl?: string
  baseLayer?: Konva.Layer
  configKonva = {
    width: 800,
    height: 300
  };
  configText: Konva.TextConfig = {
    x: 25,
    y: 5,
    text: 'あきばこ工房',
    fontSize: 26,
    fill: 'black'
  }
  img: Konva.ImageConfig = {} as Konva.ImageConfig
  imageList: HTMLImageElement[] = []

  mounted() {
    serverService.setServerBaseUrl(this.$config.blogServiceEndpoint)
    let imageGetList:string[] = []
    serverService.getImageStackSourceInfo().then((value) => {
      imageGetList = value
      // console.log(imageGetList)
    }).finally(() => {
      if (process.client) {
        this.configKonva.width = window.innerWidth
        // Promise.all(Array.from(new Array(7).keys()).map((value) => {
        Promise.all(imageGetList.map((value) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const image = new window.Image()
            image.src = `${this.storeUrl}/${value}`
            // image.src = `${this.storeUrl}/${value.toString().padStart(2, '0')}.jpg`
            return resolve(image)
          })
        })).then((value) => {
          this.imageList = value
          this.add(0)
        })
        if (this.$refs.layer) {
          this.baseLayer = (this.$refs.layer as unknown as Konva.Transformer).getNode() as Konva.Layer //  ここはどう書くのがよいのか
          if (this.baseLayer) {
            // this.configKonva.width = this.baseLayer.width()
            this.configText.x = this.baseLayer.width()
          }
          // this.baseLayer.clear()
        }
      }
    })
  }

  add(seq: number) {
    const imgNo = seq % this.imageList.length
    if (!this.$refs.layer) { return }
    this.baseLayer = (this.$refs.layer as unknown as Konva.Transformer).getNode() as Konva.Layer //  ここはどう書くのがよいのか
    if (!this.baseLayer) { return }
    const offsetX = (Math.random()) * window.innerWidth * 0.7
    const offsetY = (Math.random()) * 200
    const baseWidth = this.imageList[imgNo].width * (200 / this.imageList[imgNo].height)
    const imgOrigin = {
      x: offsetX,
      y: 50 + offsetY,
      width: baseWidth,
      height: 200,
      rotation: (Math.random() - 0.5) * 360,
      scale: {x: 10, y: 10},
      opacity: 0,
      image: this.imageList[imgNo],
      offset: {x: baseWidth / 2, y: 100}
    }
    const io = new Konva.Image(imgOrigin)
    this.baseLayer.add(io)
    const tw1 = new Konva.Tween({
      node: io,
      duration: 10,
      scaleX: 1,
      scaleY: 1,
      easing: Math.floor(seq / this.imageList.length) % 2 ? Konva.Easings.BounceEaseOut : Konva.Easings.StrongEaseOut,
      // onUpdate: () => {
      // },
      onFinish: () => {
        this.pause(seq)
      }
    })
    const tw2 = new Konva.Tween({
      node: io,
      duration: 10,
      easing: Konva.Easings.EaseOut,
      // onUpdate: () => {
      // },
      // onFinish: () => {
      // },
      rotation: (Math.random() - 0.5) * 360,
      opacity: 1
    })
    tw1.play()
    tw2.play()
  }

  pause(seq: number) {
    if (!this.$refs.layer) { return }
    this.baseLayer = (this.$refs.layer as unknown as Konva.Transformer).getNode() as Konva.Layer //  ここはどう書くのがよいのか
    if (!this.baseLayer) { return }
    const tw1 = new Konva.Tween({
      node: this.baseLayer,
      duration: 10,
      scaleX: 1,
      scaleY: 1,
      easing: Konva.Easings.Linear,
      // onUpdate: () => {
      // },
      onFinish: () => {
        const imgNo = seq % this.imageList.length
        if (this.baseLayer && imgNo === this.imageList.length - 1) {
          this.baseLayer.children.toArray().forEach(value => value.remove())
          this.baseLayer.opacity(1)
        }
        this.add(seq + 1)
      },
      opacity: 1
    })
    tw1.play()
  }
}
</script>

<style scoped>

</style>
