module.exports = {
  devServer: {
    watchOptions: {
      poll: 5000
    }
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item.use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({ resources: './src/assets/style/colors.scss' })
          .end();
    });
  }
}
