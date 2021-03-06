<template>
  <div class="container-fluid">
    <div class="row">
      <result-dialog :dialogVisible="show_result_dialog" :result="result" @on-close-dialog="close_result_dialog()"></result-dialog>
      <destroy-dialog :dialogVisible="show_destroy_dialog" @on-close-dialog="close_destroy_dialog()" @on-confirm="destroy_roullet()"></destroy-dialog>
      <div class="col-sm-12 col-md-6">
        <div id="canvas_container">
          <canvas id="canvas"></canvas>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="input_and_btn">
          <div>
            <div class="input-wrapper">
              <el-input type="text" v-model="element" @keypress.enter.native="add_element_to_roullet()" class="roboto" id="roullet_form"></el-input>
              <i class="fas fa-pencil-alt fa-lg" aria-hidden="true"></i>
            </div>
            <div class="flex flex-end">
              <span @click="reload_roullet()" :class="['icon', reload_btn_class]"><i class="fas fa-redo fa-2x"></i></span>
              <span @click="open_destroy_dialog()" :class="['icon', destroy_btn_class]"><i class="fas fa-bomb fa-2x"></i></span>
              <span v-if="isStart" @click="on_click_stop_btn()" class="icon stop able"><i class="far fa-stop-circle fa-2x"></i></span>
              <span v-else @click="start_roullet()" :class="['icon', start_btn_class]"><i class="far fa-play-circle fa-2x"></i></span>
            </div>
          </div>
          <list :roullet_elements="roullet_elements" :isStart="isStart" :colors="colors" @elements-edited="draw_roullet(roullet_offset)"></list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue/dist/vue.esm'
  import colors from '../lib/colors'
  import list from './list'
  import resultDialog from './result_dialog'
  import destroyDialog from './destroy_dialog'
  import 'element-ui/lib/theme-chalk/index.css'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  Vue.component('list', list)
  Vue.component('result-dialog', resultDialog)
  Vue.component('destroy-dialog', destroyDialog)

  export default {
    data() {
      return {
        canvas: {
          width: 450,
          height: 450
        },
        context: null,
        element: "",
        roullet_elements: [],
        isStart: false,
        isSlowdown: false,
        colors: colors(),
        show_result_dialog: false,
        show_destroy_dialog: false,
        result: {},
        resize_timer_id: 0,
        roullet_offset: 0
      }
    },

    mounted() {
      window.addEventListener('resize',() => {
        this.set_resize_timer()
      }, false)

      const width = document.getElementById('canvas_container').clientWidth
      this.canvas.width = width
      this.canvas.height = width
      const canvas = document.getElementById('canvas')
      canvas.width = width
      canvas.height = width
      this.context = canvas.getContext('2d')
      this.init_roullet()
    },

    computed: {
      sum_of_weight() {
        return this.roullet_elements.reduce((acc, el) => { return acc + el.weight }, 0)
      },

      element_count() {
        return this.roullet_elements.length
      },

      center() {
        return this.canvas.width / 2
      },

      r() {
        return this.center - 25
      },

      can_start() {
        return this.element_count != 0 && !this.isStart
      },

      can_reload() {
        return this.element_count != 0 && !this.isStart && this.roullet_offset != 0
      },

      can_destroy() {
        return this.element_count != 0 && !this.isStart
      },

      reload_btn_class() {
        return this.can_reload ? ['reload', 'able'] : 'unable'
      },

      destroy_btn_class() {
        return this.can_destroy ? ['destroy', 'able'] : 'unable'
      },

      start_btn_class() {
        return this.can_start ? ['start', 'able'] : 'unable'
      }
    },

    methods: {
      set_resize_timer() {
        // タイマーが設定されていたらreturn
        if (this.resize_timer_id) {
          return
        }
        // 300ミリ秒ごとにcanvasをリサイズする
        this.resize_timer_id = setTimeout(() => {
          this.resize_timer_id = 0
          this.resize_canvas()
        }, 300)
      },

      init_roullet() {
        const context = this.context
        context.beginPath()
        context.fillStyle = this.colors[0]
        context.arc(this.center, this.center, this.r, 0, 2 * Math.PI, false)
        context.fill()
        this.draw_pointer()
      },

      reload_roullet() {
        if (!this.can_reload) { return }
        this.roullet_offset = 0
        this.draw_roullet()
      },

      destroy_roullet() {
        if (!this.can_destroy) { return }
        this.roullet_elements = []
        this.colors = colors()
        this.roullet_offset = 0
        this.init_roullet()
      },

      add_element_to_roullet() {
        if (this.isStart) {
          // ルーレットが回っているときは要素を追加できない
          return
        } else if (this.element_count >= 25) {
          alert('ルーレットの要素は25個までです')
          return
        }
        // 要素をルーレットに追加
        const color = this.colors.shift()
        let el = { title: this.element, isEdit: false, color: color, weight: 5 }
        this.roullet_elements.push(el)
        this.element = ""
        // ルーレットを描画
        this.draw_roullet(this.roullet_offset)
      },
      
      resize_canvas() {
        const width = document.getElementById('canvas_container').clientWidth
        const canvas = document.getElementById('canvas')
        this.canvas.width = width
        this.canvas.height = width
        canvas.width = this.canvas.width
        canvas.height = this.canvas.height
        if (this.element_count == 0) {
          this.init_roullet()
        } else {
          this.draw_roullet(this.roullet_offset)
        }
      },

      draw_roullet(offset = 0) {
        const context = this.context
        const center = this.center
        // ルーレットの描画が重複しないように初期化する
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // ルーレットのピンの位置を始点にするために90度ずらす
        offset -= 90
        // ウェイトごとの角度
        const deg_per_weight = 360 / this.sum_of_weight

        for(let i = 0; i < this.element_count; i++) {
          const el = this.roullet_elements[i]
          // ルーレットの要素ごとの角度
          const deg_per_el = deg_per_weight * el.weight
          context.beginPath()
          context.moveTo(center, center)
          context.fillStyle = el.color
          // arc(x軸の中心, y軸の中心, 半径, 円弧の始まりのラジアン角, 円弧の終わりのラジアン角)
          context.arc(center, center, this.r, offset / 180 * Math.PI, (offset + deg_per_el) / 180 * Math.PI, false)
          context.fill()
          // 次のルーレットの要素を描画する始点を更新
          offset += deg_per_el
        }
        this.draw_pointer()
      },

      draw_pointer() {
        const c = this.center
        const context = this.context
        context.beginPath()
        context.moveTo(c, 45)
        context.lineTo(c+7, 5)
        context.lineTo(c-7, 5)
        context.closePath()
        context.fillStyle = '#6a6a6a'
        context.fill()
      },

      start_roullet() {
        if (!this.can_start) { return }
        let offset = 0
        let speed = 1
        let brake = 1
        this.isStart = true

        let roullet = setInterval(() => {
          if (this.isSlowdown) {
            // スピードが下がるほどブレーキが強くなる
            brake += 1 / speed
          }
          // ブレーキが強くなるほどスピードが下がる
          speed = 55 / brake
          offset += speed
          this.draw_roullet(offset)
          this.roullet_offset = offset

          if (speed < 0.05) {
            clearInterval(roullet)
            this.stop_roullet(offset)
          }
        }, 10)
      },

      stop_roullet(offset) {
        // ルーレットが何度回転したか求める
        const current_deg = 360 - (offset % 360)
        // 完全に停止してから結果を表示する
        setTimeout(() => {
          this.render_result(current_deg)
        }, 100)
      },

      render_result(current_deg) {
        const deg_per_weight = 360 / this.sum_of_weight
        let start_deg = 0

        for(let i = 0; i < this.element_count; i++) {
          const el = this.roullet_elements[i]
          const deg_per_el = deg_per_weight * el.weight
          let end_deg = start_deg + deg_per_el

          // 当たった要素を求める処理
          if (start_deg <= current_deg && current_deg < end_deg) {
            this.show_result_dialog = true
            this.result = { title: el.title, color: el.color }
            break
          }
          start_deg += deg_per_el
        }

        this.isSlowdown = false
        this.isStart = false
      },

      on_click_stop_btn() {
        this.isSlowdown = true
      },

      open_destroy_dialog() {
        if (!this.can_destroy) { return }
        this.show_destroy_dialog = true
      },

      close_destroy_dialog() {
        this.show_destroy_dialog = false
      },

      close_result_dialog() {
        this.show_result_dialog = false
      }
    },
  }
</script>

<style lang='scss'>
  .input_and_btn {
    padding: 40px 20px;
    .el-input {
      margin-right: 5%;
    }
  }

  #roullet_form {
    margin-bottom: 10px;
    font-size: 18px;
  }
</style>
