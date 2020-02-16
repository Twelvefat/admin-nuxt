<template>
  <div>
    <h1> Login Page </h1>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  layout: 'auth',
  fetch(){
  },
  computed: {
    ...mapGetters({
      user:'user/user',
      token:'user/token',
    })
  },
}
</script>
