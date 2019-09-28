<template>
  <div class="flex">
    <div>
      <canvas id="canvas"></canvas>
    </div>
    <div>
      <input type="text" v-model="element" @keypress.enter="add_element_to_roullet">
      <button v-if="element_count != 0 && !isStart" @click="start_roullet()">start</button>
      <button v-if="isStart" @click="stop_roullet()">stop</button>
      <list :roullet_elements="roullet_elements" :isStart="isStart" :colors="colors" @elements-edited="draw_roullet()"></list>
    </div>
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
        canvas: {
          width: 600,
          height: 600
        },
        center: 300,
        r: 250,
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
      canvas.width = this.canvas.width;
      canvas.height = this.canvas.height;
      this.context = canvas.getContext('2d');
      this.init_roullet();
    },

    computed: {
      sum_of_weight() {
        return this.roullet_elements.reduce((acc, el) => { return acc + el.weight }, 0)
      },

      element_count() {
        return this.roullet_elements.length
      }
    },

    methods: {
      init_roullet() {
        const context = this.context;
        context.beginPath();
        context.fillStyle = this.colors[0];
        context.arc(this.center, this.center, this.r, 0, 2 * Math.PI, false);
        context.fill();
        this.draw_pointer();
      },

      draw_pointer() {
        const context = this.context;
        context.beginPath();
        context.moveTo(300, 75);
        context.lineTo(310, 25);
        context.lineTo(290, 25);
        context.closePath();
        context.fillStyle = '#5c5c5c';
        context.fill();
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
        this.draw_roullet();
      },

      draw_roullet(offset = 0) {
        const context = this.context
        // ルーレットの描画が重複しないように初期化する
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // ルーレットのピンの位置を始点にするために90度ずらす
        offset -= 90
        // ウェイトごとの角度
        const deg_per_weight = 360 / this.sum_of_weight

        for(let i = 0; i < this.element_count; i++) {
          const el = this.roullet_elements[i];
          // ルーレットの要素ごとの角度
          const deg_per_el = deg_per_weight * el.weight;
          context.beginPath()
          context.moveTo(this.center, this.center);
          context.fillStyle = el.color;
          context.arc(this.center, this.center, this.r, offset / 180 * Math.PI, (offset + deg_per_el) / 180 * Math.PI, false);
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
        const deg_per_weight = 360 / this.sum_of_weight
        let start_deg = 0

        for(let i = 0; i < this.element_count; i++) {
          const el = this.roullet_elements[i];
          const deg_per_el = deg_per_weight * el.weight;
          let end_deg = start_deg + deg_per_el
          if (start_deg <= current_deg && current_deg < end_deg) {
            alert(el.title)
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
  .flex {
    display: flex;
  }
</style>
