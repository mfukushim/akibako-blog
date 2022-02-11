<template>
  <div>
<!--    <ion-phaser-ce
      :game.prop="gamePack"
      :initialize.prop="initialize"
    />-->
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
// @ts-ignore
// import Phaser from 'phaser-ce'
/*
import * as path from 'path'

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
// const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
//  @ts-ignore
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
//  @ts-ignore
const p2 = path.join(phaserModule, 'build/custom/p2.js')
// import 'pixi'
// import 'p2'
// import 'phaser'
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
// @ts-ignore
import Phaser from 'phaser-ce'
// //  @ts-ignore
// import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
// const path = require('path')
// const webpack = require('webpack')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// Phaser webpack config
// const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
// export const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
// export const pixi = path.join(phaserModule, 'build/custom/pixi.js')
// export const p2 = path.join(phaserModule, 'build/custom/p2.js')

Vue.config.productionTip = false
Vue.config.ignoredElements = [/ion-\w*!/]
*/

@Component({
  name: 'Practice3',
  components: {}
})

/**
 //  おみくじサンプル
 //  おみくじ結果の繰り出し
 *
 */
export default class Practice3 extends Vue {
/*
  initialize = true
  game!: Phaser.Game
  state!: Phaser.State
  world!: Phaser.World
  tweens!: Phaser.TweenManager
  arrowList: Phaser.Sprite[] = [];
  ringList: Phaser.Sprite[] = [];
  //
  back!: Phaser.Sprite;
  kujisp!: Phaser.Sprite; //  くじ文字
  kujisize!: Phaser.Point;
  kujiback!: Phaser.Sprite; //  くじ背景
  kujibacksize!: Phaser.Point;

  gamePack: any = {
    width: 400, //  "100%"
    height: 300, //  "100%"
    renderer: Phaser.AUTO,
    state: {
      init: () => {
        this.init()
      },
      preload: () => {
        this.preload()
      },
      create: () => {
        this.create()
      },
      update: () => {
        this.update()
      },
      shutdown: () => {
        this.shutdown()
      }
    }
  }

  preload() {
    const assetpath = ''
    this.game = this.gamePack.instance
    this.game.load.image('white', assetpath + 'asset/white64_64.png')
    //

    this.game.load.image('bg_pink', assetpath + 'asset/bgp6464.png')
    this.game.load.spritesheet('omikuji', assetpath + 'asset/omikuji128_256_6.png', 128, 256)
  }

  init() {
    this.gamePack.state.stage.backgroundColor = '#24252A'
    this.game = this.gamePack.instance
    this.state = this.gamePack.state
    this.world = this.gamePack.state.world
    this.tweens = this.state.tweens
  }

  create() {
    //  背景
    this.back = this.game.add.sprite(this.world.centerX, this.world.centerY, 'bg_pink')
    this.back.anchor.set(0.5, 0.5)
    this.back.width = this.world.width
    this.back.height = this.world.height

    //  乱数おみくじ
    let kujisel = 0
    const kujinum = this.game.rnd.frac()
    if (kujinum < 0.05) {
      kujisel = 0 //  大吉
    } else if (kujinum < 0.15) {
      kujisel = 1 //  中吉
    } else if (kujinum < 0.4) {
      kujisel = 2 //  小吉
    } else if (kujinum < 0.85) {
      kujisel = 3 //  吉
    } else if (kujinum < 0.95) {
      kujisel = 4 //  凶
    } else {
      kujisel = 5 //  大凶
    }

    //  おみくじ背景
    this.kujiback = this.game.add.sprite(this.world.centerX, this.world.centerY, 'white')
    this.kujibacksize = new Phaser.Point(this.kujiback.width, this.kujiback.height)
    this.kujiback.anchor.set(0.5, 1)
    //  おみくじテキスト
    this.kujisp = this.game.add.sprite(this.world.centerX, this.world.centerY, 'omikuji', kujisel)
    this.kujisize = new Phaser.Point(this.kujisp.width, this.kujisp.height)
    this.kujisp.tint = 0
    this.kujisp.anchor.set(0.5, 1)

    this.resize()

    this.game.time.events.add(Phaser.Timer.SECOND * 5, this.next, this)
  }

  next() {
    this.game.state.start('Practice4', true, false)
  }

  update() {
    this.kujiback.updateCrop()
    this.kujisp.updateCrop()
  }

  resize() {
    //  tweenをリセット
    this.tweens.removeAll()
    //  背景リサイズ調整
    this.back.position.set(this.world.centerX, this.world.centerY)
    this.back.width = this.world.width
    this.back.height = this.world.height

    //  画面サイズがテクスチャーより小さければ、合わせておみくじ文字を縮小
    let scale = 1
    if (this.world.width / this.kujisize.x < 1) { scale = Math.min(scale, this.world.width / this.kujisize.x * 0.9) }
    if (this.world.height / this.kujisize.y < 1) { scale = Math.min(scale, this.world.height / this.kujisize.y * 0.9) }
    const kw = this.kujisize.x * scale
    const kh = this.kujisize.y * scale
    this.kujisp.scale.set(scale, scale)
    this.kujiback.width = kw
    this.kujiback.height = kh

    // this.kujisp.position.set(this.world.centerX, this.world.centerY );
    this.kujisp.position.set(this.world.centerX, this.world.centerY + kh / 2)
    this.kujiback.position.set(this.world.centerX, this.world.centerY + kh / 2)

    const cropRect1 = new Phaser.Rectangle(0, 0, this.kujisize.x, 0)
    this.game.add.tween(cropRect1).to({height: this.kujisize.y}, 1000, Phaser.Easing.Linear.None, true)
    this.kujisp.crop(cropRect1, false)
    const cropRect2 = new Phaser.Rectangle(0, 0, this.kujibacksize.x, 0)
    this.game.add.tween(cropRect2).to({height: this.kujibacksize.y}, 1000, Phaser.Easing.Linear.None, true)
    this.kujiback.crop(cropRect2, false)
  }

  shutdown() {
    this.back.destroy()
    this.kujisp.destroy()
    this.kujiback.destroy()
  }
*/

  // mounted() {
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ion-phaser-ce {
  position: absolute;
  width: 400px;
  height: 300px;
}
</style>
