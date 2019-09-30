<template>
  <el-dialog :visible.sync="dialogVisible" width="50%">
    <div>
      ルーレットを初期化してもよろしいですか？
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close_dialog()">キャンセル</el-button>
      <el-button type="danger" @click="confirm()">OK</el-button>
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
  
</style>
