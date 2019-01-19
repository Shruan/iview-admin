import config from '@/config'
import { getUserInfo } from '@/api'

const state = {
  user: {},
  roles: []
}

const getters = {
  roleList: (state) => config.roleList.filter(item => state.roles.indexOf(item.type) !== -1)
}

const mutations = {
  _setUser (state, value) {
    state.user = value
  },
  _setRoles (state, value) {
    state.roles = value
  }
}

const actions = {
  _getUserInfo ({ commit }, value) {
    getUserInfo().then(res => {
      if (res.code === 200) {
        commit('_setUser', res.data)
        commit('_setRoles', res.data.roles)
      }
    })
  }
}

export default { namespaced: true, state, getters,mutations, actions }
