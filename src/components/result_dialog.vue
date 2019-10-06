<template>
  <el-dialog :visible.sync="dialogVisible" 
             :show-close="false"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             width="50%">
    <div id="result" class="flex flex-center">
      <div :style="{'background-color': result.color}" class="label"></div>
      <div>{{ result.title }}</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <button @click="close_dialog()" class="btn btn-poppin-party">OK</button>
    </span>
  </el-dialog>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css'

  export default {
    props: ["dialogVisible", "result"],

    methods: {
      close_dialog() {
        this.$emit('on-close-dialog')
      }
    },

  }
</script>

<style lang='scss'>
  #result {
    margin: 25px 0 15px 0;
    text-align: center;
    font-size: 26px;
    justify-content: center;
  }
</style>
