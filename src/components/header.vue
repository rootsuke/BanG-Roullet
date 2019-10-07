<template>
  <div>
    <div id="header">
      <div class="container-fluid header-title flex flex-center">
        <span class="oswald">BanG Roullet!</span>

        <el-dropdown>
          <span class="el-dropdown-link"><i class="fas fa-bars fa-2x"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span class="privacy_policy_btn" @click="open_dialog()">プライバシーポリシー</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="contact">
                <a href="https://twitter.com/ragi_chanchan" class="twitter_link roboto">作った人<i class="fab fa-twitter"></i></a>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <div class="privacy_policy_msg m-plus">
        <h4>アクセス解析ツールについて</h4>
        <p>
          当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
          このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
          このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
          この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
          この規約に関して、詳しくは<a href="https://marketingplatform.google.com/about/analytics/terms/jp/">こちらをクリック</a>してください。
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <button @click="close_dialog()" class="btn btn-poppin-party">閉じる</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css'

  export default {
    data() {
      return {
        dialogVisible: false
      }
    },

    methods: {
      close_dialog() {
        this.dialogVisible = false
      },

      open_dialog() {
        this.dialogVisible = true
      }
    }
  }
</script>

<style lang='scss'>
  #header {
    width: 100%;
    margin-bottom: 30px;
    font-size: 30px;
    letter-spacing: 1px;
    color: white;
    background-color: $poppin-party;
    .header-title {
      padding: 5px;
    }
    .el-dropdown {
      color: $default;
      display: inline-block;
      cursor: pointer;
      margin-left: auto;
      &:hover {
        opacity: 0.8;
      }
      &:focus {
        outline: none;
      }
    }
  }

  .privacy_policy_msg {
    a, a:hover {
      color: #606266;
    }
  }
</style>
