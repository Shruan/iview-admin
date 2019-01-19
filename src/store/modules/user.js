import config from '@/config'

const state = {
  user: {},
  roleList: config.roleList
}

const mutations = {
  _user (state, value) {
    state.user = value
  }
}

const actions = {
  _User ({ commit }, value) {
    commit('_user', value)
  }
}

export default { namespaced: true, state, mutations, actions }
