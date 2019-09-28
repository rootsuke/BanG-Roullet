<template>
  <el-dialog :visible.sync="dialogVisible" title="ルーレットの結果" width="30%">
    <span>{{ result }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close_dialog()">OK</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import Vue from 'vue/dist/vue.esm'
  import { Button, Dialog } from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'

  Vue.use(Button)
  Vue.use(Dialog)

  export default {
    props: ["dialogVisible", "result"],

    methods: {
      close_dialog() {
        this.$emit('on-close-dialog')
      }
    },

  }
</script>

<style>
  
</style>
