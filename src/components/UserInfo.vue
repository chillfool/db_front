<template>
 <div>
   <button @click="change">改变登录状态</button>
   <router-link to="/">home</router-link>
 </div>
</template>

<script>
  export default {
    methods: {
      change() {
        this.$store.dispatch('setLogin',false);
      }
    }
  }
</script>

<style scoped>

</style>
