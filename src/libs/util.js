
// 嵌套数组中 是否存在指定 key
// 数据结构：{name: '', children: [{name: ''}]}
const arrIsExist = (key, rt) => {
  let exist = false
  for (const val of rt) {
    if (val.children && val.children.length > 0) {
      if (arrIsExist(key, val.children)) exist = true
    } else {
      if(val.name === key) exist = true
    }
  }
  return exist
}

// 获取标签页所在的一级菜单
export const getTagInFirst = (key, routes) => {
  let firstName = ''
  for (let rs of routes) {
    if (rs.children) {
      if (arrIsExist(key, rs.children)) firstName = rs.name
    } else {
      if (rs.name === key) firstName = rs.name
    }
  }
  return firstName
}

// 根据路由生成所有页面
export const getRouterView = (data) => {
  const pages = []
  data.forEach(item => {
    if (!item.children || item.children.length === 0) {
      pages.push({
        name: item.name,
        meta: item.meta
      })
    } else {
      pages.push(...getRouterView(item.children))
    }
  })
  return pages
}
