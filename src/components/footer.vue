<template>
  <div>
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
    <div id="privacy_policy">
      <div class="container-fluid flex flex-center" style="height: 100%">
        <span class="privacy_policy_btn" @click="open_dialog()">プライバシーポリシー</span>
        <span class="contact flex flex-center">
          作った人 -><a href="https://twitter.com/ragi_chanchan" class="twitter_link roboto"><i class="fab fa-twitter"></i>@ragi_chanchan</a>
        </span>
      </div>
    </div>
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
  #privacy_policy {
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 0;
    border-top: 1px solid $rinko;
    color: $default;
    font-size: 14px;
    background-color: white;
  }

  .privacy_policy_btn {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
    &:hover {
      text-decoration: underline solid $default;
    }
  }

  .privacy_policy_msg {
    font-size: 16px;
    h4 {
      margin-bottom: 20px;
    }
    a {
      color: $default;
    }
  }

  .twitter_link {
    display: inline-block;
    margin-left: 10px;
    color: $default;
    &:hover {
      color: $default;
    }
  }
</style>
