<template>
    <div>
        <canvas id="canvas"></canvas>
        <input type="text" v-model="element" @keypress.enter="add_element_to_roullet">
        <button @click="start_roullet()">start</button>
        <button @click="stop_roullet()">stop</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                canvas_width: 300,
                canvas_height: 300,
                context: null,
                element: "",
                roullet_elements: [],
                isStop: false,
                colors: [{ chara: 'kasumi',   color: '#FFBBA6' }, { chara: 'otae',    color: '#7FBBEE' }, { chara: 'rimi',    color: '#FFAADD' }, { chara: 'saya',  color: '#FFE588' }, { charr: 'arisa',   color: '#D4B2EE' },
                         { chara: 'ran',      color: '#F67F90' }, { chara: 'mocha',   color: '#7FE5D4' }, { chara: 'himari',  color: '#FFCCCC' }, { chara: 'soiya', color: '#DD7F99' }, { charr: 'tsugu',   color: '#FFF6C3' },
                         { chara: 'maruyama', color: '#FFC3DD' }, { chara: 'hina',    color: '#AAEEF6' }, { chara: 'chisato', color: '#FFF6D4' }, { chara: 'maya',  color: '#CCEEC3' }, { charr: 'bushido', color: '#EEDDFF' },
                         { chara: 'yukina',   color: '#C388C3' }, { chara: 'sayo',    color: '#7FD4DD' }, { chara: 'risa',    color: '#EE907F' }, { chara: 'ako',   color: '#EE7FC3' }, { charr: 'rinko',   color: '#DDDDDD' },
                         { chara: 'kokoro',   color: '#FFF690' }, { chara: 'hakanai', color: '#D499E5' }, { chara: 'hagu',    color: '#FFCC90' }, { chara: 'kanon', color: '#A1EEFF' }, { charr: 'misaki',  color: '#84B1CD' } ]
            }
        },
        mounted() {
            const canvas = document.getElementById('canvas')
            canvas.width = this.canvas_width;
            canvas.height = this.canvas_height;
            this.context = canvas.getContext('2d');
        },
        methods: {
            add_element_to_roullet() {
                // 要素を25個までに制限する
                if (this.roullet_elements.length >= 25) {
                    alert('ルーレットの要素は25個までです')
                    return
                }
                // 要素をルーレットに追加
                var el = { title: this.element }
                this.roullet_elements.push(el)
                this.element = ""
                // ルーレットを描画
                this.draw_roullet();
            },
            draw_roullet(offset = 0) {
                const context = this.context
                // ルーレットの描画が重複しないように初期化する
                context.clearRect(0, 0, this.canvas_width, this.canvas_height)
                // 描画開始座標を90度ずらす
                offset -= 90
                const len = this.roullet_elements.length
                // ルーレットの要素の角度
                const deg_per_el = 360 / len

                for(var i = 0; i < len; i++) {
                    const el = this.roullet_elements[i]
                    context.beginPath()
                    context.moveTo(150, 150);
                    context.fillStyle = this.colors[i].color;
                    context.arc(150, 150, 100, (offset) / 180 * Math.PI, (offset + deg_per_el) / 180 * Math.PI, false);
                    context.fill()
                    // 次のルーレットの要素の描画開始座標を更新
                    offset += deg_per_el
                }
            },
            start_roullet() {
                var offset = 0
                var speed = 1
                var brake = 1
                var roullet = setInterval(() => {
                    if (this.isStop) {
                        brake += 0.13
                    }
                    speed = 100 / brake
                    offset += speed
                    this.draw_roullet(offset)

                    if (speed < 0.4) {
                        clearInterval(roullet)
                        this.isStop = false
                    }
                }, 10);
            },
            stop_roullet() {
                this.isStop = true
            }
        },
    }
</script>

<style>
</style>
