import LOCAL_KEY from './cacheLocalKeys' // 缓存localstorage中的键值
const prefix = '[qsy-iview] - '

export default {
  namespace: '',
  setNamespace (namespace) {
    this.namespace = namespace
  },
  set (key, value) {
    if (LOCAL_KEY.indexOf(key) !== -1) {
      window.localStorage.setItem(prefix + key, JSON.stringify(value))
    } else {
      window.sessionStorage.setItem(prefix + key, JSON.stringify(value))
    }
  },
  get (key) {
    // key = this.namespace ? (this.namespace + '/' + key) : key
    let value = ''
    if (LOCAL_KEY.indexOf(`${this.namespace}/${key}`) !== -1) {
      value = window.localStorage.getItem(prefix + this.namespace + '/' + key)
    } else {
      value = window.sessionStorage.getItem(prefix + this.namespace + '/' + key)
    }
    return value ? JSON.parse(value) : ''
  }
}
