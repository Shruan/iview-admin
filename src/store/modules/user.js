const state = {
  user: {}
}

const getters = {
  User: state => state.user
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

export default { namespaced: true, state, mutations, getters, actions }
