import $$ from '@/store/plugins/storage'
import { getMenuList } from '@/api'
import routes from '@/router/routers'
import config from '@/config'
import { getRouterView } from '@/libs/util'
import vue from 'vue'

const namespace = 'menu'
$$.setNamespace(namespace)

const getHomeRouter = (homePage, pageList) => {
  const Hometag = pageList.find(item => item.name === homePage)
  Hometag.meta.title = '首页'
  Hometag.isHomeTag = true
  return Hometag
}

const state = {
  routes,
  pageList: getRouterView(routes), // 所有的页面列表
  homePage: config.HomePage, // 首页
  // 标签列表
  // tagList: $$.get('tagList') || [getHomeRouter(this)],
  breadcrumbList: $$.get('breadcrumbList') || [], // 面包屑
  firstMenu: $$.get('firstMenu') || 'OrderManage', // 选中的一级菜单名称（即下标）
  tag: $$.get('tag') || config.HomePage, // 选中的标签名称
  // 显示隐藏 二级菜单
  isVisibleSecondMenu: $$.get('isVisibleSecondMenu') !== ''
    ? $$.get('isVisibleSecondMenu') : true,
  // 工单搜索值
  allOrderKeyword: '',
  // 记录路由跳转状态
  routerLinkUrl: $$.get('routerLinkUrl') || [],
  // 菜单徽标熟练
  allBadgeCount: {}
}

// 标签列表
state.tagList = $$.get('tagList') || [getHomeRouter(state.homePage, state.pageList)]

const getters = {
  // 获取一级菜单
  getFirstMenuList: (state) => routes.filter(first => !first.meta.hideInMenu).map(item => {
    return {
      name: item.name,
      title: item.meta.title,
      icon: item.meta.icon
    }
  }),
  // 获取二级菜单
  getSecondMenuList: (state) => {
    const dataFormat = (data) => {
      if (data && data.length > 0) {
        return data.filter(menu => !menu.meta.hideInMenu).map(item => {
          let obj = {
            name: item.name,
            meta: item.meta
          }
          if (item.children && item.children.length > 0) {
            obj.children = dataFormat(item.children)
          }
          return obj
        })
      } else {
        return []
      }
    }
    return dataFormat(routes.find(rt => state.firstMenu === rt.name).children)
  }
}

const mutations = {
  _setHomePage (state, value) {
    state.homePage = value
  },
  _allBadgeCount (state, value) {
    for (let key in value) {
      vue.set(state.allBadgeCount, key, value[key])
    }
  },
  _routerLinkUrl (state, value) {
    state.routerLinkUrl = value
  },
  _allOrderKeyword (state, value) {
    state.allOrderKeyword = value
  },
  _firstMenu (state, value) {
    state.firstMenu = value
  },
  _tagList (state, value) {
    state.tagList = value
  },
  _breadcrumbList (state, value) {
    state.breadcrumbList = value
  },
  _tag (state, value) {
    state.tag = value
  },
  _isVisibleSecondMenu (state, value) {
    state.isVisibleSecondMenu = !state.isVisibleSecondMenu
  }
}

const actions = {
  _changeHomePage ({ commit, state, dispatch }, data) {
    let value
    let init = false
    if (typeof data === 'object') {
      value = data.value
      init = data.init
    } else {
      value = data
    }
    if (state.homePage !== value) {
      state.tagList.forEach(item => {
        if (item.isHomeTag) item.name = value
      })
      commit('_setHomePage', value)
    }
    if (init) {
      dispatch('_DelAllTag')
    }
  },
  _GetMenuList () {
    getMenuList().then(res => {
      console.log(res)
    })
  },
  // 添加一个标签并选中
  _AddTag ({ commit, state }, menu) {
    console.log(menu)
    let tagList = state.tagList
    if (!tagList.some(item => item.name === menu.name)) {
      tagList.push(menu)
      commit('_tagList', tagList)
    }
    commit('_tag', menu.name)
  },
  // 删除一个标签并设置选中规则
  _DelTag ({ commit, state }, value) {
    let tagList = state.tagList
    let index // 当前选中的tag下标
    for (let i = 0; i < tagList.length; i++) {
      if (state.tag === tagList[i].name) {
        index = i
      }
    }
    // 查询标签是否已存在
    for (let i = 0; i < tagList.length; i++) {
      if (value === tagList[i].name) {
        tagList.splice(i, 1)
        commit('_tagList', tagList)
        // 若删除在选中的左侧 则选择 已选中的前一个
        if (i < index) {
          commit('_tag', tagList[index - 1].name)
        } else if (i === index) {
          // 若删除的即是选中的
          if (index === tagList.length) {
            commit('_tag', tagList[index - 1].name)
          } else {
            commit('_tag', tagList[index].name)
          }
        }
      }
    }
  },
  // 关闭所有标签
  _DelAllTag ({ commit, state }, value) {
    let tagList = state.tagList.filter(item => item.name === state.homePage)
    commit('_tagList', tagList)
    commit('_tag', tagList[0].name)
  },
  // 关闭其他标签
  _DelOhterTag ({ commit, state }, value) {
    commit('_tagList', state.tagList.filter(item => item.name === state.homePage || item.name === state.tag))
  }
  // // 关闭左侧标签
  // _DelLeftTag ({ commit, state }, value) {
  //   let tag = state.tag
  //   let tagList = state.tagList
  //   let tagIndex = 0
  //   tagList.forEach((val, index, arr) => {
  //     if (tag === val) {
  //       tagIndex = index
  //     }
  //   })
  //   tagList.splice(1, tagIndex - 1)
  //   commit('_tagList', tagList)
  // },
  // // 关闭右侧标签
  // _DelRightTag ({ commit, state }, value) {
  //   let tag = state.tag
  //   let tagList = state.tagList
  //   let tagIndex = 0
  //   let len = tagList.length
  //   tagList.forEach((val, index, arr) => {
  //     if (tag === val) {
  //       tagIndex = index
  //     }
  //   })
  //   tagList.splice(tagIndex + 1, len - tagIndex)
  //   commit('_tagList', tagList)
  // },
}

export default { namespaced: true, state, getters, mutations, actions }
