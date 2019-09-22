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
        <ul>
            <li v-for="(element, i) in roullet_elements" :key="i">
                <span :style="{'background-color': element.color}" class="label"></span>
                {{ element.title }}
            </li>
        </ul>
    </div>
</template>

<script>
    import colors from '../lib/colors';

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
                context.fillStyle = this.colors[0].color;
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
                // 要素を25個までに制限する
                if (this.roullet_elements.length >= 25) {
                    alert('ルーレットの要素は25個までです')
                    return
                }
                // 要素をルーレットに追加
                let el = { title: this.element }
                this.roullet_elements.push(el)
                this.element = ""
                // ルーレットを描画
                this.draw_roullet();
            },
            draw_roullet(offset = 0) {
                const context = this.context
                // ルーレットの描画が重複しないように初期化する
                context.clearRect(0, 0, this.canvas_width, this.canvas_height)
                // ルーレットの描画開始座標を90度ずらす
                offset -= 90
                const len = this.roullet_elements.length
                // ルーレットの要素の角度
                const deg_per_el = 360 / len

                for(let i = 0; i < len; i++) {
                    const el = this.roullet_elements[i];
                    const color = this.colors[i].color;
                    el.color = color;
                    context.beginPath()
                    context.moveTo(150, 150);
                    context.fillStyle = color;
                    context.arc(150, 150, 100, offset / 180 * Math.PI, (offset + deg_per_el) / 180 * Math.PI, false);
                    context.fill()
                    // 次のルーレットの要素の描画開始座標を更新
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
                        brake += 0.13
                    }
                    speed = 100 / brake
                    offset += speed
                    this.draw_roullet(offset)

                    if (speed < 0.4) {
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
    li {
        list-style: none;
    }

    .label {
        width: 15px;
        height: 15px;
        display: inline-block;
    }
</style>
