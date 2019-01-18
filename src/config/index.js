export default {
  HomePage: 'HomePage',
  // 使用环境 dev、pro
  NODE_ENV: process.env.NODE_ENV,
  // 请求路由
  baseURL: {
    dev: 'https://www.easy-mock.com/mock/5c2e68211707a03bccd1f12f/iview-admin',
    pro: 'https://production.com'
  }
}
