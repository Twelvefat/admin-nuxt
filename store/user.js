export const state = () => ({
  errors:[],
  loading: false,
});


export const mutations = {
  SET_LOADING(state, payload){
    state.loading = payload
  },
  SET_ERROR(state, payload){
    state.errors = payload
  }
}

export const actions = {
  ADD_USER({commit}, payload) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      this.$axios.post('/user/store',{
        name: payload.name,
        email: payload.name,
        password: payload.password,
        password_confirmation: payload.password_confirmation,
        role: payload.role
      }).then(res => {
        commit('SET_LOADING', false)
        resolve(res)
      }).catch(e => {
        commit('SET_LOADING', false)
        if(e.response.status === 422){
          commit('SET_ERROR', e.response.data.errors)
        }
        reject(e)
      })
    })

  }
}
