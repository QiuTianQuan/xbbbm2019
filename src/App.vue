<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  methods: {
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
         this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
  #app {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    overflow-y: scroll;
  }

  body{
    margin: 0;
    -webkit-overflow-scrolling: touch; 
  }

 
</style>
