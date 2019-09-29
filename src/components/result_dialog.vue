<template>
  <el-dialog :visible.sync="dialogVisible" title="ルーレットの結果" width="50%">
    <span>{{ result }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close_dialog()">OK</el-button>
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

<style>
  
</style>
