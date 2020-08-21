export const state = () => ({
  errors:[]
})

export const mutations = {
  SET_ERROR(state, payload){
    state.errors = payload
  }
}

export const actions = {
  ADD_ROLE({commit}, payload){
    return new Promise((resolve, reject) => {
      this.$axios.post('/role/store',{
        name: payload.name,
        permission: payload.permissions_check
      }).then(res => {
        resolve(res)
      }).catch(e => {
        if(e.response.status === 422){
          commit('SET_ERROR', e.response.data.errors)
        }
        reject(e)
      })
    })
  }
}
