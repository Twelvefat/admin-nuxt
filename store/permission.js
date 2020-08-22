export const state = () => ({
  errors: []
});

export const mutations = {
  SET_ERROR(state, payload){
    state.errors = payload
  }
}

export const actions = {
  ADD_PERMISSION({commit}, payload){
    return new Promise((resolve, reject) => {
      this.$axios.post('/permissions/store',{
        name: payload.name,
      }).then(res => {
        resolve(res)
      }).catch(e => {
        if(e.response.status === 422){
          commit('SET_ERROR', e.response.data.errors)
        }
        reject(e)
      })
    })
  },
  UPDATE_PERMISSION({commit}, payload){
    return new Promise((resolve, reject) => {
      this.$axios.post(`/permissions/${payload.id}`,{
        _method:'PATCH',
        name: payload.name,
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
