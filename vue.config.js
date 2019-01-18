const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : 'https://www.easy-mock.com/mock/5c2e68211707a03bccd1f12f/iview-admin'

module.exports = {
  devServer: {
    port: 8090,
    proxy: BASE_URL
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false
}
