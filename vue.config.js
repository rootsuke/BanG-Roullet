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
          .options({ resources: ['./src/assets/scss/colors.scss',
                                 './src/assets/scss/components.scss',
                                 './src/assets/scss/style.scss'] })
          .end();
    });
  }
}
