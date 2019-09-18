<template>
    <div>
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                doc: null
            }
        },
        mounted() {
            const canvas = document.getElementById('canvas')
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'green';
            ctx.fillRect(10, 10, 150, 100);
        }
    }
</script>

<style>
</style>
