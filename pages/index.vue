<template>
  <div class="container">
    <a-button type="primary" @click="increment">Primary {{user}} </a-button>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import {mapState, mapGetters, mapMutations} from 'vuex'
export default {
  fetch(){
    // if(!this.user && !this.token){
    //   $nuxt.$router.replace({path: 'auth/login'})
    // }
  },
  head: {
    title: 'Dashboard'
  },
  computed: {
    ...mapGetters({
      user:'user/user',
      token:'user/token',
    })
  },
  methods:{
    ...mapMutations({
      increment: 'user/increments'
    })
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
