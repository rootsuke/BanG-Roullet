<template>
  <el-dialog :visible.sync="dialogVisible" title="" width="50%">
    <div id="result">{{ result }}</div>
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
  }

  .el-dialog__header {
    padding: 10px 20px;
    height: 45px;
    background-color: $poppin-party;
    .el-dialog__title {
      color: white;
    }
    .el-dialog__headerbtn {
      top: 10px;
      .el-dialog__close {
        color: white;
      }
    }
  }
</style>
