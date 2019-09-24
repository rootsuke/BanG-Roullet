<template>
  <div>
    <div>
      <canvas id="canvas"></canvas>
    </div>
    <div>
      <input type="text" v-model="element" @keypress.enter="add_element_to_roullet">
      <button v-if="roullet_elements.length != 0 && !isStart" @click="start_roullet()">start</button>
      <button v-if="isStart" @click="stop_roullet()">stop</button>
    </div>
    <list :roullet_elements="roullet_elements" :isStart="isStart" :colors="colors" @elements-edited="draw_roullet()"></list>
  </div>
</template>

<script>
  import Vue from 'vue/dist/vue.esm';
  import colors from '../lib/colors';
  import list from './list';

  Vue.component('list', list);

  export default {
    data() {
      return {
        canvas_width: 300,
        canvas_height: 300,
        context: null,
        element: "",
        roullet_elements: [],
        isStart: false,
        isSlowdown: false,
        colors: colors()
      }
    },

    mounted() {
      const canvas = document.getElementById('canvas')
      canvas.width = this.canvas_width;
      canvas.height = this.canvas_height;
      this.context = canvas.getContext('2d');
      this.init_roullet();
    },

    methods: {
      init_roullet() {
        const context = this.context;
        context.beginPath();
        context.fillStyle = this.colors[0];
        context.arc(150, 150, 100, 0, 2 * Math.PI, false);
        context.fill();
        this.draw_pointer();
      },

      draw_pointer() {
        const context = this.context;
        context.beginPath();
        context.moveTo(150, 55);
        context.lineTo(155, 30);
        context.lineTo(145, 30);
        context.closePath();
        context.fillStyle = 'black';
        context.stroke();
        context.fill();
      },

      add_element_to_roullet() {
        if (this.isStart) {
          // ルーレットが回っているときは要素を追加できない
          return
        } else if (this.roullet_elements.length >= 25) {
          alert('ルーレットの要素は25個までです')
          return
        }
        // 要素をルーレットに追加
        const color = this.colors.shift()
        let el = { title: this.element, isEdit: false, color: color, weight: 1 }
        this.roullet_elements.push(el)
        this.element = ""
        // ルーレットを描画
        this.draw_roullet();
      },

      draw_roullet(offset = 0) {
        const context = this.context
        // ルーレットの描画が重複しないように初期化する
        context.clearRect(0, 0, this.canvas_width, this.canvas_height)
        // ルーレットのピンの位置を始点にするために90度ずらす
        offset -= 90
        const sum_of_weight = this.roullet_elements.reduce((acc, el) => { return acc + el.weight }, 0)
        const len = this.roullet_elements.length
        // ウェイトごとの角度
        const deg_per_weight = 360 / sum_of_weight

        for(let i = 0; i < len; i++) {
          const el = this.roullet_elements[i];
          // ルーレットの要素ごとの角度
          const deg_per_el = deg_per_weight * el.weight;
          context.beginPath()
          context.moveTo(150, 150);
          context.fillStyle = el.color;
          context.arc(150, 150, 100, offset / 180 * Math.PI, (offset + deg_per_el) / 180 * Math.PI, false);
          context.fill()
          // 次のルーレットの要素を描画する始点を更新
          offset += deg_per_el
        }
        this.draw_pointer();
      },

      start_roullet() {
        let offset = 0
        let speed = 1
        let brake = 1
        this.isStart = true

        let roullet = setInterval(() => {
          if (this.isSlowdown) {
            brake += 1 / speed
          }
          speed = 85 / brake
          offset += speed
          this.draw_roullet(offset)

          if (speed < 0.05) {
            clearInterval(roullet)
            const current_deg = 360 - (offset % 360)
            // 完全に停止してから結果を表示する
            setTimeout(() => {
                this.render_result(current_deg)
            }, 30);
          }
        }, 10);
      },

      render_result(current_deg) {
        const len = this.roullet_elements.length
        const deg_per_el = 360 / len
        let start_deg = 0

        for(let i = 0; i < len; i++) {
          let end_deg = start_deg + deg_per_el
          if (start_deg <= current_deg && current_deg < end_deg) {
            alert(this.roullet_elements[i].title)
            break
          }
          start_deg += deg_per_el
        }

        this.isSlowdown = false
        this.isStart = false
      },

      stop_roullet() {
        this.isSlowdown = true
      }
    },
  }
</script>

<style>
</style>
