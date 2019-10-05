<template>
  <el-dialog :visible.sync="dialogVisible" width="50%">
    <div id="confirm_msg">
      ルーレットを初期化してよろしいですか？
    </div>
    <span slot="footer" class="dialog-footer">
      <button @click="close_dialog()" class="btn btn-default">キャンセル</button>
      <button @click="confirm()" class="btn btn-after-glow">OK</button>
    </span>
  </el-dialog>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css'

  export default {
    props: ["dialogVisible"],

    methods: {
      close_dialog() {
        this.$emit('on-close-dialog')
      },

      confirm() {
        this.$emit('on-confirm')
        this.close_dialog()
      }
    },

  }
</script>

<style>
  #confirm_msg {
    margin: 25px 0 15px 0;
    text-align: center;
    font-size: 16px;
  }
  
</style>
