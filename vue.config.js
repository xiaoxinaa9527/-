const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  // 下面的配置，作用是取消生成 xxx.map 文件
  productionSourceMap: false,

  // 配置排除哪些第三方包
  configureWebpack: {}
})
